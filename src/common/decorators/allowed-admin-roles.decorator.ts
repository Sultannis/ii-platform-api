import { SetMetadata } from '@nestjs/common';

export const AllowedAdminRoles = (...roles: number[]) =>
  SetMetadata('allowedAdminRoles', roles);
