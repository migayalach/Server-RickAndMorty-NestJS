import { CharacterResponse } from './character.interface';

export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface PaginatedResponse {
  info: PaginationInfo;
  results: CharacterResponse[];
}
