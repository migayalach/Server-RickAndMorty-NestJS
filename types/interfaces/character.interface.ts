import { Gender, Species, Status } from 'types/enum/character.enum';

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
