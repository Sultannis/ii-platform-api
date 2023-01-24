import { Module } from '@nestjs/common';
import { ContactsListsService } from './contacts-lists.service';
import { ContactsListsController } from './contacts-lists.controller';

@Module({
  controllers: [ContactsListsController],
  providers: [ContactsListsService]
})
export class ContactsListsModule {}
