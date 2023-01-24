import { PartialType } from '@nestjs/swagger';
import { CreateContactsListDto } from './create-contact-list.dto';

export class UpdateContactsListDto extends PartialType(CreateContactsListDto) {}
