import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Level extends Document {
  @Prop()
  nameLevel: string;
}

export const Level_Schema = SchemaFactory.createForClass(Level);
