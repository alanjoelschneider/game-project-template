export default class Graphics {
  constructor(private ctx: CanvasRenderingContext2D, private smooth: boolean = false) {}

  circle(x: number, y: number, radius: number, color: string = '#fff', rotation: number = 0) {
    this.ctx.save();
    this.ctx.translate(~~x, ~~y);
    this.ctx.rotate(rotation);
    this.ctx.imageSmoothingEnabled = this.smooth;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.restore();
  }

  rectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = '#fff',
    rotation: number = 0
  ) {
    this.ctx.save();
    this.ctx.translate(~~x, ~~y);
    this.ctx.rotate(rotation);
    this.ctx.fillStyle = color;
    this.ctx.imageSmoothingEnabled = this.smooth;
    this.ctx.fillRect(-width * 0.5, -height * 0.5, width, height);
    this.ctx.restore();
  }

  text(
    text: string,
    x: number,
    y: number,
    color: string = '#fff',
    align: CanvasTextAlign = 'left',
    baseline: CanvasTextBaseline = 'top',
    size: number = 10
  ) {
    this.ctx.save();
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;
    this.ctx.font = `arial ${size}px`;
    this.ctx.fillStyle = color;
    this.ctx.imageSmoothingEnabled = this.smooth;
    this.ctx.fillText(text, x, y);
    this.ctx.restore();
  }
}
