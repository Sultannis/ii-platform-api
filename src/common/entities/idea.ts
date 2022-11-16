import { User } from './user';

export class Idea {
  id: number;
  userId: number;
  title: string;
  subtitle: string;
  description: string;
  score: number;
  mainImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  user?: User;
}
