import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserResource } from './resources/user.resource';
import { AccessorLoginUserDto } from './dto/accessor-login-user.dto';
import { AccessorRegisterUserDto } from './dto/accessor-register-user.dto';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
import { AccessorUpdateUserDto } from './dto/accessor-update-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AccessorFindAllPeopleDto } from './dto/accessor-find-all-people.dto';
import { AccessorFetchRecomendedPeopleDto } from './dto/accessor-fetch-recomended-people.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userResource: UserResource,
  ) {}

  @Post('register')
  async register(@Body() accessorRegisterUserDto: AccessorRegisterUserDto) {
    const payload: RegisterUserDto = {
      email: accessorRegisterUserDto.email,
      firstName: accessorRegisterUserDto.first_name,
      lastName: accessorRegisterUserDto.last_name,
      password: accessorRegisterUserDto.password,
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
  async login(@Body() accessorLoginUserDto: AccessorLoginUserDto) {
    const payload: LoginUserDto = {
      email: accessorLoginUserDto.email,
      password: accessorLoginUserDto.password,
    };

    const [user, token] = await this.usersService.login(payload);

    return {
      auth: {
        token,
      },
      user: this.userResource.convert(user),
    };
  }

  @Get(':user_id')
  async findOne(@Param('user_id') userId: string) {
    const user = await this.usersService.findOneById(+userId);

    return {
      user: this.userResource.convert(user),
    };
  }

  @Get()
  async findAll(
    @Query()
    {
      page = 1,
      per_page: perPage = 20,
      start_timestamp: startTimestamp,
    }: AccessorFindAllPeopleDto,
  ) {
    const [users, total] = await this.usersService.findAllWithStartTimestamp({
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

  @Get(':user_id/recomended-people')
  async findRecomendedPeople(
    @Param('user_id') userId: string,
    @Query()
    {
      page = 1,
      per_page: perPage = 20,
      start_timestamp: startTimestamp,
    }: AccessorFetchRecomendedPeopleDto,
  ) {
    const [users, total] =
      await this.usersService.findRecomendedPeopleWithStartTimestamp({
        userId: +userId,
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

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() accessorUpdateUserDto: AccessorUpdateUserDto,
  ) {
    const payload: UpdateUserDto = {
      firstName: accessorUpdateUserDto.first_name,
      lastName: accessorUpdateUserDto.last_name,
      nickname: accessorUpdateUserDto.nickname,
      birthDate: accessorUpdateUserDto.birth_date,
      residenceCountry: accessorUpdateUserDto.residence_country,
      residenceCity: accessorUpdateUserDto.residence_city,
      occupation: accessorUpdateUserDto.occupation,
      bio: accessorUpdateUserDto.bio,
      characteristics: accessorUpdateUserDto.characteristics,
    };

    const user = await this.usersService.updateOneById(+userId, payload);

    return {
      user: this.userResource.convert(user),
    };
  }
}
