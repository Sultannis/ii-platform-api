import { UserTag } from './user-tag';

export class Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  users?: UserTag[];
}
