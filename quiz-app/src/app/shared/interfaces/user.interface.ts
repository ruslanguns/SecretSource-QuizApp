import { Role } from '../enums/role.enum';

export interface IUser {
  id: number;
  username: string;
  password?: string;
  roles: Role[],
  createdAt: Date;
}