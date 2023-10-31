import {
  Field,
  Experimental,
  UInt32,
  Provable,
  Poseidon,
  SelfProof,
} from 'o1js';
import { PixelClass } from '../classes/PixelClass';

const pixelData = [
  [255, 0, 0, 255],
  [0, 255, 0, 255],
  [0, 0, 255, 255],
  [255, 255, 0, 255],
  [255, 0, 0, 255],
  [0, 255, 0, 255],
  [0, 0, 255, 255],
  [255, 255, 0, 255],
];

const invertedPixelData = [
  [0, 255, 255, 255], //
  [255, 0, 255, 255], //
  [255, 255, 0, 255], //
  [0, 0, 255, 255], //
  [0, 255, 255, 255], //
  [255, 0, 255, 255], //
  [255, 255, 0, 255], //
  [0, 0, 255, 255], //
];

const RecursionProofSystem = Experimental.ZkProgram({
  publicInput: Provable.Array(Field, 4),

  methods: {
    init: {
      privateInputs: [],
      method(state: Array<Field>) {
        const initState = state.map((x) => Field(x));
        for (let i = 0; i < 4; i++) {
          initState[i].assertEquals(state[i]);
        }
      },
    },
    update: {
      privateInputs: [SelfProof, Provable.Array(Field, 4)],
      method(
        newState: Array<Field>,
        oldProof: SelfProof<Array<Field>, Array<Field>>,
        initialState: Array<Field>
      ) {
        oldProof.verify();
        Provable.log('oldProof successfully verified');
        Provable.log('newState', newState);

        Field(255).sub(newState[0]).assertEquals(initialState[0]);
        Field(255).sub(newState[1]).assertEquals(initialState[1]);
        Field(255).sub(newState[2]).assertEquals(initialState[2]);
        newState[3].assertEquals(initialState[3]);

        // Field(255).sub(oldProof.publicInput[0]).assertEquals(newState[0]);
        // Field(255).sub(oldProof.publicInput[1]).assertEquals(newState[1]);
        // Field(255).sub(oldProof.publicInput[2]).assertEquals(newState[2]);
        // oldProof.publicInput[3].assertEquals(newState[3]);
      },
    },
  },
});

console.time('Compiling Naive Proof System');
await RecursionProofSystem.compile();
console.timeEnd('Compiling Naive Proof System');

console.time('Running Naive Proof System init');
const p1_n = await RecursionProofSystem.init(
  invertedPixelData[0].map((x) => Field.from(x))
);
console.timeEnd('Running Naive Proof System init');

console.time('Running Naive Proof System update');
let last_proof_n = p1_n;
for (let i = 0; i < 8; i++) {
  Provable.log(`pixelData[${i}] in loop:`, pixelData[i]);
  Provable.log('last proof public Input:', last_proof_n.publicInput);

  const p = await RecursionProofSystem.update(
    pixelData[i].map((x) => Field.from(x)),
    last_proof_n,
    invertedPixelData[i].map((x) => Field.from(x))
  );
  last_proof_n = p;
}
console.timeEnd('Running Naive Proof System update');
const n = RecursionProofSystem.analyzeMethods();
for (let i = 0; i < n.length; i++) {
  console.log(
    `Naive Constraint System Method ${i}: `,
    n[i].digest,
    n[i].publicInputSize,
    n[i].rows,
    n[i].gates,
    n[i].result
  );
}
last_proof_n.verify();
