import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDao } from 'src/common/dao/idea.dao';
import { Idea } from 'src/common/entities/idea';
import { LessThanOrEqual, Repository } from 'typeorm';
import { CreateIdeaDto } from '../dto/create-idea.dto';
import { FindAllIdeasDto } from '../dto/find-all-ideas.dto';

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

  findAll({ page, perPage, startTimestamp }: FindAllIdeasDto): Promise<Idea[]> {
    return this.ideasRepository
      .createQueryBuilder('idea')
      .take(perPage)
      .skip((page - 1) * perPage)
      .where('idea.created_at <= :startTimestamp', {
        startTimestamp,
      })
      .orderBy('idea.created_at', 'DESC')
      .getMany();
  }
}
