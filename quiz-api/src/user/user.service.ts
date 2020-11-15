import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegistrationDTO } from './dto';
import { User } from './entities';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async registration(dto: UserRegistrationDTO) {
    const userExists = await this.getByUsername(dto.username);
    if (userExists) {
      throw new BadRequestException(`USERNAME ALREADY REGISTERED`);
    }
    const newUser = this.userRepository.create(dto)
    const { password, ...user } = await this.userRepository.save(newUser);
    return user;
  }

  async getMany(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getByUsername(username: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ username })
      .addSelect('user.password')
      .getOne();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`USER DOES NOT EXIST`);
    }
    return user;
  }

  async deleteOne(id: number): Promise<User> {
    const user = await this.getById(id);
    return await this.userRepository.remove(user);
  }

}
