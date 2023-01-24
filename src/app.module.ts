import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import connectionConfig from './common/configs/connection.config';
import { UserDao } from './common/dao/user.dao';
import { CharacteristicDao } from './common/dao/characteristic.dao';
import { CharacteristicsModule } from './modules/characteristics/characteristics.module';
import { UserCharacteristicDao } from './common/dao/user-characteristic.dao';
import { WorkCompanyDao } from './common/dao/work-company.dao';
import { WorkCompaniesModule } from './modules/work-companies/work-companies.module';
import { EducationalInstitutionsModule } from './modules/educational-institutions/educational-institutions.module';
import { EducationalInstitutionDao } from './common/dao/educational-institution.dao';
import { ContactListsModule } from './modules/contact-lists/contact-lists.module';
import { ContactListDao } from './common/dao/contact-list.dao';
import { IdeaDao } from './common/dao/idea.dao';
import { TagDao } from './common/dao/tag.dao';
import { UserTagDao } from './common/dao/user-tag.dao';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: connectionConfig.host,
      port: connectionConfig.port,
      username: connectionConfig.username,
      password: connectionConfig.password,
      database: connectionConfig.database,
      entities: [
        UserDao,
        CharacteristicDao,
        UserCharacteristicDao,
        WorkCompanyDao,
        EducationalInstitutionDao,
        ContactListDao,
        IdeaDao,
        TagDao,
        UserTagDao,
      ],
      migrations: ['../database/migrations/*{.ts,.js}'],
      synchronize: false,
      ssl:
        process.env.ENVIRONMENT === 'development'
          ? false
          : {
              ca: connectionConfig.sslCert,
            },
    }),
    AuthModule,
    UsersModule,
    CharacteristicsModule,
    WorkCompaniesModule,
    EducationalInstitutionsModule,
    ContactListsModule,
  ],
})
export class AppModule {}
