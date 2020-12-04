import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities';
import { getRepository } from 'typeorm';
import { ADMIN_USER, ADMIN_PASSWORD } from '../../config/constants';

export const setAdminUserScript = async (
  config: ConfigService,
): Promise<void> => {
  const userRepository = getRepository<User>(User);
  const username = config.get<string>(ADMIN_USER);
  const password = config.get<string>(ADMIN_PASSWORD);
  const userExist = await userRepository.findOne({ username });

  if (!userExist) {
    const adminUser = userRepository.create({
      username,
      password,
      roles: ['ADMIN'],
    });
    await userRepository.save(adminUser);
    return;
  }
};
