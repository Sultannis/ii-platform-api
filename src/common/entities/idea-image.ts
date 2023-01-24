import { Idea } from './idea';

export class IdeaImage {
  id: number;
  ideaId: number;
  path: string;
  isMain: string;
  created_at: string;
  idea?: Idea;
}
