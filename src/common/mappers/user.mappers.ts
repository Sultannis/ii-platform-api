import { UserDao } from '../dao/user.dao';
import { User } from '../entities/user';

export const mapUserDaoToEntity = (user: UserDao): User => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
  password: user.password,
  confirmedAt: user.confirmedAt,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  deletedAt: user.deletedAt,
});
