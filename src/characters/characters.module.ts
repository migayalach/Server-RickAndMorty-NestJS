import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Characters, Characters_Schema } from '@schemas/characters.schema';
import { Gender, Gender_Schema } from '@schemas/gender.schema';
import { Species, Specie_Schema } from '@schemas/species.schema';
import { Status, Status_Schema } from '@schemas/status.schema';
import { AuxResponse } from 'src/aux-response/aux-response';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Characters.name, schema: Characters_Schema },
      { name: Gender.name, schema: Gender_Schema },
      { name: Species.name, schema: Specie_Schema },
      { name: Status.name, schema: Status_Schema },
    ]),
  ],
  controllers: [CharactersController],
  providers: [CharactersService, AuxResponse],
})
export class CharactersModule {}
