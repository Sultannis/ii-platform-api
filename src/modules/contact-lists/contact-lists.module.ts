import { Module } from '@nestjs/common';
import { ContactListsService } from './contact-lists.service';
import { ContactListsController } from './accessor/contact-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactListDao } from 'src/common/dao/contact-list.dao';
import { ContactListsRepository } from './contact-lists.repositoty';

@Module({
  imports: [TypeOrmModule.forFeature([ContactListDao])],
  controllers: [ContactListsController],
  providers: [ContactListsService, ContactListsRepository],
})
export class ContactListsModule {}
