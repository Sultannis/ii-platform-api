import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../domain/users.service';
import { UserResource } from './resources/user.resource';
import { PresenterLoginUserDto } from './dto/presenter-login-user.dto';
import { PresenterRegisterUserDto } from './dto/presenter-register-user.dto';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userResource: UserResource,
  ) {}

  @Post('register')
  async register(@Body() presenterRegisterUserDto: PresenterRegisterUserDto) {
    const payload: RegisterUserDto = {
      email: presenterRegisterUserDto.email,
      firstName: presenterRegisterUserDto.first_name,
      lastName: presenterRegisterUserDto.last_name,
      password: presenterRegisterUserDto.password,
      occupation: presenterRegisterUserDto.occupation,
    };

    const [user, token] = await this.usersService.register(payload);

    return {
      auth: {
        token,
      },
      user: this.userResource.convert(user),
    };
  }

  @Post('login')
  async login(@Body() presenterLoginUserDto: PresenterLoginUserDto) {
    const payload: LoginUserDto = {
      email: presenterLoginUserDto.email,
      password: presenterLoginUserDto.password,
    };

    const [user, token] = await this.usersService.login(payload);

    return {
      auth: {
        token,
      },
      user: this.userResource.convert(user),
    };
  }
}
