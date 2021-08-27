import { parser } from '../lib/index.esm.js';

describe('Parser', () => {
  test('1', () => {
    expect(parser('1')).toEqual({ args: [1], opts: {} });
  });

  test('1 2', () => {
    expect(parser('1 2')).toEqual({ args: [1, 2], opts: {} });
  });

  test('1 Two 3', () => {
    expect(parser('1 Two 3')).toEqual({ args: [1, 'Two', 3], opts: {} });
  });

  test('89.13 0xA', () => {
    expect(parser('89.13 0xA')).toEqual({ args: [89.13, 0xa], opts: {} });
  });

  test('-a', () => {
    expect(parser('-a')).toEqual({ args: [], opts: { a: true } });
  });

  test('-A', () => {
    expect(parser('-A')).toEqual({ args: [], opts: { A: true } });
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

  test('-n="5"', () => {
    expect(parser('-n="5"')).toEqual({ args: [], opts: { n: '5' } });
  });

  test('[-n="5"]', () => {
    expect(parser(['-n="5"'])).toEqual({ args: [], opts: { n: '5' } });
  });

  test('-n=23.09', () => {
    expect(parser('-n=23.09')).toEqual({ args: [], opts: { n: 23.09 } });
  });

  test('-n=-17', () => {
    expect(parser('-n=-17')).toEqual({ args: [], opts: { n: -17 } });
  });

  test('-x=0 -y=-25 -z=+180', () => {
    expect(parser('-x=0 -y=-25 -z=+180')).toEqual({
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

  test(`-a=a,b,c`, () => {
    expect(parser(`-a=a,b,c`)).toEqual({
      args: [],
      opts: { a: ['a', 'b', 'c'] },
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

  test('rm -rf .', () => {
    expect(parser('rm -rf .')).toEqual({
      args: ['rm', '.'],
      opts: { r: true, f: true },
    });
  });

  test('--user.name="Thanga Ganapathy"', () => {
    expect(parser('--user.name="Thanga Ganapathy"')).toEqual({
      args: [],
      opts: { user: { name: 'Thanga Ganapathy' } },
    });
  });

  test('--user.email=user@example.com', () => {
    expect(parser('--user.email=user@example.com')).toEqual({
      args: [],
      opts: { user: { email: 'user@example.com' } },
    });
  });

  test('--user.age=25', () => {
    expect(parser('--user.age=25')).toEqual({
      args: [],
      opts: { user: { age: 25 } },
    });
  });

  test('--core.editor="atom --wait"', () => {
    expect(parser('--core.editor="atom --wait"')).toEqual({
      args: [],
      opts: { core: { editor: 'atom --wait' } },
    });
  });

  test('--no-g', () => {
    expect(parser('--no-g')).toEqual({
      args: [],
      opts: { g: false },
    });
  });

  test('--no-A', () => {
    expect(parser('--no-A')).toEqual({
      args: [],
      opts: { A: false },
    });
  });

  test('--no-long-opt', () => {
    expect(parser('--no-long-opt')).toEqual({
      args: [],
      opts: { longOpt: false },
    });
  });

  test('git --no-pager', () => {
    expect(parser('git --no-pager')).toEqual({
      args: ['git'],
      opts: { pager: false },
    });
  });

  test('git merge --no-commit', () => {
    expect(parser('git merge --no-commit')).toEqual({
      args: ['git', 'merge'],
      opts: { commit: false },
    });
  });

  test('git add --refresh --no-refresh', () => {
    expect(parser('git add --refresh --no-refresh')).toEqual({
      args: ['git', 'add'],
      opts: { refresh: false },
    });
  });

  test('-x=1 -x=2', () => {
    expect(parser('-x=1 -x=2')).toEqual({
      args: [],
      opts: { x: [1, 2] },
    });
  });

  test('-x=1 -y=2 -z=3 -y=2.5 -y=44', () => {
    expect(parser('-x=1 -y=2 -z=3 -y=2.5 -y=44')).toEqual({
      args: [],
      opts: { x: 1, y: [2, 2.5, 44], z: 3 },
    });
  });

  test('-x=1,2', () => {
    expect(parser('-x=1,2')).toEqual({
      args: [],
      opts: { x: [1, 2] },
    });
  });

  test('-x=1,2 -x=3,4', () => {
    expect(parser('-x=1,2 -x=3,4')).toEqual({
      args: [],
      opts: { x: [1, 2, 3, 4] },
    });
  });

  test(`--numbers=1,"Two",3,'Four'`, () => {
    expect(parser(`--numbers=1,"Two",3,'Four'`)).toEqual({
      args: [],
      opts: { numbers: [1, 'Two', 3, 'Four'] },
    });
  });

  test(`[--numbers=1,"Two",3,'Four']`, () => {
    expect(parser([`--numbers=1,"Two",3,'Four'`])).toEqual({
      args: [],
      opts: { numbers: [1, 'Two', 3, 'Four'] },
    });
  });

  test('ssh 192.168.56.101', () => {
    expect(parser('ssh 192.168.56.101')).toEqual({
      args: ['ssh', '192.168.56.101'],
      opts: {},
    });
  });

  test('ssh test.server.com -p=3322', () => {
    expect(parser('ssh test.server.com -p=3322')).toEqual({
      args: ['ssh', 'test.server.com'],
      opts: { p: 3322 },
    });
  });

  test('vim /etc/ssh/sshd_config', () => {
    expect(parser('vim /etc/ssh/sshd_config')).toEqual({
      args: ['vim', '/etc/ssh/sshd_config'],
      opts: {},
    });
  });

  test('git config --global --alias.ci=commit', () => {
    expect(parser('git config --global --alias.ci=commit')).toEqual({
      args: ['git', 'config'],
      opts: { global: true, alias: { ci: 'commit' } },
    });
  });

  test('--user.name=user1 --user.email=user@example.com', () => {
    expect(parser('--user.name=user1 --user.email=user@example.com')).toEqual({
      args: [],
      opts: { user: { name: 'user1', email: 'user@example.com' } },
    });
  });

  test('git config --system user.email=user@example.com', () => {
    expect(parser('git config --system user.email=user@example.com')).toEqual({
      args: ['git', 'config', { user: { email: 'user@example.com' } }],
      opts: { system: true },
    });
  });

  test(`git config --system user.name="Thanga Ganapathy" user.email='user@example.com'`, () => {
    expect(
      parser(
        `git config --system user.name="Thanga Ganapathy" user.email='user@example.com'`
      )
    ).toEqual({
      args: [
        'git',
        'config',
        { user: { name: 'Thanga Ganapathy' } },
        { user: { email: 'user@example.com' } },
      ],
      opts: { system: true },
    });
  });

  test(`--action-msg="let's do it!"`, () => {
    expect(parser(`--action-msg="let's do it!"`)).toEqual({
      args: [],
      opts: { actionMsg: "let's do it!" },
    });
  });

  test(`--stage.file=a.txt --stage.file=b.txt --stage.file=c.txt`, () => {
    expect(
      parser('--stage.file=a.txt --stage.file=b.txt --stage.file=c.txt')
    ).toEqual({
      args: [],
      opts: { stage: { file: ['a.txt', 'b.txt', 'c.txt'] } },
    });
  });

  test(`--stage.file=a.txt --stage.file=b.txt --stage.exclude='c.txt'`, () => {
    expect(
      parser(`--stage.file=a.txt --stage.file=b.txt --stage.exclude='c.txt'`)
    ).toEqual({
      args: [],
      opts: { stage: { file: ['a.txt', 'b.txt'], exclude: 'c.txt' } },
    });
  });

  test(`cmd arg1 2 3.7 -a -bc -d=msg -g="Double quote" -h='single' -i=1,2,3 --no-f --long --long-num=1234567890 --long-msg="msg" --long-single='single' --long-arr=10,23,45 --obj.name --obj.prop='msg' --no-false-long pos-arg1 obj.a="apple"`, () => {
    expect(
      parser(
        `cmd arg1 2 3.7 -a -bc -d=msg -g="Double quote" -h='single' -i=1,2,3 --no-f --long --long-num=1234567890 --long-msg="msg" --long-single='single' --long-arr=10,23,45 --obj.name --obj.prop='msg' --no-false-long pos-arg1 obj.a="apple"`
      )
    ).toEqual({
      args: ['cmd', 'arg1', 2, 3.7, 'pos-arg1', { obj: { a: 'apple' } }],
      opts: {
        a: true,
        b: true,
        c: true,
        d: 'msg',
        f: false,
        g: 'Double quote',
        h: 'single',
        i: [1, 2, 3],
        long: true,
        longNum: 1234567890,
        longMsg: 'msg',
        longSingle: 'single',
        longArr: [10, 23, 45],
        obj: {
          name: true,
          prop: 'msg',
        },
        falseLong: false,
      },
    });
  });

  test('--color=0xFFFF', () => {
    expect(typeof parser('--color=0xFFFF').opts.color).toBe('number');
  });

  test('--color="0xFFFF"', () => {
    expect(typeof parser('--color="0xFFFF"').opts.color).toBe('string');
    expect(parser('--color="0xFFFF"').opts.color).toBe('0xFFFF');
  });
});

test('docker container create --name ubuntu01 ubuntu', () => {
  expect(parser('docker container create --name=ubuntu01 ubuntu')).toEqual({
    args: ['docker', 'container', 'create', 'ubuntu'],
    opts: { name: 'ubuntu01' },
  });
});
