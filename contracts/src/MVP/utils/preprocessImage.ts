import { Field } from 'o1js';

// Description:   Convert a Rank 1 Tensor of numbers to Rank 1 Tensor of Fields
// Input:         x - Rank 1 Tensor of type number
// Output:        y - Rank 1 Tensor of type Field
export function num2Field_t1(x: Array<number>): Array<Field> {
  let y: any = [];
  x.forEach((value, index) => (y[index] = num2Field(value)));
  return y;
}

// Description:   Convert number to a Field by multiplying it by the
// scale factor and taking the floor
// Input:         x - number
// Output:        y - Field
export function num2Field(x: number): Field {
  return Field(x);
}

export function preprocessImage(image: number[]): Array<Field> {
  const imagePreprocessed = num2Field_t1(image);
  console.log('imagePreprocessed', imagePreprocessed.toString());
  return imagePreprocessed;
}
