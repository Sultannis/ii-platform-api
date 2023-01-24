import { ConflictException, Injectable } from '@nestjs/common';
import { ContactList } from 'src/common/entities/contact-list';
import { ContactListsRepository } from './contact-lists.repositoty';
import { CreateContactsListDto } from './dto/create-contact-list.dto';
import { UpdateContactsListDto } from './dto/update-contact-list.dto';

@Injectable()
export class ContactListsService {
  constructor(
    private readonly contactListsRepository: ContactListsRepository,
  ) {}

  async create(createContactsListDto: CreateContactsListDto): Promise<ContactList> {
    const userContactList = await this.contactListsRepository.findOneByUserId(createContactsListDto.userId)
    if(userContactList) {
      throw new ConflictException('User contact list already exist');
    }

    return this.contactListsRepository.insertAndFetch(createContactsListDto)
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
