import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { State } from '@enum/character.enum';

@Schema()
export class User extends Document {
  @Prop()
  nameUser: string;
  @Prop()
  emailUser: string;
  @Prop()
  passwordUser: string;
  @Prop()
  photoUser?: string;
  @Prop({ default: State.Active })
  statusUser: State;
}

export const User_Schema = SchemaFactory.createForClass(User);
