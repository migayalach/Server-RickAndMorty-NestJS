import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Species as SpeciesEnum } from '@enum/character.enum';
import { Document } from 'mongoose';

@Schema()
export class Species extends Document {
  @Prop({ required: true, unique: true })
  nameSpecie: SpeciesEnum;
}

export const Specie_Schema = SchemaFactory.createForClass(Species);
