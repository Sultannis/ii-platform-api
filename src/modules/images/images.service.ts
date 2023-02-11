import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ImagesService {
  constructor(private readonly storageService: StorageService) {}

  async processImageForStorage(imageBuffer: Buffer) {
    return sharp(imageBuffer)
      .resize({ width: 400, height: 400 })
      .webp()
      .toBuffer();
  }

  async uploadImageToStorage(
    imageBuffer: Buffer,
    fileKey?: string,
  ): Promise<string> {
    const uuidKey = fileKey ? fileKey : uuidv4();
    await this.storageService.uploadFile(imageBuffer, uuidKey);

    return uuidKey;
  }

  deleteImageFromStorage(imageKey: string): Promise<void> {
    return this.storageService.deleteFile(imageKey);
  }
}
