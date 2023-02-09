import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { storageConfig } from 'src/common/configs/storage.config';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
  private client = new S3Client({
    region: 'eu-west-3',
    credentials: {
      accessKeyId: storageConfig.awsAccessKey,
      secretAccessKey: storageConfig.awsSecretKey,
    },
  });

  async uploadFile(buffer: Buffer): Promise<void> {
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: 'ii-platform',
          Key: 'test-keydsf.webp',
          Body: buffer,
        }),
      );
    } catch (err) {
      console.log(err);
      throw new HttpException('Error during uploading file to storage', 133);
    }
  }
}
