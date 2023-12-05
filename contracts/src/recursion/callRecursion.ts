import { Field, Poseidon, Proof } from 'o1js';
import { PixelArrayClass } from '../classes/PixelArrayClass.js';
import { MaskClass } from '../classes/MaskClass.js';
// import { imageData } from '../data/pixelData4x4.js';
import { imageData } from '../data/circle24x24.js';
import { RecursionProofSystem } from './pixelRecursion.js';
import arrayToPNG from '../utils/arrayToImage.js';

const PIXELSIZE = imageData.dimensions.width * 4;
const MASKSIZE = imageData.dimensions.width;
const actualImage = imageData;

export async function callRecursionBlack(
  dummyArray: PixelArrayClass[],
  maskBool: MaskClass
): Promise<Proof<Field, void>> {
  console.time('Compiling RecursionProofSystem System');
  await RecursionProofSystem.compile();
  console.timeEnd('Compiling RecursionProofSystem System');
  console.log('compiling done');
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
      console.log(`Hash ${i}`, secondHash.toString());
      proof2 = await RecursionProofSystem.blackPixel_second(
        secondHash,
        maskBool,
        dummyArray[i],
        proof1
      );
      console.log(`proof${i}.publicInput`, proof2.publicInput.toString());
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

// generate array of size MASKSIZE using 0 or 1 randomly
// just to have a mask
let mask: number[] = [];
for (let i = 0; i < MASKSIZE; i++) {
  mask.push(Math.round(Math.random()) % 2);
}
// Dummy Mask
let maskBoolArray = MaskClass.from(mask);

// circle dataset on recursion step 24 pixels :=96 pixelvalues
// loop over imageData and split it in arrays of size 96
function splitIntoRows(imageData: number[], chunkSize: number) {
  let rows: PixelArrayClass[] = [];
  for (let i = 0; i < imageData.length; i += chunkSize) {
    const chunk = PixelArrayClass.from(imageData.slice(i, i + chunkSize));
    rows.push(chunk);
  }
  return rows;
}
// generating infos
let rows = splitIntoRows(actualImage.pixelData, PIXELSIZE);
console.log('number of recursions needed: (:= #rows)', rows.length);
console.log('number of pixelValues in row 0: ', rows[0].pixelArray.length);
console.log('pixelValues of row 0: ', rows[0].pixelArray.toString());
console.log('length of mask: ', maskBoolArray.maskArray.length);
console.log('value of mask: ', maskBoolArray.maskArray.toString());

// calling the function
console.time('Total proof time is');
const proof = await callRecursionBlack(rows, maskBoolArray);
console.timeEnd('Total proof time is');

// generate the image outside the proof
function blackPixelWithoutProof(pixelData: PixelArrayClass[], mask: MaskClass) {
  let i = 0;
  let j = 0;
  let blackedImage = [];
  for (i = 0; i < pixelData.length; i++) {
    let x = pixelData[i].blackOutPixels(mask);
    console.log(x.pixelArray.toString());
    blackedImage.push(x.pixelArray);
  }
  return blackedImage;
}
let blackedPixelArray = blackPixelWithoutProof(rows, maskBoolArray);
// flattening the array - cleaning step
let flat = blackedPixelArray.flat();
console.log(flat);
console.log('blacked pixels are', flat.toString());
console.log('length is', flat.length);
let i = 0;
let endArray = [];
for (i = 0; i < flat.length; i++) {
  endArray.push(Number(flat[i].toString()));
}
console.log(endArray);
// save pixelData to png file
arrayToPNG(
  endArray,
  imageData.dimensions.width,
  imageData.dimensions.height,
  'circleBlacked'
);
