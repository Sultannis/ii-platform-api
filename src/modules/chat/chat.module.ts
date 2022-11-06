import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessageDao } from 'src/common/dao/chat-message.dao';
import { ChatRoomDao } from 'src/common/dao/chat-room.dao';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatMessageService } from './domain/chat-message.service';
import { ChatRoomService } from './domain/chat-room.service';
import { ChatRoomRepository } from './data/chat-room.repository';
import { ChatMessageRepository } from './data/chat-message.repository';
import { AuthModule } from '../auth/auth.module';
import { ChatRoomResource } from './presenter/resources/chat-room.resource';
import { ChatMessageResource } from './presenter/resources/chat-message.resource';
import { ChatRoomParticipantDao } from 'src/common/dao/chat-room-participant.dao';
import { ChatRoomParticipantRepository } from './data/chat-room-participant.repository';
import { ChatRoomParticipantResource } from './presenter/resources/chat-room-participant.resource';
import { ChatRoomParticipantService } from './domain/chat-room-participant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatMessageDao,
      ChatRoomDao,
      ChatRoomParticipantDao,
    ]),
    AuthModule,
  ],
  providers: [
    ChatGateway,
    ChatMessageService,
    ChatRoomService,
    ChatMessageRepository,
    ChatRoomRepository,
    ChatRoomResource,
    ChatMessageResource,
    ChatRoomParticipantRepository,
    ChatRoomParticipantService,
    ChatRoomParticipantResource,
  ],
})
export class ChatModule {}
