import { TO_DEGREES, TO_RADIANS } from './utils';

export interface TextureAtlas {
  [name: string]: { left: number; top: number; width: number; height: number; rotation: number };
}

export class Spritesheet {
  private image: HTMLImageElement;

  constructor(src: string, private atlas: TextureAtlas) {
    this.image = new Image();
    this.image.src = src;
  }

  render(ctx: CanvasRenderingContext2D, name: string, x: number, y: number, angle: number = 0) {
    const { left, top, width, height, rotation } = this.atlas[name];
    ctx.save();
    ctx.translate(~~x, ~~y); // ~~ = Math.floor()
    const optAngle = ~~(angle * TO_DEGREES);
    ctx.rotate((~~rotation + optAngle) * TO_RADIANS);
    ctx.imageSmoothingEnabled = false; // Avoids smoothing on rotation
    ctx.drawImage(this.image, left, top, width, height, -width * 0.5, -height * 0.5, width, height);
    ctx.restore();
  }
}
