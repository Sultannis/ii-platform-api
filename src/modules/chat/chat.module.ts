import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChatMessageDao } from 'src/common/dao/chat-message.dao';
import { ChatRoomDao } from 'src/common/dao/chat-room.dao';
import { UserDao } from 'src/common/dao/user.dao';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatMessageService } from './domain/chat-message.service';
import { ChatRoomService } from './domain/chat-room.service';
import { ChatRoomRepository } from './data/chat-room.repository';
import { ChatMessageRepository } from './data/chat-message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessageDao, ChatRoomDao, UserDao])],
  providers: [
    ChatGateway,
    ChatMessageService,
    ChatRoomService,
    ChatMessageRepository,
    ChatRoomRepository,
  ],
})
export class ChatModule {}
