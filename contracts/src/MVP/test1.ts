import { ImageClass8x8, ImageSize8x8 } from './imageClass';
import { preprocessImage } from './utils/preprocessImage';
import { image_1_label_2_8x8 } from '../../assets/image_1_label_2_8x8';

let test = new ImageSize8x8(preprocessImage(image_1_label_2_8x8));
console.log(test);
