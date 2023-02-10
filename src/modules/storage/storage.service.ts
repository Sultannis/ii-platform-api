import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { InternalServerErrorException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { storageConfig } from 'src/common/configs/storage.config';

@Injectable()
export class StorageService {
  private storageClient = new S3Client({
    region: 'eu-west-3',
    credentials: {
      accessKeyId: storageConfig.awsAccessKey,
      secretAccessKey: storageConfig.awsSecretKey,
    },
  });

  async uploadFile(fileBuffer: Buffer, fileKey: string) {
    try {
      await this.storageClient.send(
        new PutObjectCommand({
          Bucket: 'ii-platform',
          Key: `${fileKey}.webp`,
          Body: fileBuffer,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'Failure during uploading file to storage',
      );
    }
  }

  async deleteFile(fileKey: string) {
    try {
      await this.storageClient.send(
        new DeleteObjectCommand({
          Bucket: 'ii-platform',
          Key: `${fileKey}.webp`,
        }),
      );
    } catch (err) {
      throw new InternalServerErrorException(
        'Failure during deletion of file from storage',
      );
    }
  }
}
