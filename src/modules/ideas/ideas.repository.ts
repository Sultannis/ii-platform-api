import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDao } from 'src/common/dao/idea.dao';
import { Idea } from 'src/common/entities/idea';
import { Repository } from 'typeorm';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';

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

  findOnyById(ideaId: number): Promise<Idea> {
    return this.ideasRepository.findOneBy({
      id: ideaId,
    });
  }

  findOneByIdWithRelations(ideaId: number): Promise<Idea> {
    return this.ideasRepository.findOne({
      where: {
        id: ideaId
      },
      relations: ['images'],
    });
  }

  findAll(userId: number): Promise<Idea[]> {
    return this.ideasRepository.find({
      where: userId ? { authorId: userId } : {},
    });
  }

  async updateAndFetchById(ideaId: number, payload: UpdateIdeaDto) {
    await this.ideasRepository.update(ideaId, payload);

    return this.ideasRepository.findOneBy({
      id: ideaId,
    });
  }

  async softDelete(ideaId: number): Promise<Idea> {
    await this.ideasRepository.softDelete(ideaId);

    return this.ideasRepository.findOne({
      where: {
        id: ideaId,
      },
      withDeleted: true,
    });
  }
}
