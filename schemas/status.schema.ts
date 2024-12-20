import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '@enum/character.enum';

@Schema()
export class StatusSchema {
  @Prop()
  nameStatus: Status;
}

export const Schema_Status = SchemaFactory.createForClass(StatusSchema);
