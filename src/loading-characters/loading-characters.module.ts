import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoadingCharactersService } from './loading-characters.service';
import { LoadingCharactersController } from './loading-characters.controller';
import { CharactersAPI } from './classAux/charactersAPI';
import { MongooseModule } from '@nestjs/mongoose';
import { Gender, Gender_Schema } from '@schemas/gender.schema';
import { Species, Specie_Schema } from '@schemas/species.schema';
import { Status, Status_Schema } from '@schemas/status.schema';
import { Characters_Schema, Characters } from '@schemas/characters.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Characters.name,
        schema: Characters_Schema,
      },
      {
        name: Gender.name,
        schema: Gender_Schema,
      },
      {
        name: Species.name,
        schema: Specie_Schema,
      },
      {
        name: Status.name,
        schema: Status_Schema,
      },
    ]),
  ],
  controllers: [LoadingCharactersController],
  providers: [LoadingCharactersService, CharactersAPI],
})
export class LoadingCharactersModule {}
