// file to create an png image from an array of pixels in the range 0-255

import { createCanvas } from 'canvas';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Convert the URL to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = dirname(__filename);

const jsonPath = join(__dirname, '../../data/circle.json');
const jsonString = readFileSync(jsonPath, 'utf8');
const circle = JSON.parse(jsonString);
// import circle from '../../data/circle.json' assert { type: 'json' };
// const circle = require('../../data/circle.json');

export default function arrayToPNG(
  pixelArray: number[] | Uint32Array,
  width: number,
  height: number,
  name: string
) {
  // Create a canvas with the specified dimensions
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Create an ImageData object from the pixel data
  const imgData = ctx.createImageData(width, height);
  for (let i = 0; i < pixelArray.length; i++) {
    imgData.data[i] = Number(pixelArray[i]);
  }

  // Put the image data on the canvas
  ctx.putImageData(imgData, 0, 0);

  // Save the canvas content as an image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(name + '.png', buffer);

  console.log('Image saved as' + ' ' + name + '.png');
}

arrayToPNG(
  circle.pixelData,
  circle.dimensions.width,
  circle.dimensions.height,
  'circle2'
);
