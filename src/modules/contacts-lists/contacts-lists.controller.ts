import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactsListsService } from './contacts-lists.service';
import { CreateContactsListDto } from './dto/create-contacts-list.dto';
import { UpdateContactsListDto } from './dto/update-contacts-list.dto';

@Controller('contacts-lists')
export class ContactsListsController {
  constructor(private readonly contactsListsService: ContactsListsService) {}

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
  update(@Param('id') id: string, @Body() updateContactsListDto: UpdateContactsListDto) {
    return this.contactsListsService.update(+id, updateContactsListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsListsService.remove(+id);
  }
}
