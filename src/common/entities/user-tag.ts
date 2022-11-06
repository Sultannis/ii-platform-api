import { Tag } from './tag';
import { User } from './user';

export class UserTag {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  user?: User;
  tag: Tag;
}
