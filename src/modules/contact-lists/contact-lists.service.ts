import { Injectable } from '@nestjs/common';
import { CreateContactsListDto } from './dto/create-contact-list.dto';
import { UpdateContactsListDto } from './dto/update-contact-list.dto';

@Injectable()
export class ContactListsService {
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
