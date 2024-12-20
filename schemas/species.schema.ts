import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Species as SpeciesEnum } from '@enum/character.enum';

@Schema()
export class Species {
  @Prop()
  nameSpecie: SpeciesEnum;
}

export const Specie_Schema = SchemaFactory.createForClass(Species);
