import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactListsService } from '../contact-lists.service';
import { CreateContactsListDto } from '../dto/create-contact-list.dto';
import { UpdateContactsListDto } from '../dto/update-contact-list.dto';

@Controller('contacts-lists')
export class ContactListsController {
  constructor(private readonly contactsListsService: ContactListsService) {}

  @Post()
  create(@Body() createContactsListDto: CreateContactsListDto) {
    return this.contactsListsService.create(createContactsListDto);
  }

  @Get()
  findAll() {
    return this.contactsListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsListsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactsListDto: UpdateContactsListDto,
  ) {
    return this.contactsListsService.update(+id, updateContactsListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsListsService.remove(+id);
  }
}
