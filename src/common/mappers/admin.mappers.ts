import { AdminDao } from 'src/common/dao/admin.dao';
import { Admin } from 'src/common/entities/admin';

export const mapAdminDaoToEntity = (payload: AdminDao): Admin => ({
  id: payload.id,
  email: payload.email,
  firstName: payload.firstName,
  lastName: payload.lastName,
  role: +payload.role,
  password: payload.password,
  createdAt: payload.createdAt,
  updatedAt: payload.updatedAt,
  deletedAt: payload.deletedAt,
});
