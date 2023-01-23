import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { RequestUser } from '../entities/request-user';
import authConfig from 'src/common/configs/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtSecret,
    });
  }

  validate(payload: Record<string, string | number>): RequestUser {
    return {
      id: payload.id as number,
      type: payload.type as string,
    };
  }
}
