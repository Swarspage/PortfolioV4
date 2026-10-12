import { useEffect, useState } from 'react';
import type { MutableRefObject, RefObject } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createLayerTexture } from '../utils/layerTextures';
import { isLowPower, prefersReducedMotion } from '../utils/device';
import { STACK_TIMELINE, activeLayerIndex, clamp01, easeInOutCubic, lerp } from '../utils/stackTimeline';
import type { LayerKind } from '../types/portfolio';

const LAYER_KINDS: LayerKind[] = ['interface', 'api', 'data', 'infra'];
const SIGNAL = new THREE.Color('#FF4D00');
const DIM = new THREE.Color('#3A3A40');
// [x, y, z, rotX, rotZ] — where each slab flies when the stack is dismantled
const DISMANTLE_DIRS: [number, number, number, number, number][] = [
[-1.1, 0.9, 0.3, 0.5, 0.35],
[1.2, 0.35, -0.6, -0.4, -0.3],
[-1.0, -0.4, -0.8, 0.35, -0.4],
[1.1, -0.9, 0.5, -0.5, 0.3]];


interface StackSceneOptions {
  canvasRef: RefObject<HTMLCanvasElement>;
  progressRef: MutableRefObject<number>;
}

/**
 * Raw Three.js "exploded full-stack" scene. Scroll progress drives everything;
 * the loop only runs while the canvas is on-screen and the tab is visible.
 */
export function useStackScene({ canvasRef, progressRef }: StackSceneOptions) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const lite = isLowPower();
    const reduced = prefersReducedMotion();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !lite,
        alpha: true,
        powerPreference: lite ? 'low-power' : 'high-performance'
      });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envTexture = pmrem.fromScene(room, 0.04).texture;
    scene.environment = envTexture;
    (room as unknown as {dispose?: () => void;}).dispose?.();

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(5, 9, 6);
    const rim = new THREE.DirectionalLight(0xff4d00, 4);
    rim.position.set(-6, 1.5, -5);
    scene.add(key, rim, new THREE.AmbientLight(0xffffff, 0.15));

    const root = new THREE.Group();
    const stack = new THREE.Group();
    root.add(stack);
    scene.add(root);

    const slabGeo = new RoundedBoxGeometry(4.2, 0.22, 4.2, lite ? 2 : 4, 0.08);
    const edgeSource = new THREE.BoxGeometry(4.24, 0.24, 4.24);
    const edgeGeo = new THREE.EdgesGeometry(edgeSource);
    const decalGeo = new THREE.PlaneGeometry(3.96, 3.96);
    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    const layers = LAYER_KINDS.map((kind, i) => {
      const group = new THREE.Group();
      const slabMat = new THREE.MeshStandardMaterial({ color: 0x141418, metalness: 0.9, roughness: 0.28 });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      const { texture, redraw } = createLayerTexture(kind, i);
      texture.anisotropy = Math.min(4, maxAniso);
      const decalMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
      const decal = new THREE.Mesh(decalGeo, decalMat);
      decal.rotation.x = -Math.PI / 2;
      decal.position.y = 0.113;
      decal.renderOrder = 1;
      const edgeMat = new THREE.LineBasicMaterial({ color: SIGNAL.clone(), transparent: true, opacity: 0.85 });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      group.add(slab, decal, edges);
      stack.add(group);
      return { group, slabMat, decalMat, edgeMat, texture, redraw, lift: 0 };
    });

    // Vertical guides that appear between slabs as they separate
    const guidePoints: number[] = [];
    [
    [-2.1, -2.1],
    [2.1, -2.1],
    [2.1, 2.1],
    [-2.1, 2.1]].
    forEach(([x, z]) => guidePoints.push(x, -1.5, z, x, 1.5, z));
    const guideGeo = new THREE.BufferGeometry();
    guideGeo.setAttribute('position', new THREE.Float32BufferAttribute(guidePoints, 3));
    const guideMat = new THREE.LineBasicMaterial({ color: 0x5a5a60, transparent: true, opacity: 0 });
    const guides = new THREE.LineSegments(guideGeo, guideMat);
    stack.add(guides);

    // Data packets travelling between layers
    const packetCount = lite ? 16 : 44;
    const packetGeo = new THREE.BoxGeometry(0.07, 0.07, 0.07);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xff4d00 });
    const packets = new THREE.InstancedMesh(packetGeo, packetMat, packetCount);
    const seeds = Array.from({ length: packetCount }, () => ({
      x: (Math.random() - 0.5) * 3.2,
      z: (Math.random() - 0.5) * 3.2,
      speed: 0.25 + Math.random() * 0.45,
      phase: Math.random(),
      up: Math.random() > 0.5
    }));
    stack.add(packets);
    const dummy = new THREE.Object3D();

    let disposed = false;
    document.fonts?.ready.then(() => {
      if (disposed) return;
      layers.forEach((l) => {
        l.redraw();
        l.texture.needsUpdate = true;
      });
    });

    let isNarrow = false;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      renderer.setSize(width, height, false);
      const aspect = width / Math.max(1, height);
      isNarrow = aspect < 0.9;
      camera.aspect = aspect;
      const dist = Math.max(12.5, 3.1 / (Math.tan(THREE.MathUtils.degToRad(16)) * aspect));
      camera.position.set(0, dist * 0.34, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    let tmx = 0;
    let tmy = 0;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const onPointer = (e: PointerEvent) => {
      tmx = e.clientX / window.innerWidth * 2 - 1;
      tmy = e.clientY / window.innerHeight * 2 - 1;
    };
    if (finePointer && !reduced) window.addEventListener('pointermove', onPointer, { passive: true });

    let current = progressRef.current;
    let mx = 0;
    let my = 0;
    let spin = 0;
    let clock = 0;
    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const k = 1 - Math.exp(-dt * 5);
      current += (progressRef.current - current) * k;
      mx += (tmx - mx) * k;
      my += (tmy - my) * k;
      if (!reduced) {
        spin += dt * 0.12;
        clock += dt;
      }

      const p = current;
      const explode = easeInOutCubic(
        clamp01((p - STACK_TIMELINE.explodeStart) / (STACK_TIMELINE.explodeEnd - STACK_TIMELINE.explodeStart))
      );
      const dismantle = easeInOutCubic(
        clamp01(
          (p - STACK_TIMELINE.dismantleStart) / (STACK_TIMELINE.dismantleEnd - STACK_TIMELINE.dismantleStart)
        )
      );
      const gap = 0.42 + explode * 1.15;
      const active = activeLayerIndex(p, layers.length);
      const fade = 1 - clamp01((dismantle - 0.55) / 0.45);

      layers.forEach((layer, i) => {
        const d = DISMANTLE_DIRS[i];
        layer.lift += ((i === active ? 1 : 0) - layer.lift) * k * 1.6;
        layer.group.position.set(d[0] * dismantle * 4, (1.5 - i) * gap + d[1] * dismantle * 3, d[2] * dismantle * 4);
        layer.group.rotation.set(d[3] * dismantle, 0, d[4] * dismantle);
        layer.group.scale.setScalar(1 + layer.lift * 0.05);
        const focus = active < 0 ? 1 : layer.lift;
        layer.edgeMat.color.copy(DIM).lerp(SIGNAL, focus);
        layer.edgeMat.opacity = 0.85 * fade;
        layer.decalMat.opacity = fade * (0.45 + 0.55 * focus);
        layer.slabMat.transparent = fade < 0.999;
        layer.slabMat.opacity = fade;
      });

      guides.scale.y = gap;
      guideMat.opacity = explode * (1 - dismantle) * 0.6;

      const packetScale = explode * (1 - dismantle);
      packets.visible = packetScale > 0.01;
      if (packets.visible) {
        const top = 1.5 * gap;
        const bottom = -1.5 * gap;
        seeds.forEach((s, i) => {
          const t = (clock * s.speed + s.phase) % 1;
          dummy.position.set(s.x, s.up ? lerp(bottom, top, t) : lerp(top, bottom, t), s.z);
          dummy.scale.setScalar(packetScale);
          dummy.updateMatrix();
          packets.setMatrixAt(i, dummy.matrix);
        });
        packets.instanceMatrix.needsUpdate = true;
      }

      const x = isNarrow ? 0 : lerp(2.6, 2.0, explode) * (1 - dismantle);
      const y = isNarrow ? lerp(lerp(1.0, 1.7, explode), 0.6, dismantle) : lerp(0.55, 0, explode);
      root.position.set(x, y, 0);
      root.scale.setScalar(isNarrow ? 0.82 : 1);
      root.rotation.set(my * 0.08, -0.65 + spin + p * Math.PI * 1.15 + mx * 0.22, 0);

      renderer.render(scene, camera);
    };

    let onScreen = true;
    let pageVisible = !document.hidden;
    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => onScreen && pageVisible ? start() : stop();
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    const onVisibility = () => {
      pageVisible = !document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);
    sync();

    return () => {
      disposed = true;
      stop();
      io.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      layers.forEach((l) => {
        l.slabMat.dispose();
        l.decalMat.dispose();
        l.edgeMat.dispose();
        l.texture.dispose();
      });
      [slabGeo, edgeSource, edgeGeo, decalGeo, guideGeo, packetGeo].forEach((g) => g.dispose());
      guideMat.dispose();
      packetMat.dispose();
      packets.dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, [canvasRef, progressRef]);

  return { failed };
}