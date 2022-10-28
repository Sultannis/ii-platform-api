import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDao } from 'src/common/dao/idea.dao';
import { Idea } from 'src/common/entities/idea';
import { Repository } from 'typeorm';
import { CreateIdeaDto } from '../dto/create-idea.dto';

@Injectable()
export class IdeasRepository {
  constructor(
    @InjectRepository(IdeaDao)
    private readonly ideasRepository: Repository<IdeaDao>,
  ) {}

  insertAndFetch(payload: CreateIdeaDto): Promise<Idea> {
    const idea = this.ideasRepository.create(payload);

    return this.ideasRepository.save(idea);
  }
}
