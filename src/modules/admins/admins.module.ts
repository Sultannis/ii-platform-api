import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminDao } from 'src/common/dao/admin.dao';
import { AdminsRepository } from './data/admins.repository';
import { AdminsService } from './domain/admins.service';
import { AdminsController } from './presenter/admins.controller';
import { AdminResource } from './presenter/resources/admin.resource';

@Module({
  imports: [TypeOrmModule.forFeature([AdminDao])],
  controllers: [AdminsController],
  providers: [AdminsService, AdminsRepository, AdminResource],
})
export class AdminsModule {}
