import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuxUser } from './aux-user/aux-user';
import { RecordSingUp } from '@enum/user.enum';
import { response } from 'helpers/pagination';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '@schemas/users.chema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly auxUser: AuxUser,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.recordType === RecordSingUp.Standar) {
        const clearData = {
          levelUser: await this.auxUser.countUsers(),
          nameUser: createUserDto.nameUser,
          emailUser: createUserDto.emailUser,
          passwordUser: createUserDto.passwordUser,
          photoUser: createUserDto.photoUser,
        };
        const newUser = new this.userModel(clearData);
        await newUser.save();
        return 'User added successfully';
      } else if (createUserDto.recordType === RecordSingUp.Admin) {
        await this.auxUser.existLevel(createUserDto.levelUser);
        const clearData = {
          levelUser: new Types.ObjectId(createUserDto.levelUser),
          nameUser: createUserDto.nameUser,
          emailUser: createUserDto.emailUser,
          passwordUser: createUserDto.passwordUser,
          photoUser: createUserDto.photoUser,
        };
        const newUser = new this.userModel(clearData);
        await newUser.save();
        return 'User added';
      }
    } catch (error) {}
  }

  async findAll(page?: number) {
    try {
      if (!page) {
        page = 1;
      }
      const results = await this.userModel.find();
      return response(results, page, 'users?');
    } catch (error) {}
  }

  async findOne(id: number) {
    try {
      return `This action returns a #${id} user`;
    } catch (error) {}
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return `This action updates a #${id} user`;
    } catch (error) {}
  }

  remove(id: number) {
    try {
      return `This action removes a #${id} user`;
    } catch (error) {}
  }
}
