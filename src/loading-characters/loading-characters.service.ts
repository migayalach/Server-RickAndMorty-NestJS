import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CharactersAPI } from './classAux/charactersAPI';
import { Status } from '@schemas/status.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LoadingCharactersService {
  constructor(
    private httpService: HttpService,
    private charactersAPI: CharactersAPI,
    @InjectModel(Status.name) private statusModel: Model<Status>,
  ) {}

  async findAll() {
    return await this.charactersAPI.callaAPI();
  }
}
