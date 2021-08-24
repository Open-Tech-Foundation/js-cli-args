import { parser } from '../lib/index.esm.js';

describe('Parser', () => {
  test('-a', () => {
    expect(parser('-a')).toEqual({ args: [], opts: { a: true } });
  });

  test('-ab', () => {
    expect(parser('-ab')).toEqual({ args: [], opts: { a: true, b: true } });
  });

  test('-abc', () => {
    expect(parser('-abc')).toEqual({
      args: [],
      opts: { a: true, b: true, c: true },
    });
  });

  test('-a -b', () => {
    expect(parser('-a -b')).toEqual({ args: [], opts: { a: true, b: true } });
  });

  test('-a -b -c', () => {
    expect(parser('-a -b -c')).toEqual({
      args: [],
      opts: { a: true, b: true, c: true },
    });
  });

  test('-n=5', () => {
    expect(parser('-n=5')).toEqual({ args: [], opts: { n: 5 } });
  });

  test('-n=23', () => {
    expect(parser('-n=23')).toEqual({ args: [], opts: { n: 23 } });
  });

  test('-n=-17', () => {
    expect(parser('-n=-17')).toEqual({ args: [], opts: { n: -17 } });
  });

  test('-m=msg', () => {
    expect(parser('-m=msg')).toEqual({ args: [], opts: { m: 'msg' } });
  });

  test(`-m='commit msg'`, () => {
    expect(parser(`-m='commit msg'`)).toEqual({
      args: [],
      opts: { m: 'commit msg' },
    });
  });
});
