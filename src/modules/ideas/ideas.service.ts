import { Injectable } from '@nestjs/common';
import { Idea } from 'src/common/entities/idea';
import { UsersService } from '../users/users.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { FindIdeasDto } from './dto/find-ideas.dto';
import { IdeasRepository } from './ideas.repository';

@Injectable()
export class IdeasService {
  constructor(
    private readonly ideasRepository: IdeasRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(payload: CreateIdeaDto): Promise<Idea> {
    await this.usersService.findOneById(payload.autorId);

    return this.ideasRepository.insertAndFetch(payload);
  }

  findIdeasWithStartTimeStamp(
    payload: FindIdeasDto,
  ): Promise<[ideas: Idea[], total: number]> {
    return this.ideasRepository.findAll(payload);
  }
}
