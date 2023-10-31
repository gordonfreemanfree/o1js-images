// // file to create an 2x2 png image

// import { createCanvas } from 'canvas';
// import { writeFileSync } from 'fs';

// function generateFourPixelPNG(): Buffer {
//   // Create a 2x2 canvas to represent our 4 pixels
//   const canvas = createCanvas(2, 2);
//   const ctx = canvas.getContext('2d');

//   // Set the colors of the 4 pixels
//   ctx.fillStyle = '#FF0000'; // Red
//   ctx.fillRect(0, 0, 1, 1);

//   ctx.fillStyle = '#00FF00'; // Green
//   ctx.fillRect(1, 0, 1, 1);

//   ctx.fillStyle = '#0000FF'; // Blue
//   ctx.fillRect(0, 1, 1, 1);

//   ctx.fillStyle = '#FFFF00'; // Yellow
//   ctx.fillRect(1, 1, 1, 1);

//   // Convert the canvas to a PNG buffer
//   return canvas.toBuffer('image/png');
// }

// // Usage
// const pngBuffer = generateFourPixelPNG();
// writeFileSync('test2x2.png', pngBuffer);
import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

function generateRandomPixelPNG(width: number, height: number): Buffer {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Helper function to generate a random color
  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Fill the canvas with random colors
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      ctx.fillStyle = getRandomColor();
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Convert the canvas to a PNG buffer
  return canvas.toBuffer('image/png');
}

// Usage
const WIDTH = 20;
const HEIGHT = 20;
const pngBuffer = generateRandomPixelPNG(WIDTH, HEIGHT); // 10x10 image with random colors
writeFileSync(`../../../assets/randomImage${WIDTH}x${HEIGHT}.png`, pngBuffer);
console.log('save to ' + `../../../assets/randomImage${WIDTH}x${HEIGHT}.png`);
