import { Types } from 'mongoose';
import {
  Gender,
  Species,
  Status,
  State,
  Create,
} from 'types/enum/character.enum';

export interface CharactersInterface {
  name: string;
  status: Status;
  species: Species;
  gender: Gender;
  image?: string;
}

export interface CharacterLists {
  listStatus: Status[];
  listSpecies: Species[];
  listGender: Gender[];
  listCharacters: CharactersInterface[];
}

export interface CharacterResponse {
  _id: Types.ObjectId;
  name: string;
  status: Status;
  species: Species;
  gender: Gender;
  image?: string;
  state: State;
  create: Create;
  stars: number;
}
