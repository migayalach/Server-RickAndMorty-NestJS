import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Gender as GenderEnum } from '@enum/character.enum';
import { Document } from 'mongoose';

@Schema()
export class Gender extends Document {
  @Prop({ required: true, unique: true })
  nameGender: GenderEnum;
}

export const Gender_Schema = SchemaFactory.createForClass(Gender);
