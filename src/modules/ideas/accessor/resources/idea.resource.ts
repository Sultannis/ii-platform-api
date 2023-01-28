import { Idea } from 'src/common/entities/idea';
import { AccessorCreateIdeaDto } from '../dto/accessor-create-idea.dto';

export class IdeaResource {
  convert(idea: Idea) {
    return {
      id: idea.id,
      author_id: idea.authorId,
      title: idea.title,
      subtitle: idea.subtitle,
      description: idea.description,
      likes: idea.likes,
      created_at: idea.createdAt,
      updated_at: idea.updatedAt,
      deleted_at: idea.deletedAt,
    };
  }
}
