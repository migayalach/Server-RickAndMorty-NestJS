import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuxUser } from './aux-user/aux-user';
import { response } from 'helpers/pagination';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@schemas/users.chema';
import { clearOneUser, clearUsers } from 'utils/auxUtil';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly auxUser: AuxUser,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const clearData = {
        nameUser: createUserDto.nameUser,
        emailUser: await this.auxUser.duplicateEmail(createUserDto.emailUser),
        passwordUser: await bycrypt.hash(createUserDto.passwordUser, 10),
        photoUser: createUserDto.photoUser,
      };
      const newUser = new this.userModel(clearData);
      await newUser.save();
      return 'User added';
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

  async findAll(page?: number) {
    try {
      if (!page) {
        page = 1;
      }
      const results = await this.userModel.find({}, { passwordUser: 0 });
      return response(clearUsers(results), page, 'users?');
    } catch (error) {
      console.error('Unexpected error:', error);
      throw new HttpException(
        'So sorry something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(idUser: string) {
    try {
      const userInfo = await this.userModel.findById(idUser, {
        passwordUser: 0,
        __v: 0,
      });
      if (!userInfo) {
        throw new HttpException(
          `Sorry this user don't exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      return clearOneUser(userInfo);
    } catch (error) {
      if (error?.status === 404) {
        throw error;
      }
      // console.error('Unexpected error:', error);
      throw new HttpException(
        'So sorry something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(idUser: string, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(idUser);
      const clearData = {
        nameUser: updateUserDto.nameUser,
        emailUser: updateUserDto.emailUser,
        photoUser: updateUserDto.photoUser,
      };
      await this.userModel.findByIdAndUpdate(idUser, clearData);
      return await this.findOne(idUser);
    } catch (error) {
      if (error?.status === 404) {
        throw error;
      }
      console.error('Unexpected error:', error);
      throw new HttpException(
        'So sorry something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(idUser: string) {
    try {
      await this.findOne(idUser);
      await this.userModel.findByIdAndDelete(idUser);
      return await this.findAll();
    } catch (error) {
      if (error?.status === 404) {
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
