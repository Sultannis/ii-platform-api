import { Idea } from 'src/common/entities/idea';

export class IdeaResource {
  convert(idea: Idea) {
    return {
      id: idea.id,
      user_id: idea.userId,
      title: idea.title,
      description: idea.description,
      required_financial_support: idea.requiredFinancialSupport,
      created_at: idea.createdAt,
      updated_at: idea.updatedAt,
      deleted_at: idea.deletedAt,
    };
  }
}
