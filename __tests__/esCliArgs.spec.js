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

  test('-x=0 -y=-25 -z=180', () => {
    expect(parser('-x=0 -y=-25 -z=180')).toEqual({
      args: [],
      opts: { x: 0, y: -25, z: 180 },
    });
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

  test(`-a -m='commit msg'`, () => {
    expect(parser(`-a -m='commit msg'`)).toEqual({
      args: [],
      opts: { a: true, m: 'commit msg' },
    });
  });

  test('--verbose', () => {
    expect(parser('--verbose')).toEqual({
      args: [],
      opts: { verbose: true },
    });
  });

  test('--dry-run', () => {
    expect(parser('--dry-run')).toEqual({
      args: [],
      opts: { dryRun: true },
    });
  });

  test('--dry-run --ignore-errors', () => {
    expect(parser('--dry-run --ignore-errors')).toEqual({
      args: [],
      opts: { dryRun: true, ignoreErrors: true },
    });
  });

  test('--file=a.txt', () => {
    expect(parser('--file=a.txt')).toEqual({
      args: [],
      opts: { file: 'a.txt' },
    });
  });

  test('--pathspec-from-file', () => {
    expect(parser('--pathspec-from-file')).toEqual({
      args: [],
      opts: { pathspecFromFile: true },
    });
  });

  test('--chmod=+x', () => {
    expect(parser('--chmod=+x')).toEqual({
      args: [],
      opts: { chmod: '+x' },
    });
  });

  test('--max-line-length=24', () => {
    expect(parser('--max-line-length=24')).toEqual({
      args: [],
      opts: { maxLineLength: 24 },
    });
  });

  test('commit -a -m="New commit msg"', () => {
    expect(parser('commit -a -m="New commit msg"')).toEqual({
      args: ['commit'],
      opts: { a: true, m: 'New commit msg' },
    });
  });
});
