import { Body, Controller, Post } from '@nestjs/common';
import { AdminsService } from '../domain/admins.service';
import { AdminResource } from './resources/admin.resource';
import { PresenterLoginAdminDto } from './dto/presenter-login-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly adminResource: AdminResource,
  ) {}

  @Post('login')
  async login(@Body() presenterLoginAdminDto: PresenterLoginAdminDto) {
    const [admin, token] = await this.adminsService.login({
      email: presenterLoginAdminDto.email,
      password: presenterLoginAdminDto.password,
    });

    return {
      auth: {
        token,
      },
      admin: this.adminResource.convert(admin),
    };
  }
}
