import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Status as StatusEnum } from '@enum/character.enum';
import { Document } from 'mongoose';

@Schema()
export class Status extends Document {
  @Prop({ required: true, unique: true })
  nameStatus: StatusEnum;
}

export const Status_Schema = SchemaFactory.createForClass(Status);
