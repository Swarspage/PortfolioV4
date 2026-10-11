import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { buildFormations, type Formations } from "./formations";
import { DEFAULT_FRAME, lerpFrame, makeFrame, type SceneFrame, type TimedFrame } from "./sceneFrame";
import { sceneSignals } from "./sceneSignals";

export type SceneTheme = "dark" | "light";

export interface EngineOptions {
  canvas: HTMLCanvasElement;
  compact: boolean;
  reducedMotion: boolean;
  theme: SceneTheme;
  accent: string;
  skillColors: string[];
  skillCategories: number[];
  categoryCount: number;
  staticFrame: Partial<SceneFrame>;
  onFirstFrame?: () => void;
}

interface ThemeLook {
  base: THREE.Color;
  metalness: number;
  roughness: number;
  clearcoat: number;
  env: number;
  key: THREE.Color;
  keyIntensity: number;
  rimIntensity: number;
  ambient: number;
  brass: THREE.Color;
  atmosphere: THREE.Color;
  atmosphereStrength: number;
  exposure: number;
  nodeBoost: number;
}

const LOOKS: Record<SceneTheme, ThemeLook> = {
  dark: {
    base: new THREE.Color("#4a3c32"),
    metalness: 0.75,
    roughness: 0.28,
    clearcoat: 0.65,
    env: 1.1,
    key: new THREE.Color("#ffe0c2"),
    keyIntensity: 2.8,
    rimIntensity: 2.4,
    ambient: 0.15,
    brass: new THREE.Color("#d49b60"),
    atmosphere: new THREE.Color("#ff9045"),
    atmosphereStrength: 0.8,
    exposure: 1.05,
    nodeBoost: 2.0
  },
  light: {
    base: new THREE.Color("#ece4d6"),
    metalness: 0.06,
    roughness: 0.42,
    clearcoat: 0.9,
    env: 1.05,
    key: new THREE.Color("#fff4e6"),
    keyIntensity: 2.2,
    rimIntensity: 0.5,
    ambient: 0.35,
    brass: new THREE.Color("#8f6d3d"),
    atmosphere: new THREE.Color("#c98a62"),
    atmosphereStrength: 0.4,
    exposure: 1.02,
    nodeBoost: 1.0
  }
};

const CORE_RADIUS = 1.55;
const PLANET_RADIUS = 2.0;
const CAMERA_Z = 12;
const FOV = 35;
const INK = new THREE.Color("#2a241e");

const ATMO_VERT = `
varying vec3 vN; varying vec3 vV;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const ATMO_FRAG = `
uniform vec3 uColor; uniform float uOpacity; uniform float uPower;
varying vec3 vN; varying vec3 vV;
void main() {
  float f = pow(1.0 - max(dot(vN, vV), 0.0), uPower);
  gl_FragColor = vec4(uColor, f * uOpacity);
}`;

const clamp01 = (v: number) => v < 0 ? 0 : v > 1 ? 1 : v;
const smooth = (t: number) => t * t * (3 - 2 * t);

export class OrbitalEngine {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly group = new THREE.Group();
  private readonly mesh: THREE.InstancedMesh;
  private readonly tileMaterial: THREE.MeshPhysicalMaterial;
  private readonly atmosphere: THREE.Mesh;
  private readonly atmosphereMaterial: THREE.ShaderMaterial;
  private readonly orbit = new THREE.Group();
  private readonly orbitRing: THREE.Mesh;
  private readonly brassMaterial: THREE.MeshPhysicalMaterial;
  private readonly panelMaterial: THREE.MeshPhysicalMaterial;
  private readonly satellite = new THREE.Group();
  private readonly keyLight: THREE.DirectionalLight;
  private readonly rimLight: THREE.DirectionalLight;
  private readonly ambient: THREE.AmbientLight;
  private readonly pmrem: THREE.PMREMGenerator;
  private readonly envTexture: THREE.Texture;
  private readonly geometries: THREE.BufferGeometry[] = [];
  private readonly f: Formations;
  private readonly reduced: boolean;
  private readonly onFirstFrame?: () => void;
  private readonly observer: IntersectionObserver;

  private keyframes: TimedFrame[] = [];
  private readonly staticFrame: SceneFrame;
  private readonly sampled: SceneFrame = { ...DEFAULT_FRAME };
  private readonly current: SceneFrame;
  private readonly look: ThemeLook = { ...LOOKS.dark, base: new THREE.Color(), key: new THREE.Color(), brass: new THREE.Color(), atmosphere: new THREE.Color() };
  private readonly accent = new THREE.Color();
  private readonly nodeColor = new THREE.Color();
  private readonly skillDark: THREE.Color[];
  private readonly skillLight: THREE.Color[];
  private themeMix: number;
  private themeTarget: number;
  private atmoLightBlend = false;

  private raf = 0;
  private running = false;
  private visible = true;
  private onScreen = true;
  private lastTime = 0;
  private elapsed = 0;
  private spin = 0;
  private introT = 0;
  private introPlaying = false;
  private firstFrameSent = false;
  private dirty = true;
  private dpr: number;
  private readonly maxDpr: number;
  private frameAccum = 0;
  private frameCount = 0;
  private readonly pointer = { x: 0, y: 0 };

  private readonly tmpV = new THREE.Vector3();
  private readonly tmpR = new THREE.Vector3();
  private readonly tmpN = new THREE.Vector3();
  private readonly tmpP = new THREE.Vector3();
  private readonly tmpS = new THREE.Vector3();
  private readonly tmpQ = new THREE.Quaternion();
  private readonly tmpM = new THREE.Matrix4();
  private readonly tmpC = new THREE.Color();
  private readonly tmpC2 = new THREE.Color();
  private readonly qSpin = new THREE.Quaternion();
  private readonly qRing = new THREE.Quaternion();
  private readonly eSpin = new THREE.Euler();
  private readonly eRing = new THREE.Euler(0, 0, 0, "ZXY");
  private readonly ringUp = new THREE.Vector3();
  private readonly Z = new THREE.Vector3(0, 0, 1);

  constructor(opts: EngineOptions) {
    const { canvas, compact } = opts;
    this.reduced = opts.reducedMotion;
    this.onFirstFrame = opts.onFirstFrame;
    this.staticFrame = makeFrame(opts.staticFrame);
    this.current = { ...this.staticFrame };

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !compact, powerPreference: "high-performance" });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.shadowMap.enabled = !compact;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.maxDpr = compact ? 1.25 : 1.75;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);

    this.camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / Math.max(window.innerHeight, 1), 0.1, 80);
    this.camera.position.set(0, 0, CAMERA_Z);

    // Image-based lighting from a procedural studio room (no network fetch).
    this.pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.envTexture = this.pmrem.fromScene(room, 0.04).texture;
    (room as unknown as {dispose?: () => void;}).dispose?.();
    this.scene.environment = this.envTexture;

    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    this.keyLight.position.set(4.5, 7, 7);
    this.keyLight.castShadow = !compact;
    this.keyLight.shadow.mapSize.set(1024, 1024);
    const sc = this.keyLight.shadow.camera;
    sc.left = -9;
    sc.right = 9;
    sc.top = 9;
    sc.bottom = -9;
    sc.near = 0.5;
    sc.far = 30;
    this.keyLight.shadow.bias = -0.0004;
    this.keyLight.shadow.normalBias = 0.02;
    this.keyLight.shadow.radius = 4;
    this.rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    this.rimLight.position.set(-7, 2.5, -5);
    this.ambient = new THREE.AmbientLight(0xffffff, 0.12);
    this.scene.add(this.keyLight, this.keyLight.target, this.rimLight, this.ambient);

    // Tiles
    const count = compact ? 200 : 360;
    this.f = buildFormations(count, opts.skillCategories, opts.categoryCount, compact);
    const side = Math.sqrt(4 * Math.PI * CORE_RADIUS * CORE_RADIUS / count) * 0.9;
    const tileGeometry = new RoundedBoxGeometry(side, side, side * 0.24, 2, side * 0.09);
    this.geometries.push(tileGeometry);
    this.tileMaterial = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.6, roughness: 0.3, clearcoat: 0.55, clearcoatRoughness: 0.25 });
    this.mesh = new THREE.InstancedMesh(tileGeometry, this.tileMaterial, count);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = !compact;
    this.mesh.receiveShadow = !compact;
    for (let i = 0; i < count; i++) this.mesh.setColorAt(i, this.tmpC.setRGB(1, 1, 1));
    this.mesh.instanceColor?.setUsage(THREE.DynamicDrawUsage);
    this.group.add(this.mesh);

    // Atmosphere (fresnel rim)
    this.atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color() }, uOpacity: { value: 0 }, uPower: { value: 2.6 } },
      vertexShader: ATMO_VERT,
      fragmentShader: ATMO_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const atmoGeometry = new THREE.SphereGeometry(1, 48, 32);
    this.geometries.push(atmoGeometry);
    this.atmosphere = new THREE.Mesh(atmoGeometry, this.atmosphereMaterial);
    this.atmosphere.scale.setScalar(PLANET_RADIUS * 1.16);
    this.group.add(this.atmosphere);

    // Orbit + satellite (telemetry)
    this.brassMaterial = new THREE.MeshPhysicalMaterial({ color: 0xc9a26a, metalness: 1, roughness: 0.28, transparent: true });
    this.panelMaterial = new THREE.MeshPhysicalMaterial({ color: 0x1d1a17, metalness: 0.4, roughness: 0.22, clearcoat: 1, transparent: true });
    const torus = new THREE.TorusGeometry(1, 0.0055, 8, 240);
    const body = new THREE.BoxGeometry(0.13, 0.13, 0.18);
    const panel = new THREE.BoxGeometry(0.42, 0.006, 0.13);
    this.geometries.push(torus, body, panel);
    this.orbitRing = new THREE.Mesh(torus, this.brassMaterial);
    const satBody = new THREE.Mesh(body, this.brassMaterial);
    const panelL = new THREE.Mesh(panel, this.panelMaterial);
    const panelR = new THREE.Mesh(panel, this.panelMaterial);
    panelL.position.x = -0.3;
    panelR.position.x = 0.3;
    this.satellite.add(satBody, panelL, panelR);
    // orbit ring and satellite hidden — nothing added to this.orbit
    this.orbit.rotation.set(Math.PI / 2 - 0.38, 0, 0.32);
    this.group.add(this.orbit);
    this.scene.add(this.group);

    // Colours
    this.accent.set(opts.accent);
    this.skillDark = opts.skillColors.map((c) => new THREE.Color(c));
    this.skillLight = this.skillDark.map((c) => c.clone().lerp(INK, 0.18));
    this.themeMix = this.themeTarget = opts.theme === "light" ? 1 : 0;
    if (this.reduced) {
      this.introT = 1;
      this.introPlaying = true;
    }

    window.addEventListener("resize", this.resize);
    document.addEventListener("visibilitychange", this.onVisibility);
    this.observer = new IntersectionObserver((entries) => {
      this.onScreen = entries.some((e) => e.isIntersecting);
      this.syncRunning();
    });
    this.observer.observe(canvas);
    this.resize();
  }

  // ---------- Public API ----------
  setKeyframes(frames: TimedFrame[]) {
    this.keyframes = frames;
    this.dirty = true;
  }

  setTheme(theme: SceneTheme, accent: string) {
    this.themeTarget = theme === "light" ? 1 : 0;
    this.accent.set(accent);
    this.dirty = true;
  }

  playIntro() {
    this.introPlaying = true;
  }

  start() {
    this.visible = !document.hidden;
    this.syncRunning();
  }

  dispose() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.observer.disconnect();
    this.geometries.forEach((g) => g.dispose());
    this.tileMaterial.dispose();
    this.atmosphereMaterial.dispose();
    this.brassMaterial.dispose();
    this.panelMaterial.dispose();
    this.mesh.dispose();
    this.envTexture.dispose();
    this.pmrem.dispose();
    this.renderer.dispose();
  }

  // ---------- Loop ----------
  private syncRunning() {
    const shouldRun = this.visible && this.onScreen;
    if (shouldRun && !this.running) {
      this.running = true;
      this.lastTime = 0;
      this.raf = requestAnimationFrame(this.tick);
    } else if (!shouldRun && this.running) {
      this.running = false;
      cancelAnimationFrame(this.raf);
    }
  }

  private onVisibility = () => {
    this.visible = !document.hidden;
    this.syncRunning();
  };

  private resize = () => {
    const w = window.innerWidth;
    const h = Math.max(window.innerHeight, 1);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.dirty = true;
  };

  private tick = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.tick);
    const dt = this.lastTime ? Math.min((now - this.lastTime) / 1000, 0.05) : 1 / 60;
    this.lastTime = now;

    // Reduced motion: render only when something actually changed.
    const themeSettled = Math.abs(this.themeTarget - this.themeMix) < 0.001;
    if (this.reduced && this.firstFrameSent && !this.dirty && themeSettled) return;

    this.elapsed += dt;
    this.adaptQuality(dt);
    this.update(dt);
    this.renderer.render(this.scene, this.camera);
    this.dirty = false;
    if (!this.firstFrameSent) {
      this.firstFrameSent = true;
      this.onFirstFrame?.();
    }
  };

  private adaptQuality(dt: number) {
    this.frameAccum += dt;
    this.frameCount++;
    if (this.frameCount < 90) return;
    const avg = this.frameAccum / this.frameCount;
    this.frameAccum = 0;
    this.frameCount = 0;
    if (avg > 1 / 48 && this.dpr > 1) {
      this.dpr = Math.max(1, this.dpr - 0.25);
      this.resize();
    }
  }

  private sample(y: number): SceneFrame {
    const k = this.keyframes;
    if (this.reduced || k.length === 0) return this.staticFrame;
    if (y <= k[0].at) return k[0].frame;
    const last = k[k.length - 1];
    if (y >= last.at) return last.frame;
    for (let i = 0; i < k.length - 1; i++) {
      const a = k[i];
      const b = k[i + 1];
      if (y >= a.at && y < b.at) {
        const span = b.at - a.at;
        const t = span < 1 ? 1 : (y - a.at) / span;
        return lerpFrame(this.sampled, a.frame, b.frame, smooth(t));
      }
    }
    return last.frame;
  }

  private update(dt: number) {
    const target = this.sample(window.scrollY);
    const k = this.reduced ? 1 : 1 - Math.exp(-dt * 6);
    lerpFrame(this.current, this.current, target, k);

    const step = dt / 0.7;
    this.themeMix += Math.max(-step, Math.min(step, this.themeTarget - this.themeMix));
    this.applyLook();

    if (this.introPlaying && this.introT < 1) this.introT = Math.min(1, this.introT + dt / 1.4);
    const introE = 1 - Math.pow(1 - this.introT, 3);

    if (!this.reduced) {
      this.pointer.x += (sceneSignals.pointerX - this.pointer.x) * k;
      this.pointer.y += (sceneSignals.pointerY - this.pointer.y) * k;
      this.spin += dt * 0.12 * (1 - this.current.grid);
    }

    const f = this.current;
    const halfH = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z;
    const halfW = halfH * this.camera.aspect;
    const isPortrait = this.camera.aspect < 1;
    const responsive = isPortrait
      ? Math.max(0.85, Math.min(1.1, 1.8 / Math.max(halfW, 0.5)))
      : Math.max(0.75, Math.min(1.0, halfW / 6.2));
    this.group.position.set(f.x * halfW, f.y * halfH, 0);
    this.group.scale.setScalar(f.scale * responsive * (0.9 + 0.1 * introE));
    this.group.rotation.set(this.pointer.y * 0.06, this.pointer.x * 0.1, 0);

    this.updateTiles(f, introE);

    // Atmosphere
    const atmo = f.atmo * this.look.atmosphereStrength * introE;
    this.atmosphere.visible = atmo > 0.005;
    this.atmosphereMaterial.uniforms.uOpacity.value = atmo;

    // Orbit + satellite
    const sum = f.core + f.planet + f.grid + f.ring || 1;
    const radius = (CORE_RADIUS * 1.75 * f.core + PLANET_RADIUS * 1.62 * f.planet + 3 * (f.grid + f.ring)) / sum;
    const orbitOpacity = clamp01(f.orbit) * introE;
    this.orbit.visible = orbitOpacity > 0.01;
    this.orbitRing.scale.setScalar(radius);
    this.brassMaterial.opacity = orbitOpacity;
    this.panelMaterial.opacity = orbitOpacity;
    // satellite removed — no per-frame update needed
  }

  private updateTiles(f: SceneFrame, introE: number) {
    const { dirs, terrain, grid, gridN, gridScale, ring, seeds, skillSlot, skillCat, count } = this.f;
    const sum = f.core + f.planet + f.grid + f.ring || 1;
    const wc = f.core / sum;
    const wp = f.planet / sum;
    const wg = f.grid / sum;
    const wr = f.ring / sum;
    const seam = f.seam + (1 - introE) * 1.6;
    const scrollSpin = this.reduced ? 0 : window.scrollY * 0.00035;

    this.eSpin.set(f.tilt, this.spin + scrollSpin, 0);
    this.qSpin.setFromEuler(this.eSpin);
    const ringSpin = (this.reduced ? 0 : this.elapsed * 0.04) + sceneSignals.achievements * Math.PI * 1.25;
    this.eRing.set(0.36, ringSpin, -0.16);
    this.qRing.setFromEuler(this.eRing);
    this.ringUp.set(0, 1, 0).applyQuaternion(this.qRing);

    const skillsT = this.reduced ? 99 : sceneSignals.skills;
    const nodeT = this.reduced ? 1 : sceneSignals.singularity;
    const mix = this.themeMix;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const s0 = seeds[i3];
      const s1 = seeds[i3 + 1];
      const s2 = seeds[i3 + 2];

      const d = this.tmpV.set(dirs[i3], dirs[i3 + 1], dirs[i3 + 2]).applyQuaternion(this.qSpin);
      const rc = CORE_RADIUS * (1 + seam * 0.2 * (0.55 + s0 * 0.9));
      const rp = PLANET_RADIUS * (1 + terrain[i]);
      const radial = rc * wc + rp * wp;
      let px = d.x * radial;
      let py = d.y * radial;
      let pz = d.z * radial;
      let nx = d.x * (wc + wp);
      let ny = d.y * (wc + wp);
      let nz = d.z * (wc + wp);

      const slot = skillSlot[i];
      const reveal = slot >= 0 ? clamp01((skillsT - skillCat[slot]) / 0.8) : 0;

      if (wg > 0) {
        px += grid[i3] * wg;
        py += grid[i3 + 1] * wg;
        pz += (grid[i3 + 2] + reveal * 0.55) * wg;
        nx += gridN[i3] * wg;
        ny += gridN[i3 + 1] * wg;
        nz += gridN[i3 + 2] * wg;
      }
      if (wr > 0) {
        const r = this.tmpR.set(ring[i3], ring[i3 + 1], ring[i3 + 2]).applyQuaternion(this.qRing);
        px += r.x * wr;
        py += r.y * wr;
        pz += r.z * wr;
        nx += this.ringUp.x * wr;
        ny += this.ringUp.y * wr;
        nz += this.ringUp.z * wr;
      }

      const n = this.tmpN.set(nx, ny, nz);
      if (n.lengthSq() < 1e-6) n.set(0, 0, 1);else
      n.normalize();
      this.tmpQ.setFromUnitVectors(this.Z, n);

      const scale =
      (wc * (1 - Math.min(seam, 1) * 0.22) + wp * 1.28 + wg * gridScale[i] * (1 + reveal * 0.12) + wr * 0.78) * (0.7 + 0.3 * introE);
      this.tmpP.set(px, py, pz);
      this.tmpS.setScalar(scale);
      this.tmpM.compose(this.tmpP, this.tmpQ, this.tmpS);
      this.mesh.setMatrixAt(i, this.tmpM);

      const c = this.tmpC.copy(this.look.base).multiplyScalar(0.84 + s0 * 0.3);
      if (wp > 0.001 && s1 < 0.09) {
        const on = clamp01((nodeT * 1.3 + 0.2 - s2) * 3) * wp;
        if (on > 0) c.lerp(this.nodeColor, on);
      }
      if (slot >= 0 && f.tint > 0.001) {
        const skill = this.tmpC2.copy(this.skillDark[slot]).lerp(this.skillLight[slot], mix);
        c.lerp(skill, f.tint * reveal);
      }
      this.mesh.setColorAt(i, c);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  private applyLook() {
    const m = this.themeMix;
    const d = LOOKS.dark;
    const l = LOOKS.light;
    const lerp = THREE.MathUtils.lerp;
    const look = this.look;
    look.base.copy(d.base).lerp(l.base, m);
    look.atmosphereStrength = lerp(d.atmosphereStrength, l.atmosphereStrength, m);

    this.tileMaterial.metalness = lerp(d.metalness, l.metalness, m);
    this.tileMaterial.roughness = lerp(d.roughness, l.roughness, m);
    this.tileMaterial.clearcoat = lerp(d.clearcoat, l.clearcoat, m);
    this.tileMaterial.envMapIntensity = lerp(d.env, l.env, m);

    this.keyLight.color.copy(d.key).lerp(l.key, m);
    this.keyLight.intensity = lerp(d.keyIntensity, l.keyIntensity, m);
    this.rimLight.color.copy(this.accent);
    this.rimLight.intensity = lerp(d.rimIntensity, l.rimIntensity, m);
    this.ambient.intensity = lerp(d.ambient, l.ambient, m);

    look.brass.copy(d.brass).lerp(l.brass, m);
    this.brassMaterial.color.copy(look.brass);
    look.atmosphere.copy(d.atmosphere).lerp(l.atmosphere, m);
    (this.atmosphereMaterial.uniforms.uColor.value as THREE.Color).copy(look.atmosphere);

    // Additive light only works on dark; switch to normal blending on paper.
    const lightBlend = m > 0.5;
    if (lightBlend !== this.atmoLightBlend) {
      this.atmoLightBlend = lightBlend;
      this.atmosphereMaterial.blending = lightBlend ? THREE.NormalBlending : THREE.AdditiveBlending;
      this.atmosphereMaterial.needsUpdate = true;
    }

    this.nodeColor.copy(this.accent).multiplyScalar(lerp(d.nodeBoost, l.nodeBoost, m));
    this.renderer.toneMappingExposure = lerp(d.exposure, l.exposure, m);
  }
}