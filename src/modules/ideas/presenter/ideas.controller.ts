import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from 'src/modules/auth/entities/request-user';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { IdeasService } from '../domain/ideas.service';
import { CreateIdeaDto } from '../dto/create-idea.dto';
import { PresenterCreateIdeaDto } from './dto/presenter-create-idea.dto';
import { IdeaResource } from './resources/idea.resource';

@Controller('ideas')
export class IdeasController {
  constructor(
    private readonly ideasService: IdeasService,
    private readonly ideaResource: IdeaResource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() presenterCreateIdeaDto: PresenterCreateIdeaDto,
    @Req() request: Request,
  ) {
    const requestUser = request.user as RequestUser;

    const payload: CreateIdeaDto = {
      userId: requestUser.id,
      title: presenterCreateIdeaDto.title,
      description: presenterCreateIdeaDto.description,
      requiredFinancialSupport:
        presenterCreateIdeaDto.required_financial_support,
    };

    const idea = await this.ideasService.create(payload);

    return {
      idea: this.ideaResource.convert(idea),
    };
  }
}
