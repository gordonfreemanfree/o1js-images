import { Field, Struct, Provable } from 'o1js';

export class PixelClass extends Struct({
  pixelArray: Provable.Array(Field, 4),
}) {
  static from(bitmap: number[]) {
    return new PixelClass({
      pixelArray: bitmap.map((number) => Field(number)),
    });
  }

  public invert(): PixelClass {
    let invertedPixelArray: Field[] = new Array<Field>(4);
    const x = Field.from(255);

    invertedPixelArray[0] = x.sub(this.pixelArray[0]); // R
    invertedPixelArray[1] = x.sub(this.pixelArray[1]); // G
    invertedPixelArray[2] = x.sub(this.pixelArray[2]); // B
    invertedPixelArray[3] = this.pixelArray[3]; // A

    return new PixelClass({
      pixelArray: invertedPixelArray,
    });
  }
}
