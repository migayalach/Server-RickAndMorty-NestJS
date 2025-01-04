import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Level } from '@schemas/level.schema';
import { User } from '@schemas/users.chema';
import { RecordSingUp } from '@enum/user.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

export class AuxUser {
  constructor(
    @InjectModel(Level.name) private levelModel: Model<Level>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  public async countUsers() {
    const userCount = await this.userModel.countDocuments();
    const nameLevel = !userCount ? RecordSingUp.Admin : RecordSingUp.Standar;
    const infoLevel = await this.levelModel
      .findOne({ nameLevel })
      .select('_id');
    if (!infoLevel) {
      throw new HttpException(
        `Sorry in this moment can't use this service`,
        HttpStatus.NOT_FOUND,
      );
    }
    return infoLevel._id;
  }

  public async duplicateEmail(email: string) {
    const data = await this.userModel.findOne({ emailUser: email });
    if (data) {
      throw new HttpException(`This email exist!`, HttpStatus.CONFLICT);
    }
    return;
  }

  public async existLevel(idLevel: string) {
    const dataLevel = await this.levelModel.findById(idLevel);
    if (!dataLevel) {
      throw new HttpException(
        `Sorry, this level doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }
}
