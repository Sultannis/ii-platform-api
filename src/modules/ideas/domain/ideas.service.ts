import { Injectable } from '@nestjs/common';
import { Idea } from 'src/common/entities/idea';
import { IdeasRepository } from '../data/ideas.repository';
import { CreateIdeaDto } from '../dto/create-idea.dto';
import { FindAllIdeasDto } from '../dto/find-all-ideas.dto';

@Injectable()
export class IdeasService {
  constructor(private readonly ideasRepository: IdeasRepository) {}

  create(payload: CreateIdeaDto): Promise<Idea> {
    return this.ideasRepository.insertAndFetch(payload);
  }

  findAll(payload: FindAllIdeasDto): Promise<Idea[]> {
    return this.ideasRepository.findAll(payload);
  }
}
