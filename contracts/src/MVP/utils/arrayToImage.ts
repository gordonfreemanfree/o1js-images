import { createCanvas } from 'canvas';
import fs from 'fs';
import { imageData, dimensions } from './pixelData.js';
// Define the imageData structure

console.log(imageData);

// Extract dimensions and pixel data
const { width, height } = dimensions;
const pixelData = imageData;

// Create a canvas with the specified dimensions
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Create an ImageData object from the pixel data
const imgData = ctx.createImageData(width, height);
for (let i = 0; i < pixelData.length; i++) {
  imgData.data[i] = pixelData[i];
}

// Put the image data on the canvas
ctx.putImageData(imgData, 0, 0);

// Save the canvas content as an image
const buffer = canvas.toBuffer('image/jpeg');
fs.writeFileSync('output.jpg', buffer);

console.log('Image saved as output.jpg');
