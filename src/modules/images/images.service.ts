import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ImagesService {
  async processImageForStorage(imageBuffer: Buffer) {
    const meta = await sharp(imageBuffer).metadata();
    console.log(meta);
  }
}
