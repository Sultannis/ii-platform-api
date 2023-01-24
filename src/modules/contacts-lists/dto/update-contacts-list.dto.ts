import { PartialType } from '@nestjs/swagger';
import { CreateContactsListDto } from './create-contacts-list.dto';

export class UpdateContactsListDto extends PartialType(CreateContactsListDto) {}
