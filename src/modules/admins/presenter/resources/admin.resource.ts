import { Injectable } from '@nestjs/common';
import { Admin } from 'src/common/entities/admin';

@Injectable()
export class AdminResource {
  convert(admin: Admin) {
    return {
      id: +admin.id,
      first_name: admin.firstName,
      last_name: admin.lastName,
      email: admin.email,
      role: admin.role,
      created_at: admin.createdAt,
      updated_at: admin.updatedAt,
      deleted_at: admin.deletedAt,
    };
  }
}
