import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nameUser: string;

  @IsEmail()
  @IsNotEmpty()
  emailUser: string;

  @IsString()
  @IsNotEmpty()
  passwordUser: string;

  @IsString()
  @IsOptional()
  photoUser?: string;
}
