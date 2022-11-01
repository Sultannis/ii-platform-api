import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './domain/auth.service';
import { WsJwtStrategy } from './strategies/ws-jwt.strategy';
import { WsAuthGuard } from './guards/ws-auth.guard';
import authConfig from 'src/common/configs/auth.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: authConfig.jwtSecret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, WsJwtStrategy, WsAuthGuard],
  exports: [PassportModule, AuthService, WsJwtStrategy, WsAuthGuard],
})
export class AuthModule {}
