import {
  Field,
  Experimental,
  Provable,
  SelfProof,
  Bool,
  Poseidon,
  Proof,
  ZkProgram,
} from 'o1js';
import { PixelArrayClass } from '../classes/PixelArrayClass.js';
import { MaskClass } from '../classes/MaskClass.js';
import fs from 'fs/promises';
import { imageData } from '../../data/pixelData100x100.js';
import { RecursionProofSystem } from '../pixelRecursion.js';
// load Data
// async function loadJSON() {
//   const dataText = await fs.readFile('../../../data/pixelData100x100.json', {
//     encoding: 'utf-8',
//   });
//   return JSON.parse(dataText);
// }
// const pixelData = await loadJSON();

const PIXELSIZE = 100;
const MASKSIZE = PIXELSIZE / 4;

// generate array of 250 random 0 or 1
let mask = [];
for (let i = 0; i < MASKSIZE; i++) {
  mask.push(Math.round(Math.random()) % 2);
}

// Dummy Mask
let maskBool = MaskClass.from(mask);

// Dummy Dataset
let pixelProof1 = PixelArrayClass.from(imageData.pixelData.slice(0, 100));
let pixelProof2 = PixelArrayClass.from(imageData.pixelData.slice(100, 200));
let pixelProof3 = PixelArrayClass.from(imageData.pixelData.slice(200, 300));

let dummyArray = [pixelProof1, pixelProof2, pixelProof3];

export async function callRecursionBlack(
  dummyArray: PixelArrayClass[],
  maskBool: MaskClass
): Promise<Proof<Field, void>> {
  console.time('Compiling RecursionProofSystem System');
  await RecursionProofSystem.compile();
  console.timeEnd('Compiling RecursionProofSystem System');

  let proof1: Proof<Field, void> | undefined; // Initialize proof1 as undefined
  let proof2: Proof<Field, void> | undefined; // proof2 may not be assigned if dummyArray is empty

  for (let i = 0; i < dummyArray.length; i++) {
    console.time(`Running RecursionProofSystem blackPixel ${i + 1}`);
    if (i === 0) {
      const firstHash: Field = Poseidon.hash(dummyArray[i].pixelArray);
      proof1 = await RecursionProofSystem.blackPixel_first(
        firstHash,
        maskBool,
        dummyArray[i]
      );
      console.log('proof1.publicInput', proof1?.publicInput.toString());
    } else {
      if (!proof1) {
        throw new Error('proof1 is not initialized.');
      }
      console.log('i is', i);
      const secondHash = Poseidon.hash([
        proof1.publicInput,
        Poseidon.hash(dummyArray[i].pixelArray),
      ]);
      console.log('secondHash', secondHash.toString());
      proof2 = await RecursionProofSystem.blackPixel_second(
        secondHash,
        maskBool,
        dummyArray[i],
        proof1
      );
      console.log('proof2.publicInput', proof2.publicInput.toString());
      proof1 = proof2;
    }
    console.timeEnd(`Running RecursionProofSystem blackPixel ${i + 1}`);
  }

  console.log('finished');
  if (!proof2) {
    throw new Error('proof2 is undefined');
  }
  return proof2;
}

// calling the function
const proof = await callRecursionBlack(dummyArray, maskBool);
console.log('proof', proof.publicInput.toString());
