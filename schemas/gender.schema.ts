import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from '@enum/character.enum';

@Schema()
export class GenderSchema {
  @Prop()
  nameGender: Gender;
}

export const Schema_Gender = SchemaFactory.createForClass(GenderSchema);
