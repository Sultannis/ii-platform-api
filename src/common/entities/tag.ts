import { User } from './user';

export class Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  users?: User[];
}
