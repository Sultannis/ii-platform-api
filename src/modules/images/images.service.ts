import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ImagesService {
  constructor() {
    
  }

  async processImageForStorage(imageBuffer: Buffer): Promise<Buffer> {
    const meta = await sharp(imageBuffer).toFormat('webp').toBuffer();

    return meta;
  }

  async uploadImageToStorage(
    
  ) {}
}
