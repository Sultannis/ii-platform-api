import { forwardRef, Module } from '@nestjs/common';
import { ContactListsService } from './contact-lists.service';
import { ContactListsController } from './accessor/contact-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactListDao } from 'src/common/dao/contact-list.dao';
import { ContactListsRepository } from './contact-lists.repositoty';
import { ContactListResource } from './accessor/resources/contact-list.resource';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactListDao]),
    forwardRef(() => UsersModule),
  ],
  controllers: [ContactListsController],
  providers: [ContactListsService, ContactListsRepository, ContactListResource],
  exports: [ContactListsService],
})
export class ContactListsModule {}
