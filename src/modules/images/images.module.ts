import { Module } from '@nestjs/common';
import { StorageModule } from '../storage/storage.module';
import { ImagesService } from './images.service';

@Module({
  imports: [StorageModule],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
