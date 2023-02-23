import { IdeaImage } from './idea-image';
import { Tag } from './tag';
import { User } from './user';

export class Idea {
  id: number;
  authorId: number;
  title: string;
  subtitle: string;
  description: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  author?: User;
  tags?: Tag[];
  images?: IdeaImage[];
}
