import { Injectable } from '@nestjs/common';
import { CreateQualifiacationDto } from './dto/create-qualifiacation.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Qualification } from '@schemas/qualification.schema';

@Injectable()
export class QualifiacationService {
  constructor(
    @InjectModel(Qualification.name)
    private quialificationSchema: Model<Qualification>,
  ) {}

  async create(data: CreateQualifiacationDto) {
    const existQua = await this.quialificationSchema.findOne({
      idUser: new Types.ObjectId(data.idUser),
      idCharacter: new Types.ObjectId(data.idCharacter),
    });
    if (!existQua) {
      const clearData = {
        idUser: new Types.ObjectId(data.idUser),
        idCharacter: new Types.ObjectId(data.idCharacter),
        stars: data.stars,
      };
      const newQua = new this.quialificationSchema(clearData);
      await newQua.save();
      return 'success';
    }

    await this.quialificationSchema.updateOne(
      { _id: existQua._id },
      { $set: { stars: data.stars } },
    );
    return 'success';
  }
}
