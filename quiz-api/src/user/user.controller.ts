import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { UserRegistrationDTO } from './dto';
import { UserService } from './user.service';

@ApiTags(`User's Endpoint`)
@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Auth()
  @Get()
  async getUsers() {
    return await this.userService.getMany();
  }

  @Auth()
  @Delete(':userId')
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return await this.userService.deleteOne(userId);
  }

  @Post('registration')
  async userRegistration(
    @Body() dto: UserRegistrationDTO
  ) {
    return await this.userService.registration(dto);
  }
}
