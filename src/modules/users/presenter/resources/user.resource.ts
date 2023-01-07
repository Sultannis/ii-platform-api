import { Injectable } from '@nestjs/common';
import { User } from 'src/common/entities/user';

@Injectable()
export class UserResource {
  convert(user: User) {
    return {
      id: +user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      nickname: user.nickname,
      birth_date: user.birthDate,
      residenceCountry: user.residenceCountry,
      residenceCity: user.residenceCity,
      occupation: user.occupation,
      bio: user.bio,
      role: +user.role,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      confirmed_at: user.confirmedAt,
      deleted_at: user.deletedAt,
    };
  }
}
