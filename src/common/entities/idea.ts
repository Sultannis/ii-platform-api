import { User } from './user';

export class Idea {
  id: number;
  userId: number;
  title: string;
  subtitle: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  user?: User;
}
