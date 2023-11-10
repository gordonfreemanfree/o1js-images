import { Poseidon } from 'o1js';
import { PixelArrayClass1000 } from '../classes/PixelArrayClass1000.js';

export default function createHashChain(
  arrayOfPixelArrays: PixelArrayClass1000[]
) {
  let hashChain;

  // Start the chain with the hash of the first array
  let currentHash = Poseidon.hash(arrayOfPixelArrays[0].pixelArray);
  hashChain = currentHash;

  // Continue the chain by hashing each subsequent array with the previous hash
  for (let i = 1; i < arrayOfPixelArrays.length; i++) {
    currentHash = Poseidon.hash([
      currentHash,
      Poseidon.hash(arrayOfPixelArrays[i].pixelArray),
    ]);
    hashChain = currentHash;
  }
  console.log('hashChain', hashChain);
  return hashChain;
}
