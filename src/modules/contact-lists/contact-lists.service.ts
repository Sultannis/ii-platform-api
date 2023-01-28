import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContactList } from 'src/common/entities/contact-list';
import { UsersService } from '../users/users.service';
import { ContactListsRepository } from './contact-lists.repositoty';
import { CreateContactsListDto } from './dto/create-contact-list.dto';
import { UpdateContactsListDto } from './dto/update-contact-list.dto';

@Injectable()
export class ContactListsService {
  constructor(
    private readonly contactListsRepository: ContactListsRepository,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async create(
    createContactsListDto: CreateContactsListDto,
  ): Promise<ContactList> {
    const userContactList = await this.contactListsRepository.findOneByUserId(
      createContactsListDto.userId,
    );
    if (userContactList) {
      throw new ConflictException(`User's contact list already exist`);
    }

    return this.contactListsRepository.insertAndFetch(createContactsListDto);
  }

  async findOneByUserId(userId: number): Promise<ContactList> {
    const user = await this.usersService.findOneById(userId);

    const contactList = await this.contactListsRepository.findOneByUserId(
      userId,
    );
    if (!contactList) {
      throw new NotFoundException('Contact list does not exist');
    }

    return { email: user.email, ...contactList };
  }

  async update(
    contactListId: number,
    payload: UpdateContactsListDto,
  ): Promise<ContactList> {
    const contactList = await this.contactListsRepository.findOneById(
      contactListId,
    );
    if (!contactList) {
      throw new NotFoundException('Contact list does not exist');
    }

    return this.contactListsRepository.updateAndFetchById(
      contactListId,
      payload,
    );
  }
}
