import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Favorites extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  idUser: Types.ObjectId;
}

export const Favorites_Schema = SchemaFactory.createForClass(Favorites);
