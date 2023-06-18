import { noise1 } from './perlin';
import RangeSlider from './RangeSlider';

const controls = <HTMLElement>document.getElementById('controls');

const octaves = new RangeSlider(1, 20, 1, controls);
const wavelength = new RangeSlider(1, 5000, 0.1, controls);
const amplitude = new RangeSlider(1, 300, 1, controls);

type Context = CanvasRenderingContext2D;

const WIDTH = 800;
const HEIGHT = 600;

const canvas = document.createElement('canvas');
const ctx = <Context>canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.display = 'block';

document.body.appendChild(canvas);

const mouse = { x: 0, y: 0 };
const pressing: { [key: string]: number } = {};

let minNoise = 0;
let maxNoise = 0;
let offsetX = 0;

function update(dt: number, fps: number, elapsedTime?: number) {
  if (pressing['Enter']) {
    console.log('Pressing Enter');
  }

  offsetX += 100 * dt;
}

function render(dt: number, fps: number) {
  clear(ctx);
  ctx.fillStyle = '#FFF';
  ctx.fillText('Fps: ' + fps.toString(), 2, 10);
  ctx.fillText('Delta time: ' + dt.toString(), 2, 20);
  ctx.fillText(`Mouse { x: ${mouse.x.toString()}, y: ${mouse.y.toString()} }`, 2, 30);
  ctx.fillText('minNoise: ' + minNoise.toString(), 2, 40);
  ctx.fillText('maxNoise: ' + maxNoise.toString(), 2, 50);

  renderNoise(ctx);
}

function clear(ctx: Context) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderNoise(ctx: Context) {
  ctx.beginPath();
  ctx.moveTo(0, HEIGHT);
  for (let x = 0; x <= WIDTH; x += 1) {
    const y = noise1(offsetX + x, wavelength.value, amplitude.value, octaves.value);
    minNoise = Math.min(minNoise, y);
    maxNoise = Math.max(maxNoise, y);
    ctx.lineTo(x, HEIGHT / 2 + y);
  }
  ctx.lineTo(WIDTH, HEIGHT);
  ctx.strokeStyle = '#FFF';
  ctx.stroke();
}

startGameLoop();

function startGameLoop() {
  let lastUpdate = 0;
  let deltaTime = 0;
  let acumDelta = 0;
  let now = 0;
  let fpsCount = 0;
  let fps = 0;

  function onMouseMove(e: MouseEvent) {
    mouse.x = e.x - canvas.offsetLeft;
    mouse.y = e.y - canvas.offsetTop;
  }

  canvas.addEventListener('mousemove', onMouseMove, false);
  canvas.addEventListener('mouseup', onMouseMove, false);
  window.addEventListener('keydown', (e) => (pressing[e.key] = 1), false);
  window.addEventListener('keyup', (e) => (pressing[e.key] = 0), false);

  (function gameLoop(elapsedTime?: number) {
    now = window.performance.now();

    deltaTime = (now - lastUpdate) / 1000;
    if (deltaTime > 1) deltaTime = 0;

    lastUpdate = now;

    acumDelta += deltaTime;
    fpsCount++;

    if (acumDelta >= 1) {
      fps = fpsCount;
      acumDelta -= acumDelta;
      fpsCount = 0;
    }

    update(deltaTime, fps, elapsedTime);
    render(deltaTime, fps);

    window.requestAnimationFrame(gameLoop);
  })();
}
