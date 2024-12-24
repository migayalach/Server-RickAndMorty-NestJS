import * as dotenv from 'dotenv';
dotenv.config();
const URL = process.env.URL;

const nextRequest = (pages: number, page: number, site: string) => {
  if (page < pages) {
    return `${URL}${site}page=${+page + 1}`;
  }
  return null;
};

const prevRequest = (page: number, site: string) => {
  if (+page === 1) {
    return null;
  }
  return `${URL}${site}page=${+page - 1}`;
};

export function navegation(pages: number, page: number, site: string) {
  return {
    next: nextRequest(pages, page, site),
    prev: prevRequest(page, site),
  };
}
