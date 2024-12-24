import { clearCharacter } from 'utils/auxUtil';
import { navegation } from './navegation';
import { PaginatedResponse } from '@interfaces/response.interface';
import { CharacterResponse } from '@interfaces/character.interface';

const elements = 20;

function countPages(array: Array<number | string | boolean | object>) {
  return Math.ceil(array.length / elements);
}

function operation(
  data: Array<number | string | boolean | object>,
  init: number,
  end: number,
): CharacterResponse[] {
  const response: CharacterResponse[] = [];
  for (let i = init; i <= end; i++) {
    if (data[i]) {
      response.push(data[i] as CharacterResponse);
    }
  }
  return clearCharacter(response);
}

function responseResults(
  data: Array<number | string | boolean | object>,
  limit: number,
) {
  if (limit === 1) {
    return operation(data, 0, 19);
  } else {
    return operation(data, elements * (limit - 1), elements * limit - 1);
  }
}

export const info = (
  data: Array<number | string | boolean | object>,
  page: number,
  site: string,
) => {
  const pages = countPages(data);
  if (page > pages) {
    throw Error(`There is nothing here`);
  }
  return {
    count: data.length,
    pages,
    ...navegation(pages, page, site),
  };
};

export const response = (
  results: Array<number | string | boolean | object>,
  page: number,
  site: string,
): PaginatedResponse => {
  if (!results.length) {
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };
  }
  return {
    info: info(results, page, site),
    results: responseResults(results, page),
  };
};
