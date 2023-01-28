import { Injectable, NotFoundException } from '@nestjs/common';
import { Idea } from 'src/common/entities/idea';
import { UsersService } from '../users/users.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { FindIdeasDto } from './dto/find-ideas.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { IdeasRepository } from './ideas.repository';

@Injectable()
export class IdeasService {
  constructor(
    private readonly ideasRepository: IdeasRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(payload: CreateIdeaDto): Promise<Idea> {
    await this.usersService.findOneById(payload.authorId);

    return this.ideasRepository.insertAndFetch(payload);
  }

  findIdeasWithStartTimeStamp(
    payload: FindIdeasDto,
  ): Promise<[ideas: Idea[], total: number]> {
    return this.ideasRepository.findAll(payload);
  }

  async findOne(ideaId: number): Promise<Idea> {
    const idea = await this.ideasRepository.findOneByIdWithRelations(ideaId);
    if (!idea) {
      throw new NotFoundException('Idea does not exist');
    }

    return idea;
  }

  async updateAndFetchById(
    ideaId: number,
    payload: UpdateIdeaDto,
  ): Promise<Idea> {
    const idea = await this.ideasRepository.findOneById(ideaId);
    if (!idea) {
      throw new NotFoundException('Idea does not exist');
    }

    return this.ideasRepository.updateAndFetchById(ideaId, payload);
  }

  async delete(ideaId: number): Promise<Idea> {
    const idea = await this.ideasRepository.findOneById(ideaId);
    if (!idea) {
      throw new NotFoundException('Idea does not exist');
    }

    return this.ideasRepository.softDelete(ideaId);
  }
}
