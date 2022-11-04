import { ConflictException, Injectable } from '@nestjs/common';
import { Tag } from 'src/common/entities/tag';
import { TagsRepository } from '../data/tags.repository';
import { CreateTagDto } from '../dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async create(payload: CreateTagDto): Promise<Tag> {
    const tag = await this.tagsRepository.findByName(payload.name);
    if (tag) {
      throw new ConflictException('Tag with provided name already exist');
    }

    return this.tagsRepository.insertAndFetch(payload);
  }

  findOneByName(name: string): Promise<Tag> {
    return this.tagsRepository.findByName(name);
  }
}
