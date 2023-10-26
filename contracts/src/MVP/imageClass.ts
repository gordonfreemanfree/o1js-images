import { Field, Struct, Int64, UInt32 } from 'o1js';
import { imageData } from './utils/pixelData';

export class ImageSize64x64 extends Struct({
  _bitmap: Array(4096),
}) {
  constructor(_bitmap: number[]) {
    super({
      _bitmap,
    });
    this._bitmap = this.num2UInt32_t1(_bitmap);
  }
  num2UInt32_t2(x: Array<number>[]): Array<UInt32>[] {
    let y = [];
    x.forEach((value, index) => (y[index] = this.num2UInt32_t1(value)));
    return y;
  }

  num2UInt32_t1(x: Array<number>): Array<UInt32> {
    let y = [];
    x.forEach((value, index) => (y[index] = this.num2UInt32(value)));
    return y;
  }
  num2UInt32(x: number): UInt32 {
    return UInt32.from(x);
  }
}

// export class ImageClass8x8 extends Struct({
//   _bitmap: ImageSize8x8,
//   _background: Field,
// }) {
//   constructor(_bitmap: ImageSize8x8, _background: Field) {
//     super({
//       _bitmap,
//       _background,
//     });
//     this._bitmap = _bitmap;
//     this._background = _background;
//   }
// }

let test = imageData;

let matrix1 = new ImageSize64x64(imageData);
console.log('matrix1', matrix1.toString());
