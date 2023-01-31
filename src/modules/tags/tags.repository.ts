import { InjectRepository } from '@nestjs/typeorm';
import { TagDao } from 'src/common/dao/tag.dao';
import { Tag } from 'src/common/entities/tag';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';

export class TagsRepository {
  constructor(
    @InjectRepository(TagDao)
    private readonly tagsRepository: Repository<TagDao>,
  ) {}

  insertAndFetch(payload: CreateTagDto): Promise<Tag> {
    const tag = this.tagsRepository.create(payload);

    return this.tagsRepository.save(tag);
  }

  findOneByName(name: string): Promise<Tag> {
    return this.tagsRepository.findOneBy({
      name,
    });
  }
}
