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

  /**
   * Get users, This method is <b>ONLY</b> for Admins
   */
  @Auth('ADMIN')
  @Get()
  async getUsers() {
    return await this.userService.getMany();
  }

  /**
   * Delete an user, This method is <b>ONLY</b> for Admins
   */
  @Auth('ADMIN')
  @Delete(':userId')
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return await this.userService.deleteOne(userId);
  }

  /**
   * User register
   */
  @Post('registration')
  async userRegistration(
    @Body() dto: UserRegistrationDTO
  ) {
    return await this.userService.registration(dto);
  }
}
