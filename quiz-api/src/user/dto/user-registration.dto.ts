import { IsString } from 'class-validator';


export class UserRegistrationDTO {
  @IsString()
  username: string;
  
  @IsString()
  password: string;
}