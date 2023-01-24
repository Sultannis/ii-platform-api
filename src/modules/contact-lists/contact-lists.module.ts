import { Module } from '@nestjs/common';
import { ContactListsService } from './contact-lists.service';
import { ContactListsController } from './accessor/contact-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactListDao } from 'src/common/dao/contact-list.dao';

@Module({
  imports: [TypeOrmModule.forFeature([ContactListDao])],
  controllers: [ContactListsController],
  providers: [ContactListsService],
})
export class ContactListsModule {}
