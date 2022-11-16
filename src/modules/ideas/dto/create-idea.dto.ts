export class CreateIdeaDto {
  userId: number;
  title: string;
  subtitle: string;
  description: string;
  mainImageUrl?: string;
}
