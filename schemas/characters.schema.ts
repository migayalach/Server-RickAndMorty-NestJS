import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Species, Status, State, Create } from '@enum/character.enum';

@Schema()
export class CharactersSchema {
  @Prop()
  name: string;
  @Prop()
  status: Status;
  @Prop()
  species: Species;
  @Prop()
  gender: Gender;
  @Prop()
  image?: string;
  @Prop({ default: State.Active })
  state: State;
  @Prop({ default: Create.Api })
  create: Create;
  @Prop({ default: 0 })
  stars: number;
}

export const Schema_Characters = SchemaFactory.createForClass(CharactersSchema);
