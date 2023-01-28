import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RequestUser } from 'src/modules/auth/entities/request-user';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { IdeasService } from '../ideas.service';
import { AccessorCreateIdeaDto } from './dto/accessor-create-idea.dto';
import { IdeaResource } from './resources/idea.resource';

@ApiTags('Ideas')
@Controller('ideas')
export class IdeasController {
  constructor(
    private readonly ideasService: IdeasService,
    private readonly ideaResource: IdeaResource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() payload: AccessorCreateIdeaDto, @Req() req: Request) {
    const user = req.user as RequestUser;

    const idea = await this.ideasService.create({
      authorId: user.id,
      ...payload,
    });

    return {
      idea: this.ideaResource.convert(idea),
    };
  }
}
