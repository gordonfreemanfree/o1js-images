import fs from 'fs';
import { ImageClass } from './class1.js';
import { Poseidon } from 'o1js';
// image in this folder
// path is relative to the file
const filePath = '../../../assets/test1.jpeg';

fs.readFile(filePath, 'base64', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // convert buffer to matrix

  console.log(data);
  let test = new ImageClass(data);
  console.log(test);
  return ImageClass;
});
