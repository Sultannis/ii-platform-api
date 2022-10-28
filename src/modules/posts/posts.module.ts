import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostDao } from 'src/common/dao/post.dao';

@Module({
  imports: [TypeOrmModule.forFeature([PostDao])],
})
export class PostsModule {}
