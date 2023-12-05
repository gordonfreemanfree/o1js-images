// file to convert image to matrix

import {
  createCanvas,
  loadImage,
  Image,
  ImageData,
  CanvasRenderingContext2D,
} from 'canvas';
import fs from 'fs';

// Define an interface for the imageData object
interface CostumImageData {
  dimensions: {
    width: number;
    height: number;
  };
  pixelData: number[];
}

const IMGPATH = '../../../data/circle4x4.png';
const WIDTH = 4;
const HEIGHT = 4;

export default async function convertAndSaveImage() {
  // Load the JPEG image
  const img: Image = await loadImage(IMGPATH);

  // Create a canvas
  const canvas = createCanvas(img.width, img.height);
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  // Draw the image on the canvas
  ctx.drawImage(img, 0, 0);

  // Get pixel data
  const imageData: ImageData = ctx.getImageData(0, 0, img.width, img.height);
  const pixels: Uint8ClampedArray = imageData.data;

  // Convert pixel data to a new array with values in the range of 0 to 255
  const normalizedData: Uint8Array = new Uint8Array(pixels.length);

  for (let i = 0; i < pixels.length; i++) {
    // Normalize each RGB value to the range 0-255
    normalizedData[i] = Math.round((pixels[i] / 255) * 255);
  }

  // Create an object that includes both the pixel data and the image dimensions
  const imageDataObject: CostumImageData = {
    dimensions: { width: img.width, height: img.height },
    pixelData: Array.from(normalizedData),
  };

  // Save the combined data as a JavaScript object in a .js file
  const jsData = `${JSON.stringify(imageDataObject, null, 2)}`;
  fs.writeFileSync(`../data/pixelData${WIDTH}x${HEIGHT}.ts`, jsData);

  console.log('Pixel data and dimensions saved to pixelData.js');
}

convertAndSaveImage();
