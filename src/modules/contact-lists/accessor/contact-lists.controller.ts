import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactListsService } from '../contact-lists.service';
import { UpdateContactsListDto } from '../dto/update-contact-list.dto';
import { AccessorFindUserContactListDto } from './dto/accessor-find-user-contact-list.dto';
import { AccessorUpdateUserContactListDto } from './dto/accessor-update-user-contact-list.dto';
import { ContactListResource } from './resources/contact-list.resource';

@ApiTags('Contact-lists')
@Controller('contact-lists')
export class ContactListsController {
  constructor(
    private readonly contactsListsService: ContactListsService,
    private readonly contactListResource: ContactListResource,
  ) {}

  @Get('/one')
  async findOne(@Query() { user_id: userId }: AccessorFindUserContactListDto) {
    const contactList = await this.contactsListsService.findOneByUserId(userId);

    return {
      contact_list: this.contactListResource.convert(contactList),
    };
  }

  @Patch(':contact_list_id')
  async update(
    @Param('contact_list_id') contactListId: string,
    @Body() accessorUpdateUserContactListDto: AccessorUpdateUserContactListDto,
  ) {
    const payload: UpdateContactsListDto = {
      phoneNumber: accessorUpdateUserContactListDto.phone_number,
      linkedinLink: accessorUpdateUserContactListDto.linkedin_link,
      githubLink: accessorUpdateUserContactListDto.github_link,
      telegramNickname: accessorUpdateUserContactListDto.telegram_nickname,
    };

    const contactList = await this.contactsListsService.update(
      +contactListId,
      payload,
    );

    return {
      contact_list: this.contactListResource.convert(contactList),
    };
  }
}
