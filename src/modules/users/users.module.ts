import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { UsersService } from './domain/users.service';
import { UsersController } from './presenter/users.controller';
import { AuthService } from '../auth/domain/auth.service';
import { UsersRepository } from './data/users.repository';
import { UserResource } from './presenter/resources/user.resource';
import { CharacteristicsModule } from '../characteristics/characteristics.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserDao]), CharacteristicsModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, UsersRepository, UserResource],
  exports: [UsersRepository, UsersService, UserResource, TypeOrmModule],
})
export class UsersModule {}
