import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from '../domain/users.service';
import { UserResource } from './resources/user.resource';
import { PresenterLoginUserDto } from './dto/presenter-login-user.dto';
import { PresenterRegisterUserDto } from './dto/presenter-register-user.dto';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
import { PresenterUpdateUserDto } from './dto/presenter-update-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PresenterFindAllPeopleDto } from './dto/presenter-find-all-people.dto';

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
    };

    const [user, token] = await this.usersService.register(payload);

    return {
      auth: {
        token,
      },
      user: this.userResource.convert(user),
    };
  }

  @Get()
  async fetchAll(
    @Query()
    {
      page = 1,
      per_page: perPage = 20,
      start_timestamp: startTimestamp,
    }: PresenterFindAllPeopleDto,
  ) {
    const [users, total] = await this.usersService.fetchAll({
      page,
      perPage,
      startTimestamp,
    });

    return {
      users: users.map(this.userResource.convert),
      meta: {
        page,
        per_page: perPage,
        total,
      },
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

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() presenterUpdateUserDto: PresenterUpdateUserDto,
  ) {
    const payload: UpdateUserDto = {
      tags: presenterUpdateUserDto.tags,
      email: presenterUpdateUserDto.email,
      firstName: presenterUpdateUserDto.first_name,
      lastName: presenterUpdateUserDto.last_name,
      nickname: presenterUpdateUserDto.nickname,
      birthDate: presenterUpdateUserDto.birth_date,
      residenceCountry: presenterUpdateUserDto.residence_country,
      residenceCity: presenterUpdateUserDto.residence_city,
      occupation: presenterUpdateUserDto.occupation,
      password: presenterUpdateUserDto.password,
      workCompany: presenterUpdateUserDto.work_company,
      educationalInstitution: presenterUpdateUserDto.educational_institution,
      bio: presenterUpdateUserDto.bio,
      telegramNickaname: presenterUpdateUserDto.telegram_nickaname,
      linkedinLink: presenterUpdateUserDto.linkedin_link,
      description: presenterUpdateUserDto.description,
    };

    const user = await this.usersService.update(+userId, payload);

    return {
      user: this.userResource.convert(user),
    };
  }
}
