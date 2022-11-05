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
  MessagePayload,
  JoinRoomPayload,
  ReadMessagesPayload,
} from 'src/modules/chat/interfaces/chat.interface';
import { ChatRoomParticipantService } from './../domain/chat-room-participant.service';

enum SocketEvent {
  CONNECTION = 'connection',
  ROOMS = 'rooms',
  JOIN = 'join',
  MESSAGE = 'message',
}

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
    private readonly chatRoomParticipantService: ChatRoomParticipantService,
    private readonly chatRoomResource: ChatRoomResource,
    private readonly chatMessageResource: ChatMessageResource,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connection')
  async onUserConnection(client: AuthClient) {
    await this.fetchAndPushRoomsToClient(client);
  }

  @SubscribeMessage('join')
  async OnUserJoinIntoRoom(
    @ConnectedSocket() client: AuthClient,
    @MessageBody() { roomId, page = 1, perPage = 20 }: JoinRoomPayload,
  ) {
    try {
      const user = this.getUser(client);
      const participant = await this.chatRoomParticipantService.findOne(
        +user.id,
        roomId,
      );

      const [roomMessages, total] =
        await this.chatMessageService.findManyByRoomId(roomId, page, perPage);

      const room = await this.chatRoomService.findById(roomId);
      if (room.type === 2) {
        const participants = await this.chatRoomParticipantService.findByRoomId(
          roomId,
        );

        return client.emit(`${SocketEvent.JOIN}-${roomId}`, {
          messages: roomMessages
            .map(this.chatMessageResource.convert)
            .reverse(),
          room: {
            ...room,
            participants: participants.map((el) => ({
              id: el.id,
              userId: +el.user.id,
              name: `${el.user.firstName} ${el.user.lastName}`,
              chatColor: el.user.chatColor,
            })),
          },
          meta: {
            page,
            perPage,
            total,
          },
        });
      }

      const participantsAmount =
        await this.chatRoomParticipantService.findAmountByRoomId(roomId);
      const roomData = participant.room
        ? { ...participant.room, participantsAmount }
        : null;

      if (!participant) {
        await this.chatRoomParticipantService.create({
          userId: +user.id,
          roomId,
        });
      }

      client.emit(`${SocketEvent.JOIN}-${roomId}`, {
        messages: roomMessages.map(this.chatMessageResource.convert).reverse(),
        room: roomData,
        meta: {
          page,
          perPage,
          total,
        },
      });
    } catch (e) {
      client.disconnect();
    }
  }

  @SubscribeMessage('message-read')
  async onUserMessagesRead(
    @ConnectedSocket() client: AuthClient,
    @MessageBody() payload: ReadMessagesPayload,
  ) {
    try {
      const { messageId, roomId } = payload;
      const currentDate = new Date().toISOString();
      const updatedMessage = await this.chatMessageService.update(messageId, {
        readedAt: currentDate,
      });

      this.server.emit(
        `${SocketEvent.MESSAGE}-${roomId}`,
        this.chatMessageResource.convert(updatedMessage),
      );
      await this.fetchAndPushRoomsToClient(client, false, roomId);
    } catch (e) {
      client.disconnect();
    }
  }

  @SubscribeMessage('message')
  async OnUserSendMessage(
    @ConnectedSocket() client: AuthClient,
    @MessageBody() payload: MessagePayload,
  ) {
    try {
      const user = this.getUser(client);
      const { roomId, message } = payload;
      if (!message.trim().length) {
        return;
      }

      const validateUserAccess = await this.chatRoomService.validateUserAccess(
        +user.id,
        roomId,
      );
      if (validateUserAccess) {
        await this.createAndPushChatMessage({
          userId: +user.id,
          roomId,
          message,
        });
        await this.fetchAndPushRoomsToClient(client, false, roomId);
      } else {
        client.disconnect();
      }
    } catch (e) {
      client.disconnect();
    }
  }

  handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.headers.authorization.substring(7);
      this.authService.decodeToken(token);
    } catch (e: unknown) {
      socket.disconnect();
    }
  }

  private getUser(client: AuthClient): User {
    return client.handshake.user;
  }

  private async fetchAndPushRoomsToClient(
    client: AuthClient,
    isFirst = true,
    roomId = '',
  ) {
    const user = this.getUser(client);
    const rooms = await this.chatRoomService.findByUserId(user.id);

    for await (const room of rooms) {
      if (room.type === 2) {
        const participants = await this.chatRoomParticipantService.findByRoomId(
          room.id,
        );
        room.participants = participants;
      }
    }

    client.emit(
      SocketEvent.ROOMS,
      rooms.map((room) => this.chatRoomResource.convert(room)),
    );
  }

  private async createAndPushChatMessage({ userId, roomId, message }) {
    const savedMessage = await this.chatMessageService.create({
      userId,
      roomId,
      message,
    });
    const createdMessage = await this.chatMessageService.findById(
      savedMessage.id,
    );

    this.server.emit(
      `${SocketEvent.MESSAGE}-${roomId}`,
      this.chatMessageResource.convert(createdMessage),
    );
  }
}
