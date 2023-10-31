import { SmartContract, state, method, State, Field } from 'o1js';
import { NewImageSize50x50 } from '../classes/imageClass50x50.js';

export class Invert extends SmartContract {
  @state(Field) x = State<Field>();
  @state(Field) y = State<Field>();
  @state(Field) z = State<Field>();
  @state(Field) a = State<Field>();
  @state(Field) b = State<Field>();

  init() {
    super.init();
    this.x.set(new Field(10)); // initial state
    this.y.set(new Field(20)); // initial state
    this.z.set(new Field(30)); // initial state
    this.a.set(new Field(40)); // initial state
    this.b.set(new Field(50)); // initial state
  }

  @method invert(image: NewImageSize50x50) {
    let inverted = image.invert();
    const x = this.x.get();
    this.x.assertEquals(x);
    this.x.set(Field(inverted.bitmap[0]));

    const y = this.y.get();
    this.y.assertEquals(y);
    this.y.set(Field(inverted.bitmap[1]));

    const z = this.z.get();
    this.z.assertEquals(z);
    this.z.set(Field(inverted.bitmap[2]));

    const a = this.a.get();
    this.a.assertEquals(a);
    this.a.set(Field(inverted.bitmap[3]));

    // Provable.log(inverted.bitmap[0]);
    // Provable.log(inverted.bitmap[1]);
    // Provable.log(inverted.bitmap[2]);
    // Provable.log(inverted.bitmap[3]);
  }
}
