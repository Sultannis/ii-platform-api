import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagDao } from 'src/common/dao/tag.dao';
import { TagsRepository } from './tags.repository';
import { TagsService } from './tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagDao])],
  providers: [TagsService, TagsRepository],
})
export class TagsModule {}
