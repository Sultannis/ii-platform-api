import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChatMessageDao } from 'src/common/dao/chat-message.dao';
import { ChatRoomDao } from 'src/common/dao/chat-room.dao';
import { UserDao } from 'src/common/dao/user.dao';
import { ChatService } from './chat.service';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatRoomRepository } from './data/chat-room.repository';
import { ChatMessageRepository } from './data/chat-message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessageDao, ChatRoomDao, UserDao])],
  providers: [
    ChatGateway,
    ChatService,
    ChatMessageRepository,
    ChatRoomRepository,
  ],
})
export class ChatModule {}
