// just a script to play around with.  This is not part of the smart contract

import { Field, provable, Circuit, isReady, Int64, Provable } from 'o1js';

// await isReady;

// // there are two ways of specifying an n*m matrix

// // provable
// let Matrix1 = provable([
//   [
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//   ],
//   [
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//   ],
//   [
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//     Int64,
//   ],
// ]);
// console.log(Matrix1);

// let Matrix2 = provable([
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
//   [Int64, Int64, Int64],
// ]);
// console.log(Matrix2);
// // Circuit.array -- types somewhat more loosely but can be easier to write
// // let Matrix6x3= Circuit.array(Circuit.array(Int64, 3), 3);
// // let Matrix3x3 = Circuit.array(Circuit.array(Int64, 3), 3);

// // let Matrix3x4 = provable([
// //   [Field, Field, Field],
// //   [Field, Field, Field],
// //   [Field, Field, Field],
// //   [Field, Field, Field],
// // ]);

// // let Matrix4x5 = provable([
// //   [Field, Field, Field, Field],
// //   [Field, Field, Field, Field],
// //   [Field, Field, Field, Field],
// //   [Field, Field, Field, Field],
// //   [Field, Field, Field, Field],
// // ]);

// /* @param x an n*m matrix, encoded as x[i][k] for row i column k.
//  * @param y an m*o matrix, both encoded as y[k][j] for row j column j.
//  * Returns an n*o matrix.
//  */
// // function matrixMul(x: Field[][], y: Field[][]): Field[][] {
// //   let n = x.length;
// //   // let m = y.length; // has to be === x[0].length
// //   let m = x[0].length;
// //   let o = y[0].length;
// //   console.log('n: ' + n);
// //   console.log('m: ' + m);
// //   console.log('o: ' + o);
// //   let result: Field[][] = [];

// //   // Compute the output matrix for different values for loops
// //   for (let i = 0; i < n; i++) {
// //     result[i] = [];
// //     for (let j = 0; j < o; j++) {
// //       result[i][j] = Field(0);
// //       for (let k = 0; k < m; k++) {
// //         result[i][j] = result[i][j].add(x[i][k].mul(y[k][j]));
// //       }
// //     }
// //   }

// //   return result;
// // }

// // function matrixMultiplication(matrix1: Field[][], matrix2: Field[][]) {
// //   let result: Field[][] = [];
// //   for (let i = 0; i < matrix1.length; i++) {
// //     result[i] = [];
// //     for (let j = 0; j < matrix2[0].length; j++) {
// //       let sum = Field(0);
// //       for (let k = 0; k < matrix1[0].length; k++) {
// //         sum = sum.add(matrix1[i][k].mul(matrix2[k][j]));
// //       }
// //       result[i][j] = sum;
// //     }
// //   }
// //   return result;
// // }
// // Description:   Perform a dot product for two rank 2 tensors of type Int64
// // Input:         m1 - Rank 2 Tensor of type Int64
// //                m2 - Rank 2 Tensor of type Int64
// // Output:        y - Dot product Rank 2 Tensor of type Int64
// export function dot_product_t2(
//   // m1: [
//   //   [Int64, Int64, Int64, Int64, Int64, Int64],
//   //   [Int64, Int64, Int64, Int64, Int64, Int64],
//   //   [Int64, Int64, Int64, Int64, Int64, Int64]
//   // ],
//   // m2: [[Int64, Int64, Int64], [Int64, Int64, Int64], [Int64, Int64, Int64]]
//   m1: Array<Int64>[],
//   m2: Array<Int64>[]
// ): Array<Int64>[] {
//   console.log('in the dot product');
//   // Perform a dot product on the two rank 2 tensors
//   let y = Array();
//   m1 = transpose(m1);
//   // let m2_t = transpose(m2);
//   let m2_t = m2;
//   for (let i = 0; i < m1.length; i++) {
//     console.log('in the for loop', i);
//     let m_array = Array();
//     for (let j = 0; j < m2_t.length; j++) {
//       console.log('in the for xxxxx loop', j);
//       m_array[j] = dot_product_t1(m1[i], m2_t[j]);
//     }
//     y[i] = m_array;
//   }
//   return y;
// }

// // Description:   Perform a dot product for two rank 1 tensors of type Int64
// // Input:         m1 - Rank 1 Tensor of type Int64
// //                m2 - Rank 1 Tensor of type Int64
// // Output:        y - Dot product Rank 0 Tensor of type Int64
// function dot_product_t1(v1: Array<Int64>, v2: Array<Int64>): Int64 {
//   let y = Int64.zero;
//   console.assert(
//     v1.length === v2.length,
//     "tensor dimensions do not fit, can't do dot_product_t1"
//   );
//   v1.forEach((v1_value, i) => (y = y.add(v1_value.mul(v2[i]).div(10000))));
//   return y;
// }

// // Description:   Transpose a rank 2 tensor of type Int64
// // Input:         x - Rank 2 Tensor of type Int64
// // Output:        y - Transposed Rank 2 Tensor of type Int64 of x
// function transpose(x: Array<Int64>[]): Array<Int64>[] {
//   // Transpose the rank 2 tensor
//   console.log('in the transpose');
//   let y = Array();
//   for (let i = 0; i < x[0].length; i++) {
//     let m_array = Array();
//     for (let j = 0; j < x.length; j++) {
//       m_array[j] = x[j][i];
//     }
//     y[i] = m_array;
//   }
//   return y;
// }

// function circuit(): Int64[][] {
//   let x = Circuit.witness(Matrix1, () => {
//     return [
//       [
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//       ],
//       [
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//       ],
//       [
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//         Int64.from(1),
//       ],
//     ];
//   });
//   let y = Circuit.witness(Matrix2, () => {
//     return [
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//       [Int64.from(1), Int64.from(1), Int64.from(1)],
//     ];
//   });
//   console.log('x', x);
//   console.log('y', y);
//   console.log('x magnitude', x[0][0].magnitude.value);
//   console.log('y magnitude', y[0][0].magnitude.value);

//   return dot_product_t2(x, y);
//   // let a = matrixMultiplication(x, y);
//   // console.log(a.length);
//   // console.log(a[0].length);

//   // return a;
// }

// let { rows } = Circuit.constraintSystem(circuit);
// let result = Circuit.runAndCheck(circuit);
// // console.log({ rows, result: Matrix3x3.toJSON(result) });
// console.log('test', { rows, result: result });
// console.log('dimension of result', result.length, result[0].length);
// console.log('dimension of result', JSON.stringify(result));
