import { Injectable } from '@nestjs/common';
import { Post } from 'src/common/entities/post';
import { PostsRepository } from '../data/posts.repository';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  create(payload: CreatePostDto): Promise<Post> {
    return this.postsRepository.insertAndFetch(payload);
  }
}
