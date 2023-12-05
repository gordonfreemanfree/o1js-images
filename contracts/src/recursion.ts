import {
  Field,
  Experimental,
  Provable,
  SelfProof,
  Bool,
  Poseidon,
  ZkProgram,
  Struct,
} from 'o1js';
// import {
//   PixelArrayClass1000,
//   MaskClass,
// } from '../classes/PixelArrayClass1000.js';

// export const RecursionProofSystem = ZkProgram({
//   name: 'RecursionProofSystem',
//   publicInput: Field,

//   methods: {
//     blackPixel_first: {
//       privateInputs: [MaskClass, PixelArrayClass1000],
//       method(hash: Field, mask: MaskClass, privatePixel: PixelArrayClass1000) {
//         // checking identity hash
//         hash.assertEquals(Poseidon.hash(privatePixel.pixelArray));
//         let pixelBlacked = privatePixel.blackOutPixels(mask);
//         let bool;
//         let maskIndex = 0;
//         for (let i = 0; i < pixelBlacked.pixelArray.length; i += 4) {
//           if (maskIndex < mask.maskArray.length) {
//             bool = mask.maskArray[maskIndex];
//             maskIndex++;
//           } else {
//             break;
//           }

//           let bool1 = Provable.if(
//             bool,
//             privatePixel.pixelArray[i].equals(pixelBlacked.pixelArray[i]),
//             pixelBlacked.pixelArray[i].equals(Field(255))
//           );
//           let bool2 = Provable.if(
//             bool,
//             privatePixel.pixelArray[i + 1].equals(
//               pixelBlacked.pixelArray[i + 1]
//             ),
//             pixelBlacked.pixelArray[i + 1].equals(Field(255))
//           );
//           let bool3 = Provable.if(
//             bool,
//             privatePixel.pixelArray[i + 2].equals(
//               pixelBlacked.pixelArray[i + 2]
//             ),
//             pixelBlacked.pixelArray[i + 2].equals(Field(255))
//           );
//           let bool4 = Provable.if(
//             bool,
//             Field(255).equals(pixelBlacked.pixelArray[i + 3]),
//             Field(255).equals(pixelBlacked.pixelArray[i + 3])
//           );
//           bool1.assertEquals(Bool(true));
//           bool2.assertEquals(Bool(true));
//           bool3.assertEquals(Bool(true));
//           bool4.assertEquals(Bool(true));
//         }
//       },
//     },
//     blackPixel_second: {
//       privateInputs: [MaskClass, PixelArrayClass1000, SelfProof],
//       method(
//         hash: Field,
//         mask: MaskClass,
//         privatePixel: PixelArrayClass1000,
//         oldProof: SelfProof<Field, Array<Field>>
//       ) {
//         oldProof.verify();
//         let secondHash = Poseidon.hash(privatePixel.pixelArray);
//         let mergeHash = Poseidon.hash([oldProof.publicInput, secondHash]);
//         hash.assertEquals(mergeHash);
//         let pixelBlacked = privatePixel.blackOutPixels(mask);
//         let bool;
//         let maskIndex = 0;
//         for (let i = 0; i < pixelBlacked.pixelArray.length; i += 4) {
//           if (maskIndex < mask.maskArray.length) {
//             bool = mask.maskArray[maskIndex];
//             maskIndex++;
//           } else {
//             break;
//           }

//           let bool1 = Provable.if(
//             bool,
//             privatePixel.pixelArray[i].equals(pixelBlacked.pixelArray[i]),
//             pixelBlacked.pixelArray[i].equals(Field(255))
//           );
//           let bool2 = Provable.if(
//             bool,
//             privatePixel.pixelArray[i + 1].equals(
//               pixelBlacked.pixelArray[i + 1]
//             ),
//             pixelBlacked.pixelArray[i + 1].equals(Field(255))
//           );
//           let bool3 = Provable.if(
//             bool,
//             privatePixel.pixelArray[i + 2].equals(
//               pixelBlacked.pixelArray[i + 2]
//             ),
//             pixelBlacked.pixelArray[i + 2].equals(Field(255))
//           );
//           let bool4 = Provable.if(
//             bool,
//             Field(255).equals(pixelBlacked.pixelArray[i + 3]),
//             Field(255).equals(pixelBlacked.pixelArray[i + 3])
//           );
//           bool1.assertEquals(Bool(true));
//           bool2.assertEquals(Bool(true));
//           bool3.assertEquals(Bool(true));
//           bool4.assertEquals(Bool(true));
//         }
//       },
//     },
//     // merge: {
//     //   privateInputs: [SelfProof, SelfProof],
//     //   method(
//     //     hash: Field,
//     //     proof1: SelfProof<Array<Field>, Array<Field>>,
//     //     proof2: SelfProof<Field, Array<Field>>
//     //   ) {
//     //     // Provable.asProver(() => hash.toString());

//     //     hash.assertEquals(proof2.publicInput);
//     //     proof1.verify();
//     //     proof2.verify();
//     //     Provable.log('proof1 successfully verified');
//     //     Provable.log('proof2 successfully verified');
//     //   },
//     // },
//   },
// });

// ------------------------------
// ------------------------------
// just a test for compiling in ui

class MaskClass extends Struct({
  maskArray: Provable.Array(Bool, 4),
}) {}

class PixelArrayClass1000 extends Struct({
  pixelArray: Provable.Array(Field, 4),
}) {}

export const RecursionProofSystem = ZkProgram({
  name: 'RecursionProofSystem',
  publicInput: Field,

  methods: {
    blackPixel_first: {
      privateInputs: [MaskClass, PixelArrayClass1000],
      method(hash: Field, mask: MaskClass, privatePixel: PixelArrayClass1000) {
        // checking identity hash
        mask.maskArray[0].assertEquals(Bool(true));
      },
    },
    blackPixel_second: {
      privateInputs: [MaskClass, PixelArrayClass1000, SelfProof],
      method(
        hash: Field,
        mask: MaskClass,
        privatePixel: PixelArrayClass1000,
        oldProof: SelfProof<Field, Array<Field>>
      ) {
        oldProof.verify();
        mask.maskArray[0].assertEquals(Bool(true));
      },
    },
  },
});
export class BlackProof extends ZkProgram.Proof(RecursionProofSystem) {}
