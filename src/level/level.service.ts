import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Level } from '@schemas/level.schema';
import { Model } from 'mongoose';

@Injectable()
export class LevelService {
  constructor(@InjectModel(Level.name) private levelModel: Model<Level>) {}

  public async createLevel() {
    const list = ['Admin', 'Standar'];
    const listPromises = list.map(async (nameLevel: string) => {
      const levelCreate = new this.levelModel({
        nameLevel,
      });
      return levelCreate.save();
    });
    return await Promise.all(listPromises);
  }

  public async getAllLevel() {
    return await this.levelModel.find({}, '_id nameLevel');
  }

  async findAll() {
    try {
      if (!(await this.levelModel.countDocuments())) {
        await this.createLevel();
      }
      return await this.getAllLevel();
    } catch (error) {
      console.error('Unexpected error:', error);
      return `So sorry something went wrong!`;
    }
  }
}
