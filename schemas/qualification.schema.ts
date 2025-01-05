import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Qualification extends Document {
  @Prop()
  stars: string;
  @Prop()
  comments: string;
}

export const Qualification_Schema = SchemaFactory.createForClass(Qualification);
