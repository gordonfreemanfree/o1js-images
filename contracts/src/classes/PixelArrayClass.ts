import { Field, Struct, Provable, Bool } from 'o1js';
import { MaskClass } from './MaskClass';

// tied to 94 pixels := 24x24 image
const PIXELSNUMBER = 96;

export class PixelArrayClass extends Struct({
  pixelArray: Provable.Array(Field, PIXELSNUMBER),
}) {
  static from(bitmap: number[]) {
    return new PixelArrayClass({
      pixelArray: bitmap.map((number) => Field(number)),
    });
  }

  public blackOutPixels(mask: MaskClass): PixelArrayClass {
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
        Field.from(0)
      );
      blackedOutPixelArray[i + 1] = Provable.if(
        bool,
        this.pixelArray[i + 1],
        Field.from(0)
      );
      blackedOutPixelArray[i + 2] = Provable.if(
        bool,
        this.pixelArray[i + 2],
        Field.from(0)
      );
      blackedOutPixelArray[i + 3] = Provable.if(
        bool,
        Field.from(255),
        Field.from(255)
      );
    }

    return new PixelArrayClass({ pixelArray: blackedOutPixelArray });
  }
}
