import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@schemas/users.chema';
import { HttpException, HttpStatus } from '@nestjs/common';

export class AuxUser {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async duplicateEmail(email: string) {
    const data = await this.userModel.findOne({ emailUser: email });
    if (data) {
      throw new HttpException(`This email exist!`, HttpStatus.CONFLICT);
    }
    return email;
  }
}
