import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { IdeasModule } from './modules/ideas/ideas.module';
import { UsersModule } from './modules/users/users.module';
import { ChatModule } from './modules/chat/chat.module';
import { AdminsModule } from './modules/admins/admins.module';
import { TagsModule } from './modules/tags/tags.module';
import connectionConfig from './common/configs/connection.config';
import { AdminDao } from './common/dao/admin.dao';
import { ChatMessageDao } from './common/dao/chat-message.dao';
import { ChatRoomDao } from './common/dao/chat-room.dao';
import { IdeaDao } from './common/dao/idea.dao';
import { TagDao } from './common/dao/tag.dao';
import { UserDao } from './common/dao/user.dao';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: connectionConfig.host,
      port: connectionConfig.port,
      username: connectionConfig.username,
      password: connectionConfig.password,
      database: connectionConfig.database,
      entities: [
        AdminDao,
        ChatMessageDao,
        ChatRoomDao,
        IdeaDao,
        TagDao,
        UserDao,
      ],
      migrations: ['../database/migrations/*{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    ChatModule,
    IdeasModule,
    AdminsModule,
    TagsModule,
  ],
})
export class AppModule {}
