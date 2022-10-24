import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { Module } from '@nestjs/common';
import { UsersService } from './domain/users.service';
import { UsersController } from './presenter/users.controller';
import { AuthService } from '../auth/domain/auth.service';
import { UsersRepository } from './data/users.repository';
import { UserResource } from './presenter/resources/user.resource';

@Module({
  imports: [TypeOrmModule.forFeature([UserDao])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, UsersRepository, UserResource],
})
export class UsersModule {}
