
export interface IUser {
  id: number;
  username: string;
  password?: string;
  roles: ('ADMIN'|'PLAYER')[],
  createdAt: Date;
}