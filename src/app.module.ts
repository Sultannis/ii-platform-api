import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from '../database/configs/postgres.config';
import { IdeaImageDao } from './common/dao/idea-image.dao';
import { AuthModule } from './modules/auth/auth.module';
import { IdeasModule } from './modules/ideas/ideas.module';
import { UsersModule } from './modules/users/users.module';
import { ChatModule } from './modules/chat/chat.module';
import { AdminsModule } from './modules/admins/admins.module';
import { TagsModule } from './modules/tags/tags.module';
import connectionConfig from './common/configs/connection.config';
import { AdminDao } from './common/dao/admin.dao';

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
        CHat
      ],
      migrations: ['../database/migrations/*{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    ChatModule,
    IdeasModule,
    IdeaImageDao,
    AdminsModule,
    TagsModule,
  ],
})
export class AppModule {}
