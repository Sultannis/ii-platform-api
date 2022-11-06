import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagDao } from 'src/common/dao/tag.dao';
import { TagsRepository } from './data/tags.repository';
import { TagsService } from './domain/tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagDao])],
  providers: [TagsRepository, TagsService],
  exports: [TagsService],
})
export class TagsModule {}
