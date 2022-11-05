import { User } from './user';

export class Idea {
  id: number;
  userId: number;
  title: string;
  description: string;
  requiredFinancialSupport?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  user?: User;
}
