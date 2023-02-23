import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaImageDao } from 'src/common/dao/idea-image.dao';
import { IdeaDao } from 'src/common/dao/idea.dao';
import { Idea } from 'src/common/entities/idea';
import { Repository } from 'typeorm';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { FindIdeasDto } from './dto/find-ideas.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';

@Injectable()
export class IdeasRepository {
  constructor(
    @InjectRepository(IdeaDao)
    private readonly ideasRepository: Repository<IdeaDao>,
    @InjectRepository(IdeaImageDao)
    private readonly ideaImagesRepository: Repository<IdeaImageDao>,
  ) {}

  insertAndFetch(payload: CreateIdeaDto): Promise<Idea> {
    const idea = this.ideasRepository.create(payload);

    return this.ideasRepository.save(idea);
  }

  findOneById(ideaId: number): Promise<Idea> {
    return this.ideasRepository.findOneBy({
      id: ideaId,
    });
  }

  findOneByIdWithRelations(ideaId: number): Promise<Idea> {
    return this.ideasRepository.findOne({
      where: {
        id: ideaId,
      },
      relations: ['images'],
    });
  }

  findAll(payload: FindIdeasDto): Promise<[ideas: Idea[], total: number]> {
    const { page, perPage, startTimestamp } = payload;
    const query = this.ideasRepository
      .createQueryBuilder('idea')
      .skip((page - 1) * 20)
      .take(perPage);

    if (startTimestamp) {
      query.where('idea.createdAt <= :startTimestamp', { startTimestamp });
    }

    return query.getManyAndCount();
  }

  findAllByUserId(userId: number): Promise<Idea[]> {
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
