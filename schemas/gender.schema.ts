import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Gender as GenderEnum } from '@enum/character.enum';

@Schema()
export class Gender {
  @Prop()
  nameGender: GenderEnum;
}

export const Gender_Schema = SchemaFactory.createForClass(Gender);
