export default class Vector {
  constructor(public x: number, public y: number) {}

  public static zero(): Vector {
    return new Vector(0, 0);
  }

  public static left(length: number = 1): Vector {
    return new Vector(-length, 0);
  }

  public static up(length: number = 1): Vector {
    return new Vector(0, -length);
  }

  public static right(length: number = 1): Vector {
    return new Vector(length, 0);
  }

  public static down(length: number = 1): Vector {
    return new Vector(0, length);
  }

  public static fromAngle(angle: number, length: number = 1): Vector {
    return new Vector(Math.cos(angle) * length, Math.sin(angle) * length);
  }

  public copy(): Vector {
    return new Vector(this.x, this.y);
  }

  public add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  public sub(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  public mult(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  public div(scalar: number): Vector {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  public scale(v: Vector): Vector {
    return new Vector(this.x * v.x, this.y * v.y);
  }

  public normalize(): Vector {
    const length = this.length();
    return new Vector(this.x / length, this.y / length);
  }

  public negate(): Vector {
    return new Vector(-this.x, -this.y);
  }

  public rotate(angle: number): Vector {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.x * cos - this.y * sin;
    const y = this.x * sin + this.y * cos;
    return new Vector(x, y);
  }

  public rotateAbout(center: Vector, angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const dx = this.x - center.x;
    const dy = this.y - center.y;
    const x = center.x + (dx * cos - dy * sin);
    const y = center.y + (dx * sin + dy * cos);
    return new Vector(x, y);
  }

  public lerp(t: number, v: Vector): Vector {
    const x = this.x + t * (v.x - this.x);
    const y = this.y + t * (v.y - this.y);
    return new Vector(x, y);
  }

  public angleBetween(v: Vector): number {
    return Math.atan2(v.y - this.y, v.x - this.x);
  }

  public dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public distance(v: Vector): number {
    const dx = v.x - this.x;
    const dy = v.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public direction(): number {
    return Math.atan2(this.y, this.x);
  }

  public toString(): string {
    return `{ x: ${this.x}, y: ${this.y} }`;
  }
}
