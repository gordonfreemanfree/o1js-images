import { Field, Struct, Int64, UInt32, Provable, ProvablePure } from 'o1js';

export class NewImageSize64x64 extends Struct({
  width: Field,
  height: Field,
  bitmap: Provable.Array(Field, 4096),
}) {
  // constructor(bitmap: Field[]) {
  //   super({
  //     _width: Field.from(64),
  //     _height: Field.from(64),
  //     bitmap,
  //   });
  //   this.bitmap = bitmap;
  //   this._width = Field(64);
  //   this._height = new Field(64);
  // }
  static from(bitmap: number[]) {
    return new NewImageSize64x64({
      width: Field.from(64),
      height: Field.from(64),
      bitmap: bitmap.map((number) => Field(number)),
    });
  }
  // public invert(): ImageSize64x64 {
  //   const invertedBitmap = new Array<Field>(4096);
  //   for (let i = 0, j = 0; i < this._bitmap.length; i += 4, j += 4) {
  //     // Invert the R, G, and B channels
  //     const x = Field.from(255);
  //     invertedBitmap[j] = x.sub(Field(this._bitmap[i])); // R
  //     invertedBitmap[j + 1] = x.sub(this._bitmap[i + 1]); // G
  //     invertedBitmap[j + 2] = new UInt32(255 - this._bitmap[i + 2]); // B

  //     // Leave the A channel untouched
  //     invertedBitmap[j + 3] = this._bitmap[i + 3]; // A
  //     Provable.log(invertedBitmap[j]);
  //   }
  //   return new ImageSize64x64(invertedBitmap);
  // }
  public invert(): NewImageSize64x64 {
    let invertedBitmap: Field[] = new Array<Field>(4096);
    for (let i = 0; i < this.bitmap.length; i += 4) {
      // Invert the R, G, and B channels
      const x = Field.from(255);

      // Assuming Field.from() is the correct way to convert a Field's value to a new Field
      invertedBitmap[i] = x.sub(this.bitmap[i]); // R

      invertedBitmap[i + 1] = x.sub(this.bitmap[i + 1]); // G

      // Assuming you have a method to get the value from a Field object (like .getValue())
      invertedBitmap[i + 2] = x.sub(this.bitmap[i + 2]); // B

      // Leave the A channel untouched
      invertedBitmap[i + 3] = this.bitmap[i + 3]; // A

      Provable.log(invertedBitmap[i]);
      Provable.log(invertedBitmap[i + 1]);
      Provable.log(invertedBitmap[i + 2]);
      Provable.log(invertedBitmap[i + 3]);
    }
    return new NewImageSize64x64({
      width: Field(64),
      height: Field(64),
      bitmap: invertedBitmap,
    });
  }
}
