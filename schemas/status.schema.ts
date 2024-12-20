import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Status as StatusEnum } from '@enum/character.enum';

@Schema()
export class Status {
  @Prop()
  nameStatus: StatusEnum;
}

export const Status_Schema = SchemaFactory.createForClass(Status);
