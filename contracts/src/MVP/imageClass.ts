import { Field, Struct, Int64, UInt32 } from 'o1js';

export class ImageSize64x64 extends Struct({
  _width: Field,
  _height: Field,
  _bitmap: Array(4096),
}) {
  constructor(_bitmap: number[]) {
    super({
      _width: new Field(64),
      _height: new Field(64),
      _bitmap,
    });
    this._bitmap = this.num2UInt32_t1(_bitmap);
    this._width = new Field(64);
    this._height = new Field(64);
  }
  num2UInt32_t2(x: Array<number>[]): Array<UInt32>[] {
    let y: any = [];
    x.forEach((value, index) => (y[index] = this.num2UInt32_t1(value)));
    return y;
  }

  num2UInt32_t1(x: Array<number>): Array<UInt32> {
    let y: any = [];
    x.forEach((value, index) => (y[index] = this.num2UInt32(value)));
    return y;
  }
  num2UInt32(x: number): UInt32 {
    return UInt32.from(x);
  }

  public invert(): ImageSize64x64 {
    const invertedBitmap = new Uint32Array(this._bitmap.length);
    for (let i = 0, j = 0; i < this._bitmap.length; i += 4, j += 4) {
      // Invert the R, G, and B channels
      invertedBitmap[j] = 255 - this._bitmap[i]; // R
      invertedBitmap[j + 1] = 255 - this._bitmap[i + 1]; // G
      invertedBitmap[j + 2] = 255 - this._bitmap[i + 2]; // B

      // Leave the A channel untouched
      invertedBitmap[j + 3] = this._bitmap[i + 3]; // A
    }
    return new ImageSize64x64(Array.from(invertedBitmap));
  }
}
