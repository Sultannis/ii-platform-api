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

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessageDao, ChatRoomDao]),
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
  ],
})
export class ChatModule {}
