import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from '../user/entities';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { LocalAuthGuard } from './guards';

@ApiTags(`Authentication's Endpoint`)
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Body() dto: LoginDTO,
    @User() user: UserEntity
  ) {
    return this.authService.login(user);
  }

  @Auth()
  @Get('profile')
  profile(
    @User() user: UserEntity
  ) {
    return user;
  }
}
