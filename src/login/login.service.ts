import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@schemas/users.chema';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createLoginDto: CreateLoginDto) {
    try {
      const infoData = await this.userModel.findOne({
        emailUser: createLoginDto.emailUser,
      });
      if (!infoData) {
        throw new HttpException(
          `Sorry, the email is not valid.`,
          HttpStatus.NOT_FOUND,
        );
      }
      const isMatch = await bcrypt.compare(
        createLoginDto.passwordUser,
        infoData.passwordUser,
      );
      if (!isMatch) {
        throw new HttpException(
          `Sorry, the password is not valid.`,
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        access: true,
        idUser: infoData._id,
        nameUser: infoData.nameUser,
        photoUser: infoData.photoUser,
      };
    } catch (error) {
      if (error?.status === 409 || error?.status === 404) {
        throw error;
      }
      // console.error('Unexpected error:', error);
      throw new HttpException(
        'So sorry something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
