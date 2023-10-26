import {
  createCanvas,
  loadImage,
  Image,
  ImageData,
  CanvasRenderingContext2D,
} from 'canvas';
import fs from 'fs';
import crypto from 'crypto';

// Define an interface for the imageData object
interface CostumImageData {
  dimensions: {
    width: number;
    height: number;
  };
  pixelData: number[];
}

async function convertAndSaveImage() {
  // Load the JPEG image
  const img: Image = await loadImage('../../../../assets/triangle_64x64.jpg');

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
  const jsData = `const imageData: ImageData = ${JSON.stringify(
    imageDataObject,
    null,
    2
  )};\n\nmodule.exports = imageData;`;
  fs.writeFileSync('pixelData.js', jsData);

  console.log('Pixel data and dimensions saved to pixelData.js');

  //   const imageHash = calculateHash(
  //     imageDataObject.dimensions,
  //     imageDataObject.pixelData
  //   );
  //   console.log('Image Hash:', imageHash);
}

convertAndSaveImage();
