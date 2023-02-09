import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ImagesService {
  constructor(private readonly storageService: StorageService) {}

  async processImageForStorage(imageBuffer: Buffer): Promise<Buffer> {
    const meta = await sharp(imageBuffer).toFormat('webp').toBuffer();

    return meta;
  }

  uploadImageToStorage(imageBuffer: Buffer) {
    return this.storageService.uploadFile(imageBuffer);
  }
}
