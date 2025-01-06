import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { State, Create } from '@enum/character.enum';
import { Document, Types } from 'mongoose';

@Schema()
export class Characters extends Document {
  @Prop()
  name: string;
  @Prop({ type: Types.ObjectId, ref: 'Status', required: true })
  status: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Species', required: true })
  species: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Gender', required: true })
  gender: Types.ObjectId;
  @Prop()
  image?: string;
  @Prop({ default: State.Active })
  state: State;
  @Prop({ default: Create.Api })
  create: Create;
}

export const Characters_Schema = SchemaFactory.createForClass(Characters);
