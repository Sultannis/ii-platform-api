import { Global, Module } from '@nestjs/common';
import { AuthService } from './domain/auth.service';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
