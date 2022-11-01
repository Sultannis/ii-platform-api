export class CreateChatMessageDto {
  userId: number;
  roomId: string;
  message: string;
  type?: number;
}
