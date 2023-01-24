import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactListDao } from 'src/common/dao/contact-list.dao';
import { ContactList } from 'src/common/entities/contact-list';
import { Repository } from 'typeorm';
import { CreateContactsListDto } from './dto/create-contact-list.dto';
import { UpdateContactsListDto } from './dto/update-contact-list.dto';

@Injectable()
export class ContactListsRepository {
  constructor(
    @InjectRepository(ContactListDao)
    private readonly contactListsRepository: Repository<ContactListDao>,
  ) {}

  insertAndFetch(payload: CreateContactsListDto): Promise<ContactList> {
    const contactList = this.contactListsRepository.create(payload);

    return this.contactListsRepository.save(contactList);
  }

  findOneById(contactListId: number): Promise<ContactList> {
    return this.contactListsRepository.findOneBy({
      id: contactListId,
    });
  }

  findOneByUserId(userId: number): Promise<ContactList> {
    return this.contactListsRepository.findOneBy({
      userId,
    });
  }

  async updateAndFetchById(
    contactListId: number,
    payload: UpdateContactsListDto,
  ): Promise<ContactList> {
    await this.contactListsRepository.update(contactListId, payload);

    return this.contactListsRepository.findOneBy({
      id: contactListId,
    });
  }
}
