import { Idea } from 'src/common/entities/idea';

export class IdeaResource {
  convert(idea: Idea) {
    return {
      id: +idea.id,
      user_id: +idea.userId,
      title: idea.title,
      subtitle: idea.subtitle,
      description: idea.description,
      score: idea.score,
      mainImageUrl: idea.mainImageUrl,
      created_at: idea.createdAt,
      updated_at: idea.updatedAt,
      deleted_at: idea.deletedAt,
    };
  }
}
