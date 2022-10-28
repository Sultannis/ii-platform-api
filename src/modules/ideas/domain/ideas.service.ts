import { Injectable, NotFoundException } from '@nestjs/common';
import { Idea } from 'src/common/entities/idea';
import { IdeasRepository } from '../data/ideas.repository';
import { CreateIdeaDto } from '../dto/create-idea.dto';
import { FindAllIdeasDto } from '../dto/find-all-ideas.dto';
import { UpdateIdeaDto } from '../dto/update-idea.dto';

@Injectable()
export class IdeasService {
  constructor(private readonly ideasRepository: IdeasRepository) {}

  create(payload: CreateIdeaDto): Promise<Idea> {
    return this.ideasRepository.insertAndFetch(payload);
  }

  findAll(payload: FindAllIdeasDto): Promise<Idea[]> {
    return this.ideasRepository.findAll(payload);
  }

  async findOne(ideaId: number): Promise<Idea> {
    const idea = await this.ideasRepository.findOneById(ideaId);
    if (!idea) {
      throw new NotFoundException('Idea does not exist');
    }

    return idea;
  }

  async update(ideaId: number, payload: UpdateIdeaDto): Promise<Idea> {
    const idea = await this.ideasRepository.findOneById(ideaId);
    if (!idea) {
      throw new NotFoundException('Idea does not exist');
    }

    return this.ideasRepository.updateAndFetchById(ideaId, payload);
  }
}
