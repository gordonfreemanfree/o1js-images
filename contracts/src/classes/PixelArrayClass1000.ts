import { Field, Struct, Provable, Bool } from 'o1js';

const PIXELSNUMBER = 100;
const MASKNUMBER = PIXELSNUMBER / 4;

export class MaskClass extends Struct({
  maskArray: Provable.Array(Bool, MASKNUMBER),
}) {
  static from(bitmap: number[]) {
    return new MaskClass({
      maskArray: bitmap.map((number) => Field(number).equals(Field(1))),
    });
  }
}

export class PixelArrayClass1000 extends Struct({
  pixelArray: Provable.Array(Field, PIXELSNUMBER),
}) {
  static from(bitmap: number[]) {
    return new PixelArrayClass1000({
      pixelArray: bitmap.map((number) => Field(number)),
    });
  }

  public blackOutPixels(mask: MaskClass): PixelArrayClass1000 {
    let blackedOutPixelArray: Array<Field> = new Array<Field>(PIXELSNUMBER);
    // let bool = mask.equals(0);
    let maskIndex = 0;
    let bool;
    for (let i = 0; i < this.pixelArray.length; i += 4) {
      // check that maskIndex is less than mask.maskArray.length
      if (maskIndex < mask.maskArray.length) {
        bool = mask.maskArray[maskIndex];
        maskIndex++;
      } else {
        break;
      }
      blackedOutPixelArray[i] = Provable.if(
        bool,
        this.pixelArray[i],
        Field.from(255)
      );
      blackedOutPixelArray[i + 1] = Provable.if(
        bool,
        this.pixelArray[i + 1],
        Field.from(255)
      );
      blackedOutPixelArray[i + 2] = Provable.if(
        bool,
        this.pixelArray[i + 2],
        Field.from(255)
      );
      blackedOutPixelArray[i + 3] = Provable.if(
        bool,
        Field.from(255),
        Field.from(255)
      );
    }

    return new PixelArrayClass1000({ pixelArray: blackedOutPixelArray });
  }
}
// works
