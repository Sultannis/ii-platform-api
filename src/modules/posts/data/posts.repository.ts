import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDao } from 'src/common/dao/post.dao';
import { Post } from 'src/common/entities/post';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(PostDao)
    private readonly postsRepository: Repository<PostDao>,
  ) {}

  insertAndFetch(payload: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(payload);

    return this.postsRepository.save(post);
  }
}
