import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RequestUser } from 'src/modules/auth/entities/request-user';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { IdeasService } from '../ideas.service';
import { AccessorCreateIdeaDto } from './dto/accessor-create-idea.dto';
import { AccessorFindAllIdeasDto } from './dto/accessor-find-all-ideas.dto';
import { AccessorUpdateIdeaDto } from './dto/accessor-update-idea.dto';
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

  @Get()
  async findAll(
    @Query()
    {
      page = 1,
      per_page: perPage = 20,
      start_timestamp: startTimestamp,
    }: AccessorFindAllIdeasDto,
  ) {
    const [ideas, total] = await this.ideasService.findIdeasWithStartTimeStamp({
      page,
      perPage,
      startTimestamp,
    });

    return {
      ideas: ideas.map(this.ideaResource.convert),
      meta: {
        total,
        per_page: perPage,
        start_timestamp: startTimestamp,
      },
    };
  }

  @Patch(':idea_id')
  async update(
    @Param('idea_id') ideaId: string,
    @Body() payload: AccessorUpdateIdeaDto,
  ) {
    const idea = await this.ideasService.updateAndFetchById(+ideaId, payload);

    return {
      idea: this.ideaResource.convert(idea),
    };
  }
}
