import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class CreateLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Min(0)
  email: string;

  @IsNotEmpty()
  @Min(0)
  passwordUser: string;
}
