import { Injectable } from '@nestjs/common';
import { CreateContactsListDto } from './dto/create-contacts-list.dto';
import { UpdateContactsListDto } from './dto/update-contacts-list.dto';

@Injectable()
export class ContactsListsService {
  create(createContactsListDto: CreateContactsListDto) {
    return 'This action adds a new contactsList';
  }

  findAll() {
    return `This action returns all contactsLists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactsList`;
  }

  update(id: number, updateContactsListDto: UpdateContactsListDto) {
    return `This action updates a #${id} contactsList`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactsList`;
  }
}
