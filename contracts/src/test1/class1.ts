export { ImageClass };

function isArrayBuffer(test: any) {
  return (
    Object.prototype.toString.call(test).toLowerCase().indexOf('arraybuffer') >
    -1
  );
}

// Prepare a Buffer object from the arrayBuffer. Necessary in the browser > node conversion,
// But this function is not useful when running in node directly
function bufferFromArrayBuffer(arrayBuffer: any) {
  const buffer = Buffer.alloc(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);

  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }

  return buffer;
}

class ImageClass {
  // An object representing a bitmap in memory, comprising:
  //  - data: a buffer of the bitmap data
  //  - width: the width of the image in pixels
  //  - height: the height of the image in pixels
  //   bitmap = emptyBitmap;

  // Default colour to use for new pixels
  _background = 0x00000000;

  // Default MIME is PNG
  //   _originalMime = Jimp.MIME_PNG;

  // Exif data for the image
  _exif = null;

  // Whether Transparency supporting formats will be exported as RGB or RGBA
  _rgba = true;

  constructor(...args: any[]) {
    // super();

    // const jimpInstance = this;
    // let cb = noop;

    if (isArrayBuffer(args[0])) {
      args[0] = bufferFromArrayBuffer(args[0]);
    }
  }
}

// Jimp.read = function (...args: any[]) {
//   return new Promise((resolve, reject) => {
//     // eslint-disable-next-line no-new
//     new Jimp(...args, (err: any, image: any) => {
//       if (err) reject(err);
//       else resolve(image);
//     });
//   });
// };
