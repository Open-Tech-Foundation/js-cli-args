import esCliArgs from '../lib/index.js';

describe('esCliArgs', () => {
  test('index', () => {
    expect(esCliArgs()).toMatch(/Hello World!/);
  });
});
