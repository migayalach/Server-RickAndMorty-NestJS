import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Qualification extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  idUser: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Characters' })
  idCharacter: Types.ObjectId;
  @Prop()
  stars: number;
}

export const Qualification_Schema = SchemaFactory.createForClass(Qualification);
