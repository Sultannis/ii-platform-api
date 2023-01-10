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
      ],
      migrations: ['../database/migrations/*{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    CharacteristicsModule,
    WorkCompaniesModule,
  ],
})
export class AppModule {}
