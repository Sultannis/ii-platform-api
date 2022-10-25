import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from '../database/configs/postgres.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, UsersModule, ChatModule],
})
export class AppModule {}
