import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from '../database/configs/postgres.config';
import { IdeaImageDao } from './common/dao/idea-image.dao';
import { AuthModule } from './modules/auth/auth.module';
import { IdeasModule } from './modules/ideas/ideas.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UsersModule,
    IdeasModule,
    IdeaImageDao,
  ],
})
export class AppModule {}
