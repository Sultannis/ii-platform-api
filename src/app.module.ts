import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import connectionConfig from './common/configs/connection.config';
import { UserDao } from './common/dao/user.dao';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: connectionConfig.host,
      port: connectionConfig.port,
      username: connectionConfig.username,
      password: connectionConfig.password,
      database: connectionConfig.database,
      entities: [UserDao],
      migrations: ['../database/migrations/*{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
