import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDao } from 'src/common/dao/user.dao';
import { UsersService } from './users.service';
import { UsersController } from './accessor/users.controller';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from './users.repository';
import { UserResource } from './accessor/resources/user.resource';
import { CharacteristicsModule } from '../characteristics/characteristics.module';
import { UserCharacteristicDao } from 'src/common/dao/user-characteristic.dao';
import { WorkCompaniesModule } from '../work-companies/work-companies.module';
import { EducationalInstitutionsModule } from '../educational-institutions/educational-institutions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDao, UserCharacteristicDao]),
    CharacteristicsModule,
    WorkCompaniesModule,
    EducationalInstitutionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, UsersRepository, UserResource],
  exports: [UsersRepository, UsersService, UserResource, TypeOrmModule],
})
export class UsersModule {}
