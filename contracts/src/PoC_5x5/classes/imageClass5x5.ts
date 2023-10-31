import { Field, Struct, Provable, UInt32, UInt64, Int64 } from 'o1js';

const WIDTH = 5;
const HEIGHT = 5;
const PIXELARRAYSIZE = WIDTH * HEIGHT * 4;

export class NewImageSize5x5 extends Struct({
  width: Field,
  height: Field,
  bitmap: Provable.Array(Field, 100),
}) {
  static from(bitmap: number[]) {
    return new NewImageSize5x5({
      width: Field.from(WIDTH),
      height: Field.from(HEIGHT),
      bitmap: bitmap.map((number) => Field(number)),
    });
  }

  public invert(): NewImageSize5x5 {
    let invertedBitmap: Field[] = new Array<Field>(100);
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

      // Provable.log(invertedBitmap[i]);
      // Provable.log(invertedBitmap[i + 1]);
      // Provable.log(invertedBitmap[i + 2]);
      // Provable.log(invertedBitmap[i + 3]);
    }
    return new NewImageSize5x5({
      width: Field(5),
      height: Field(5),
      bitmap: invertedBitmap,
    });
  }
}
