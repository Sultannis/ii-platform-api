import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/common/entities/user';
import { UsersRepository } from 'src/modules/users/users.repository';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserTypes } from 'src/common/constant/user-types';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllPeopleDto } from './dto/find-all-people.dto';
import { FindRecomendedPeopleDto } from './dto/find-recomended-people.dto';
import { CharacteristicsService } from 'src/modules/characteristics/characteristics.service';
import { Characteristic } from 'src/common/entities/characteristic';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
    private readonly characteristicsService: CharacteristicsService,
  ) {}

  async register(
    payload: RegisterUserDto,
  ): Promise<[user: User, token: string]> {
    const candidate = await this.usersRepository.findOneByEmail(payload.email);
    if (candidate) {
      throw new ConflictException('User with provided email already exist');
    }

    const hashedPassword = await this.authService.hashPassword(
      payload.password,
    );

    const user = await this.usersRepository.create({
      ...payload,
      password: hashedPassword,
    });

    const token = this.authService.generateUserAuthToken({
      id: user.id,
      type: UserTypes.USER,
    });

    return [user, token];
  }

  async login(payload: LoginUserDto): Promise<[user: User, token: string]> {
    const user = await this.usersRepository.findOneByEmail(payload.email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const passwordsMatch = await this.authService.comparePasswords(
      user.password,
      payload.password,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    const token = this.authService.generateUserAuthToken({
      id: user.id,
      type: UserTypes.USER,
    });

    return [user, token];
  }

  findAllWithStartTimestamp(
    payload: FindAllPeopleDto,
  ): Promise<[users: User[], total: number]> {
    return this.usersRepository.findAllWithStartTimestamp(payload);
  }

  async findOneById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneWithRelationsById(userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }

  findRecomendedPeopleWithStartTimestamp(
    payload: FindRecomendedPeopleDto,
  ): Promise<[users: User[], total: number]> {
    return this.usersRepository.findRecomendedPeopleWithStartTimestamp(payload);
  }

  async updateOneById(userId: number, payload: UpdateUserDto): Promise<User> {
    let user = await this.usersRepository.findOneWithRelationsById(userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const { characteristics, ...payloadWithoutCharacteristics } = payload;

    if (characteristics) {
      await this.processAndSaveUserCharacteristics(
        characteristics,
        user.characteristics,
        userId,
      );
    }

    return await this.usersRepository.updateAndFetchOneById(
      userId,
      payloadWithoutCharacteristics,
    );
  }

  private async processAndSaveUserCharacteristics(
    characteristics: string[],
    userCharacteristics: Characteristic[],
    userId: number,
  ) {
    const promisesToSaveCharacteristicsAndUserRelation = characteristics.map(
      async (characteristic: string) => {
        let savedCharacteristic =
          await this.characteristicsService.findOneByNameWithoutAbsenceCheck(
            characteristic,
          );
        if (!savedCharacteristic) {
          savedCharacteristic =
            await this.characteristicsService.createWithoutPresenceCheck({
              name: characteristic,
            });
        }

        await this.usersRepository.addAndSaveNewCharacteristicToUserIfDoesntExist(
          userId,
          savedCharacteristic.id,
        );
      },
    );

    const promisesToDeleteCharacteristics = userCharacteristics.map(
      async (userCharacteristic: Characteristic) => {
        if (!characteristics.includes(userCharacteristic.name)) {
          await this.usersRepository.deleteUserCharacteristicByCharacteristicId(
            userId,
            userCharacteristic.id,
          );
        }
      },
    );

    try {
      await Promise.all(promisesToSaveCharacteristicsAndUserRelation);
      const user = await this.usersRepository.findOneWithRelationsById(userId);
      await Promise.all(promisesToDeleteCharacteristics);
    } catch (err) {
      console.log(err);
      throw new ConflictException('User characteristics was not saved');
    }
  }
}
