import { SetMetadata } from '@nestjs/common';

export const AllowedTypes = (...types: string[]) =>
  SetMetadata('allowedTypes', types);
