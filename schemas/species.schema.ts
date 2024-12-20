import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Species } from '@enum/character.enum';

@Schema()
export class SpecieSchema {
  @Prop()
  nameSpecie: Species;
}

export const Schema_Specie = SchemaFactory.createForClass(SpecieSchema);
