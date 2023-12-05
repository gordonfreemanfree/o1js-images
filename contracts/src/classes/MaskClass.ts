import { Field, Struct, Provable, Bool } from 'o1js';

let MASKNUMBER = 96 / 4;

export class MaskClass extends Struct({
  maskArray: Provable.Array(Bool, MASKNUMBER),
  //   maskArray: DynamicArray,
}) {
  static from(bitmap: number[]) {
    return new MaskClass({
      maskArray: bitmap.map((number) => Field(number).equals(Field(1))),
    });
  }
}
