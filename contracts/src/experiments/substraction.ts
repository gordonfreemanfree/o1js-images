import { Circuit, Field, Provable } from 'o1js';

let json = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

let array1 = Provable.Array(Field, 10);

let array2 = json.map((n) => Field(n));

array1.fromFields(array2);

console.log(array1);
