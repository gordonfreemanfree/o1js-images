import { Field, Struct } from 'o1js';

export class ImageSize8x8 extends Struct({
  _bitmap: Array(64),
  // [
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //     Field,
  //   ],
}) {
  constructor(_bitmap: Array<Field>) {
    super({
      _bitmap,
    });
    this._bitmap = _bitmap;
  }
}

export class ImageClass8x8 extends Struct({
  _bitmap: ImageSize8x8,
  _background: Field,
}) {
  constructor(_bitmap: ImageSize8x8, _background: Field) {
    super({
      _bitmap,
      _background,
    });
    this._bitmap = _bitmap;
    this._background = _background;
  }
}
