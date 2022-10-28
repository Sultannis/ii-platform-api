import { Controller, Post, Body, Req } from "@nestjs/common";
import { Request } from 'express';
import { RequestUser } from "src/modules/auth/entities/request-user";
import { PostsService } from "../domain/posts.service";
import { CreatePostDto } from "../dto/create-post.dto";
import { PresenterCreatePostDto } from "./dto/presenter-create-post.dto";

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Post()
  async create(@Body() presenterCreatePostDto: PresenterCreatePostDto, @Req() request: Request ) {
    const requestUser = request.user as RequestUser;

    const payload: CreatePostDto = {
      title: presenterCreatePostDto.title,
      description: presenterCreatePostDto.description,
      
    }
  }
}