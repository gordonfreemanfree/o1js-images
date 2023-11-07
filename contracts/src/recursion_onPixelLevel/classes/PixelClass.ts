import { Field, Struct, Provable, Circuit, Bool } from 'o1js';

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
  public blackOutPixels(mask: Field): PixelClass {
    let blackedOutPixelArray: Field[] = new Array<Field>(4);
    let bool = mask.equals(0);

    blackedOutPixelArray[0] = Provable.if(
      bool,
      this.pixelArray[0],
      Field.from(255)
    );
    blackedOutPixelArray[1] = Provable.if(
      bool,
      this.pixelArray[1],
      Field.from(255)
    );
    blackedOutPixelArray[2] = Provable.if(
      bool,
      this.pixelArray[2],
      Field.from(255)
    );
    blackedOutPixelArray[3] = Provable.if(
      bool,
      Field.from(255),
      Field.from(255)
    );
    return new PixelClass({ pixelArray: blackedOutPixelArray });
  }
}
