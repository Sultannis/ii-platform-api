import { Idea } from './idea';

export class Tag {
  id: number;
  name: string;
  createdAt: string;
  users?: Idea[];
}
