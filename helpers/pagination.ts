import { clearCharacter } from 'utils/auxUtil';
import { navegation } from './navegation';

const elements = 20;

function countPages(array) {
  return Math.ceil(array.length / elements);
}

function operation(data, init, end) {
  const response = [];
  for (let i = init; i <= end; i++) {
    if (data[i]) {
      response.push(data[i]);
    }
  }
  return clearCharacter(response);
}

function responseResults(data, limit) {
  if (limit === 1) {
    return operation(data, 0, 19);
  } else {
    return operation(data, elements * (limit - 1), elements * limit - 1);
  }
}

export const info = (data, page, site) => {
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

export const response = (results, page, site) => {
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
