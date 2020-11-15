import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserRegistrationDTO } from './dto';
import { User } from './entities';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getMany();
  }

  @Delete(':userId')
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<User> {
    return await this.userService.deleteOne(userId);
  }

  @Post('registration')
  async userRegistration(
    @Body() dto: UserRegistrationDTO
  ): Promise<Partial<User>> {
    return await this.userService.registration(dto);
  }
}
