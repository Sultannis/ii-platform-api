import { ConflictException, Injectable } from '@nestjs/common';
import { Tag } from 'src/common/entities/tag';
import { TagsRepository } from '../data/tags.repository';
import { CreateTagDto } from '../dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async create(name: string): Promise<Tag> {
    const tag = await this.tagsRepository.findByName(name);
    if (tag) {
      throw new ConflictException('Tag with provided name already exist');
    }

    return this.tagsRepository.insertAndFetch({ name });
  }

  findOneByName(name: string): Promise<Tag> {
    return this.tagsRepository.findByName(name);
  }
}
