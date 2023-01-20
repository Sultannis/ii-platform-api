import { Injectable } from '@nestjs/common';
import { User } from 'src/common/entities/user';
import { CharacteristicResource } from 'src/modules/characteristics/accessor/resources/characteristic.resource';
import { WorkCompanyResource } from 'src/modules/work-companies/accessor/resources/work-company.resource';

@Injectable()
export class UserResource {
  constructor(
    private readonly characteristicResource: CharacteristicResource,
    private readonly workCompanyResource: WorkCompanyResource,
  ) {}

  convert(user: User) {
    return {
      id: +user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      nickname: user.nickname,
      birth_date: user.birthDate,
      residence_country: user.residenceCountry,
      residence_city: user.residenceCity,
      occupation: user.occupation,
      bio: user.bio,
      avatar_url: user.avatarUrl,
      role: +user.role,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      confirmed_at: user.confirmedAt,
      deleted_at: user.deletedAt,
      characteristics: user.characteristics
        ? user.characteristics.map((characteristic) => characteristic.name)
        : null,
      work_companies: user.workCompanies
        ? user.workCompanies.map(this.workCompanyResource.convert)
        : null,
    };
  }
}
