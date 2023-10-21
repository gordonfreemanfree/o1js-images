import fs from 'fs';

// image in this folder
// path is relative to the file
const filePath = '../../../assets/test1.jpg';

fs.readFile(filePath, 'base64', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// convert image to matrix
// https://www.npmjs.com/package/image-to-matrix
