import * as THREE from 'three';
import type { LayerKind } from '../types/portfolio';

const SIZE = 512;
const SIGNAL = '#FF4D00';
const LABELS: Record<LayerKind, string> = {
  interface: 'INTERFACE',
  api: 'API',
  data: 'DATA',
  infra: 'TOOLING'
};

export function createLayerTexture(kind: LayerKind, index: number) {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  const redraw = () => {
    if (ctx) drawLayer(ctx, kind, index);
  };
  redraw();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return { texture, redraw };
}

function drawLayer(ctx: CanvasRenderingContext2D, kind: LayerKind, index: number) {
  ctx.clearRect(0, 0, SIZE, SIZE);

  // frame
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 2;
  roundRect(ctx, 16, 16, SIZE - 32, SIZE - 32, 18);
  ctx.stroke();

  // corner ticks
  ctx.strokeStyle = SIGNAL;
  ctx.lineWidth = 4;
  const t = 26;
  [
  [16, 16, 1, 1],
  [SIZE - 16, 16, -1, 1],
  [16, SIZE - 16, 1, -1],
  [SIZE - 16, SIZE - 16, -1, -1]].
  forEach(([x, y, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(x, y + t * dy);
    ctx.lineTo(x, y);
    ctx.lineTo(x + t * dx, y);
    ctx.stroke();
  });

  ctx.fillStyle = SIGNAL;
  ctx.font = '700 22px "JetBrains Mono", ui-monospace, monospace';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(`0${index + 1} / ${LABELS[kind]}`, 44, 64);

  if (kind === 'interface') drawInterface(ctx);
  if (kind === 'api') drawApi(ctx);
  if (kind === 'data') drawData(ctx);
  if (kind === 'infra') drawInfra(ctx);
}

function drawInterface(ctx: CanvasRenderingContext2D) {
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 2;
  roundRect(ctx, 44, 92, 424, 372, 12);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(44, 126);
  ctx.lineTo(468, 126);
  ctx.stroke();
  [64, 84, 104].forEach((x) => {
    ctx.beginPath();
    ctx.arc(x, 109, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fill();
  });
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillRect(72, 160, 260, 30);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(72, 204, 200, 12);
  ctx.fillRect(72, 226, 170, 12);
  ctx.fillStyle = SIGNAL;
  ctx.fillRect(72, 260, 120, 34);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  [72, 202, 332].forEach((x) => {
    roundRect(ctx, x, 326, 112, 110, 8);
    ctx.stroke();
  });
}

function drawApi(ctx: CanvasRenderingContext2D) {
  const rows: [string, string, string][] = [
  ['GET ', '/api/projects', '200'],
  ['POST', '/api/auth', '201'],
  ['PUT ', '/api/users/:id', '200'],
  ['GET ', '/api/stats', '304'],
  ['DEL ', '/api/cache', '204'],
  ['GET ', '/api/health', '200']];

  ctx.font = '500 21px "JetBrains Mono", ui-monospace, monospace';
  rows.forEach(([method, path, code], i) => {
    const y = 128 + i * 54;
    ctx.fillStyle = i === 1 ? SIGNAL : 'rgba(255,255,255,0.85)';
    ctx.fillText(method, 52, y);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillText(path, 128, y);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText(code, 412, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(48, y + 18);
    ctx.lineTo(464, y + 18);
    ctx.stroke();
  });
}

function drawData(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  ctx.fillRect(48, 96, 300, 36);
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1.5;
  for (let r = 0; r < 7; r++) {
    const y = 132 + r * 44;
    ctx.beginPath();
    ctx.moveTo(48, y);
    ctx.lineTo(348, y);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillRect(62, y + 16, 60, 10);
    ctx.fillRect(146, y + 16, 110, 10);
    ctx.fillRect(280, y + 16, 46, 10);
  }
  ctx.strokeStyle = SIGNAL;
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 220, 300, 44);

  // cylinder
  const cx = 412;
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = 2.5;
  [150, 220, 290].forEach((y, i) => {
    ctx.beginPath();
    ctx.ellipse(cx, y, 44, 14, 0, 0, Math.PI * 2);
    if (i === 0) {
      ctx.fillStyle = SIGNAL;
      ctx.fill();
    }
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.moveTo(cx - 44, 150);
  ctx.lineTo(cx - 44, 290);
  ctx.moveTo(cx + 44, 150);
  ctx.lineTo(cx + 44, 290);
  ctx.stroke();
}

function drawInfra(ctx: CanvasRenderingContext2D) {
  let seed = 7;
  const rand = () => {
    seed = seed * 16807 % 2147483647;
    return seed / 2147483647;
  };
  const cols = 6;
  const rows = 6;
  const gx = (c: number) => 72 + c * 74;
  const gy = (r: number) => 112 + r * 66;
  ctx.lineWidth = 2.5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (c < cols - 1 && rand() > 0.45) {
        ctx.strokeStyle = rand() > 0.85 ? SIGNAL : 'rgba(255,255,255,0.32)';
        ctx.beginPath();
        ctx.moveTo(gx(c), gy(r));
        ctx.lineTo(gx(c + 1), gy(r));
        ctx.stroke();
      }
      if (r < rows - 1 && rand() > 0.55) {
        ctx.strokeStyle = 'rgba(255,255,255,0.32)';
        ctx.beginPath();
        ctx.moveTo(gx(c), gy(r));
        ctx.lineTo(gx(c), gy(r + 1));
        ctx.stroke();
      }
    }
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hot = rand() > 0.88;
      ctx.fillStyle = hot ? SIGNAL : 'rgba(255,255,255,0.6)';
      const s = hot ? 12 : 7;
      ctx.fillRect(gx(c) - s / 2, gy(r) - s / 2, s, s);
    }
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}