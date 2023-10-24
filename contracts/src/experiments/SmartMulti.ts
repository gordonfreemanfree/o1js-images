// // Description
// // This is a smart contract that takes in two matrices and returns the dot product of the two matrices
// // The matrices are 20x20
// // The dot product is 20x20
// import {
//   CircuitValue,
//   Field,
//   Int64,
//   isReady,
//   matrixProp,
//   method,
//   Poseidon,
//   SmartContract,
//   State,
//   state,
// } from 'snarkyjs';
// await isReady;

// const MATRIX_LENGTH = 20;

// // creating a class for the matrix in order to get fixed size
// // if working with different size, you need to change the size of the matrix and the for loop in the dot product and the transpose function
// export class Matrix1 extends CircuitValue {
//   @matrixProp(Int64, MATRIX_LENGTH, MATRIX_LENGTH) value: Int64[][];

//   constructor(matrix: number[][]) {
//     super();
//     this.value = this.num2Int64_t2(matrix);
//   }

//   num2Int64_t2(x: Array<number>[]): Array<Int64>[] {
//     let y = [];
//     x.forEach((value, index) => (y[index] = this.num2Int64_t1(value)));
//     return y;
//   }

//   num2Int64_t1(x: Array<number>): Array<Int64> {
//     let y = [];
//     x.forEach((value, index) => (y[index] = this.num2Int64(value)));
//     return y;
//   }
//   num2Int64(x: number): Int64 {
//     return Int64.from(x);
//     // commenting this scale factor out for now
//     // return Int64.from(Math.floor(x * this.scale_factor));
//   }
// }

// export class Matrix2 extends CircuitValue {
//   @matrixProp(Int64, MATRIX_LENGTH, MATRIX_LENGTH) value: Int64[][];

//   constructor(matrix: number[][]) {
//     super();
//     this.value = this.num2Int64_t2(matrix);
//   }

//   num2Int64_t2(x: Array<number>[]): Array<Int64>[] {
//     let y = [];
//     x.forEach((value, index) => (y[index] = this.num2Int64_t1(value)));
//     return y;
//   }

//   num2Int64_t1(x: Array<number>): Array<Int64> {
//     let y = [];
//     x.forEach((value, index) => (y[index] = this.num2Int64(value)));
//     return y;
//   }
//   num2Int64(x: number): Int64 {
//     return Int64.from(x);
//     // commenting this scale factor out for now
//     // return Int64.from(Math.floor(x * this.scale_factor));
//   }
// }

// export class SmartContractMul extends SmartContract {
//   @state(Field) num = State<Field>();

//   // just a check to see if the dot product is working correctly because we update the state after the dot product
//   @method async update() {
//     this.num.set(Poseidon.hash([Field(1)]));
//   }
//   // method for matrix multiplication
//   @method dot_product_t2(m1: Matrix1, m2: Matrix2): Int64[][] {
//     console.log('in the dot product');
//     // Perform a dot product on the two rank 2 tensors
//     let y: Array<Int64>[] = [];
//     // m1 = this.transpose(m1.value);
//     let m2_t = this.transpose(m2.value);
//     // let m2_t = m2.value;
//     for (let i = 0; i < MATRIX_LENGTH; i++) {
//       // console.log('in the first for loop -----------------', i);
//       let m_array = Array<Int64>();
//       for (let j = 0; j < MATRIX_LENGTH; j++) {
//         // console.log('in the second for loop', j);
//         m_array[j] = this.dot_product_t1(m1.value[i], m2_t[j]);
//       }
//       y[i] = m_array;
//     }
//     // let num = this.num.get();
//     // this.num.assertEquals(num);
//     // this.num.set(Field(10).add(y[0].value));
//     this.num.set(Field(10));
//     // console.log('y', y);
//     // console.log('y[0]', y[0]);
//     // console.log('y[0][0]', y[0][0]);
//     // console.log('y[0][0]', y[0][0]);
//     // console.log('y[0][0].magnitude', y[0][0].magnitude);
//     // console.log('y[0][0].magnitude.value', y[0][0].magnitude.value);
//     // console.log('y[0][1].magnitude.value', y[0][1].magnitude.value);
//     // console.log('y[0][2].magnitude.value', y[0][2].magnitude.value);
//     // console.log('y[0][3].magnitude.value', y[0][3].magnitude.value);
//     // console.log('y[0][4].magnitude.value', y[0][4].magnitude.value);
//     // console.log('y[0][5].magnitude.value', y[0][5].magnitude.value);
//     // console.log('y[0][6].magnitude.value', y[0][6].magnitude.value);
//     return y;
//   }

//   // Description:   Perform a dot product for two rank 1 tensors of type Int64
//   // Input:         m1 - Rank 1 Tensor of type Int64
//   //                m2 - Rank 1 Tensor of type Int64
//   // Output:        y - Dot product Rank 0 Tensor of type Int64
//   private dot_product_t1(v1: Array<Int64>, v2: Array<Int64>): Int64 {
//     console.log('in the dot product t1');
//     let y = Int64.zero;
//     console.assert(
//       v1.length === v2.length,
//       "tensor dimensions do not fit, can't do dot_product_t1"
//     );
//     v1.forEach((v1_value, i) => (y = y.add(v1_value.mul(v2[i]).div(1))));
//     return y;
//   }

//   // Description:   Transpose a rank 2 tensor of type Int64
//   // Input:         x - Rank 2 Tensor of type Int64
//   // Output:        y - Transposed Rank 2 Tensor of type Int64 of x
//   private transpose(x: Array<Int64>[]): Array<Int64>[] {
//     // Transpose the rank 2 tensor
//     console.log('in the transpose');
//     let y = [];
//     for (let i = 0; i < MATRIX_LENGTH; i++) {
//       let m_array = [];
//       for (let j = 0; j < MATRIX_LENGTH; j++) {
//         m_array[j] = x[j][i];
//       }
//       y[i] = m_array;
//     }
//     return y;
//   }
// }
