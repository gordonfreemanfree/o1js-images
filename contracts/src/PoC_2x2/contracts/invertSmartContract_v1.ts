import {
  SmartContract,
  state,
  method,
  State,
  Field,
  Poseidon,
  UInt32,
  Provable,
} from 'o1js';

import { NewImageSize64x64 } from '../classes/newImageClass';
export class Invert extends SmartContract {
  @state(Field) x = State<Field>();
  // @state(UInt32) y = State<UInt32>();
  // @state(UInt32) z = State<UInt32>();
  // @state(UInt32) a = State<UInt32>();
  // @state(UInt32) b = State<UInt32>();

  init() {
    super.init();
    this.x.set(new Field(10)); // initial state
    // this.y.set(new UInt32(20)); // initial state
    // this.z.set(new UInt32(30)); // initial state
    // this.a.set(new UInt32(40)); // initial state
    // this.b.set(new UInt32(50)); // initial state
  }
  // @method add(x: Field, y: Field): Field {
  //   return x.add(y);
  // }

  @method invert(image: NewImageSize64x64) {
    // const invertedBitmap = new Array<UInt32>(4096);
    // for (let i = 0, j = 0; i < image._bitmap.length; i += 4, j += 4) {
    //   Provable.log(image._bitmap[i]);
    //   // Invert the R, G, and B channels
    //   invertedBitmap[j] = new UInt32(255 - image._bitmap[i]); // R
    //   Provable.log(invertedBitmap[j]);
    //   invertedBitmap[j + 1] = new UInt32(255 - image._bitmap[i + 1]); // G
    //   invertedBitmap[j + 2] = new UInt32(255 - image._bitmap[i + 2]); // B

    //   // Leave the A channel untouched
    //   invertedBitmap[j + 3] = image._bitmap[i + 3]; // A
    // }
    let inverted = image.invert();
    const x = this.x.get();
    this.x.assertEquals(x);
    this.x.set(Field(inverted.bitmap[0]));
    Provable.log(inverted.bitmap[0]);
    // this.y.set(invertedBitmap[1]);
    // this.z.set(invertedBitmap[2]);
    // this.a.set(invertedBitmap[3]);
    // this.b.set(invertedBitmap[4]);
  }
}
