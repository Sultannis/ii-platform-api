import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/common/entities/user';
import { UsersRepository } from 'src/modules/users/data/users.repository';
import { AuthService } from 'src/modules/auth/domain/auth.service';
import { UserTypes } from 'src/common/constant/user-types';
import { RegisterUserDto } from 'src/modules/users/dto/register-user.dto';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { TagsService } from 'src/modules/tags/domain/tags.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
    private readonly tagsService: TagsService,
  ) {}

  async register(
    payload: RegisterUserDto,
  ): Promise<[user: User, token: string]> {
    const candidate = await this.usersRepository.findByEmail(payload.email);
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
    const user = await this.usersRepository.findByEmail(payload.email);
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

  async fetchAll()

  async update(userId: number, payload: UpdateUserDto): Promise<User> {
    let user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const { tags, ...payloadWithoutTags } = payload;

    user = await this.usersRepository.updateByIdAndFetch(
      userId,
      payloadWithoutTags,
    );

    if (tags) {
      await this.usersRepository.deleteAllUserTags(userId);
      for (const tagName of tags) {
        let savedTag = await this.tagsService.findOneByName(tagName);
        if (!savedTag) {
          savedTag = await this.tagsService.create(tagName);
        }

        await this.usersRepository.insertUserTagAndFetch(user.id, savedTag.id);
      }
    }

    return this.usersRepository.detailById(user.id);
  }
}
