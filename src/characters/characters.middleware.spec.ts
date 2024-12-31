import { CharactersMiddleware } from './characters.middleware';

describe('CharactersMiddleware', () => {
  it('should be defined', () => {
    expect(new CharactersMiddleware()).toBeDefined();
  });
});
