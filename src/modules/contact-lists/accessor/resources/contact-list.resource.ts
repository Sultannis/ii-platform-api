import { Injectable } from '@nestjs/common';
import { ContactList } from 'src/common/entities/contact-list';

@Injectable()
export class ContactListResource {
  convert(contactList: ContactList) {
    return {
      id: contactList.id,
      user_id: contactList.userId,
      phone_number: contactList.phoneNumber,
      linkedin_link: contactList.linkedinLink,
      github_link: contactList.githubLink,
      telegram_nickname: contactList.telegramNickname,
      created_at: contactList.createdAt,
      updated_at: contactList.updatedAt,
    };
  }
}
