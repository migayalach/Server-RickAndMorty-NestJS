import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CharactersAPI } from './classAux/charactersAPI';
import { CreateStatusDto } from './dto/create-loading-character.dto';
import { Status } from '@schemas/status.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LoadingCharactersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly charactersAPI: CharactersAPI,
    @InjectModel(Status.name) private statusModel: Model<Status>,
  ) {}

  async create(statusList: CreateStatusDto) {
    const listPromises = statusList.listStatus.map(async (status: string) => {
      const createdStatus = new this.statusModel({
        nameStatus: status,
      });
      return createdStatus.save();
    });
    return Promise.all(listPromises);
  }

  findAll() {
    return this.charactersAPI.loadingCharacters();
  }
}
