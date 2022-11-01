import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/common/entities/user';
import { WsAuthGuard } from 'src/modules/auth/guards/ws-auth.guard';
import { AuthService } from 'src/modules/auth/domain/auth.service';
import { ChatRoomService } from 'src/modules/chat/domain/chat-room.service';
import { ChatMessageService } from 'src/modules/chat/domain/chat-message.service';
import { ChatRoomResource } from 'src/modules/chat/presenter/resources/chat-room.resource';
import { ChatMessageResource } from 'src/modules/chat/presenter/resources/chat-message.resource';
import {
  AuthClient,
  Message,
} from 'src/modules/chat/interfaces/chat.interface';

@WebSocketGateway(9191, {
  namespace: 'chat',
  cors: {
    origin: '*',
    transports: ['websocket', 'polling'],
    credentials: true,
  },
})
@UseGuards(WsAuthGuard)
export class ChatGateway {
  constructor(
    private readonly authService: AuthService,
    private readonly chatRoomService: ChatRoomService,
    private readonly chatMessageService: ChatMessageService,
    private readonly chatRoomResource: ChatRoomResource,
    private readonly chatMessageResource: ChatMessageResource,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connection')
  async onUserConnection(client: AuthClient) {
    const user: User = client.handshake.user;
    const rooms = await this.chatRoomService.findByUserId(user.id);

    client.emit(
      'rooms',
      rooms.map((room) => this.chatRoomResource.covert(room)),
    );
  }

  @SubscribeMessage('join')
  async OnUserJoinRoom(
    @ConnectedSocket() client: AuthClient,
    @MessageBody() roomId: string,
  ) {
    const user: User = client.handshake.user;
    const room = await this.chatRoomService.findById(roomId);
    const roomMessages = await this.chatMessageService.findManyByRoomId(roomId);
    const validateUserAccess =
      await this.chatRoomService.checkUserAccesIntoRoom(+user.id, roomId);

    if (validateUserAccess) {
      client.emit(
        `join-${room.id}`,
        roomMessages.map(this.chatMessageResource.convert),
      );
    } else {
      client.disconnect();
    }
  }

  @SubscribeMessage('message')
  async OnUserSendMessage(
    @ConnectedSocket() client: AuthClient,
    @MessageBody() payload: Message,
  ) {
    const user: User = client.handshake.user;

    const { roomId, message } = payload;
    const validateUserAccess =
      await this.chatRoomService.checkUserAccesIntoRoom(+user.id, roomId);

    if (validateUserAccess) {
      const savedMessage = await this.chatMessageService.create({
        userId: +user.id,
        roomId,
        message,
      });
      const createdMessage = await this.chatMessageService.findById(
        savedMessage.id,
      );
      const rooms = await this.chatRoomService.findByUserId(user.id);

      this.server.emit(
        `join-${roomId}`,
        this.chatMessageResource.convert(createdMessage),
      );
      client.emit(
        'rooms',
        rooms.map((room) => this.chatRoomResource.covert(room)),
      );
    } else {
      client.disconnect();
    }
  }

  handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.headers.authorization.split(' ')[1];
      this.authService.decodeToken(token);
    } catch (e: unknown) {
      socket.disconnect();
    }
  }
}
