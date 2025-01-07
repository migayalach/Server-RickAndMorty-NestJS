import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  @IsEmail()
  @IsNotEmpty()
  emailUser: string;

  @IsNotEmpty()
  passwordUser: string;
}
