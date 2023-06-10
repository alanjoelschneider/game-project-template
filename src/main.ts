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
const pressing: { [key: string]: boolean } = {};

function update(dt: number, fps: number, elapsedTime?: number) {
  if (pressing['Enter']) {
    console.log('Pressing Enter');
  }
}

function render(dt: number, fps: number) {
  clear(ctx);
  ctx.fillStyle = '#FFF';
  ctx.fillText('Fps: ' + fps.toString(), 2, 10);
  ctx.fillText('Delta time: ' + dt.toString(), 2, 20);
  ctx.fillText(`Mouse { x: ${mouse.x.toString()}, y: ${mouse.y.toString()} }`, 2, 30);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Game project template ', WIDTH / 2, HEIGHT / 2);
  ctx.restore();
}

function clear(ctx: Context) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  window.addEventListener('keydown', (e) => (pressing[e.key] = true), false);
  window.addEventListener('keyup', (e) => (pressing[e.key] = false), false);

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
