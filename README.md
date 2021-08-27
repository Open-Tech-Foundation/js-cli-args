<div align="center">

# @open-tech-world/es-cli-args

[![Build](https://github.com/open-tech-world/es-cli-args/actions/workflows/build.yml/badge.svg)](https://github.com/open-tech-world/es-cli-args/actions/workflows/build.yml) [![CodeFactor](https://www.codefactor.io/repository/github/open-tech-world/es-cli-args/badge)](https://www.codefactor.io/repository/github/open-tech-world/es-cli-args)

</div>

> A strict CLI arguments parser.

## Features

- Strict parsing ([See parser rules below](#parser-rules))

- Converts options to [camelCase](https://es-utils.netlify.app/docs/String/camelCase)

- Supports multiple option types (`Boolean`, `String`, `Number`, `Array`, `Object`)

## Installation

Using npm

```shell
npm install @open-tech-world/es-cli-args
```

Using Yarn

```shell
yarn add @open-tech-world/es-cli-args
```

## Usage

```ts
import { parser } from '@open-tech-world/es-cli-args';

parser(args: string | string[]): IOutObj;
```

## Examples

Input:

```ts
parser('-a');
```

Output:

```json
{ "args": [], "opts": { "a": true } }
```

Input:

```ts
parser('rm -rf a.txt');
```

Output:

```json
{
  "args": ["rm", "a.txt"],
  "opts": { "r": true, "f": true }
}
```

Input:

```ts
parser('npm publish --dry-run');
```

Output:

```json
{
  "args": ["npm", "publish"],
  "opts": { "dryRun": true }
}
```

Input:

```ts
parser('git commit -a -m="New commit msg"'));
```

Output:

```json
{
  "args": ["git", "commit"],
  "opts": { "a": true, "m": "New commit msg" }
}
```

Input:

```ts
parser('git merge --no-commit');
```

Output:

```json
{
  "args": ["git", "merge"],
  "opts": { "commit": false }
}
```

Input:

```shell
$ node example.js -x=1 -x=2
```

Output:

```json
{
  "args": [],
  "opts": { "x": [1, 2] }
}
```

Input:

```shell
$ node example.js -y=1,2
```

Output:

```json
{
  "args": [],
  "opts": { "y": [1, 2] }
}
```

Input:

```ts
parser('git config --system user.email=user@example.com');
```

Output:

```json
{
  "args": ["git", "config", { "user": { "email": "user@example.com" } }],
  "opts": { "system": true }
}
```

Input:

```ts
parser('git config --global --alias.ci=commit'));
```

Output:

```json
{
  "args": ["git", "config"],
  "opts": { "global": true, "alias": { "ci": "commit" } }
}
```

## Parser Rules

**Terminology:**

The arguments may contain `Commands`, `Positional arguments` and `Options`.

The `Options` can be classified into `Short options` and `Long options`.

**Commands:**

A command represents an action name. It can have sub-commands.

Eg: `git commit` `npm install`

In the above example `commit` & `install` are commands for the `git` & `npm` respectively.

**Positional arguments:**

The positional arguments are parameters to a command. The order is often important.

Eg: `cp SOURCE DEST`

In the above example, the `SOURCE` & `DEST` are positional arguments for `cp`

**Options:**

The Options or Flags are named parameters.

Denoted with either a hyphen `-` and a single-letter name or a double hyphen `--` and a multiple-letter name.

Eg:

Short option: `rm -r file.ext`

Long option: `rm --recursive file.ext`

**Input:**

The parser accepts both `String` and `Array of Strings` as input.

Eg:

`'rm -rf photo.jpg'`

`['tar', '-tvf', 'archive.tar']`

Or probably from `process.argv.slice(2)`.

**Parsing:**

- The arguments are separated by `space` character.

- There is no additional configuration to specify arguments type.

- The arguments types are auto inferred.

- The commands & sub-commands are included in the `args` array property of the `output object`.

- The positional arguments are also included in the `args` array property of the `output object`.

- The options are default converted into [camelCase](https://es-utils.netlify.app/docs/String/camelCase) and included in the `opts` object of `output object`.

  ```shell
  $ npm publish --dry-run
  ```

  ```json
  { "args": ["npm", "publish"], "opts": { "dryRun": true } }
  ```

- The default value for an option is boolean `true`.

- A value can be set for options using `=` character.

  ```shell
  $ git commit -a -m='New commit msg'
  ```

  ```json
  {
    "args": ["git", "commit"],
    "opts": { "a": true, "m": "New commit msg" }
  }
  ```

  ```shell
  $ ssh example.com -p=3322
  ```

  ```json
  {
    "args": ["ssh", "example.com"],
    "opts": { "p": 3322 }
  }
  ```

  ```shell
  $ tar -cf archive.tar foo bar --level=5
  ```

  ```json
  {
    "args": ["tar", "archive.tar", "foo", "bar"],
    "opts": { "c": true, "f": true, "level": 5 }
  }
  ```

- The Options can contain `Array` values, use the `,`(comma) character without space to create an array of values.

  ```shell
  $ node example.js -x=1,2
  ```

  ```json
  { "args": [], "opts": { "x": [1, 2] } }
  ```

- The short options can grouped.

  ```shell
  $ tar -tvf archive.tar
  ```

  ```json
  {
    "args": ["tar", "archive.tar"],
    "opts": { "t": true, "v": true, "f": true }
  }
  ```

- The grouped short options cannot be assigned a value.

  The following does not work

  ```shell
  $ git commit -am="Commit msg"
  ```

- `Boolean Negation`: The options can be boolean negated using `--no-` prefix.

  ```shell
  $ git commit --no-verify
  ```

  ```json
  { "args": ["git", "commit"], "opts": { "verify": false } }
  ```

- `Dot-Notation`: The value of long options that contain `.`(Dot) character are converted into object.

  ```shell
  $ node example.js --user.email=user@example.com
  ```

  ```json
  { "args": [], "opts": { "user": { "email": "user@example.com" } } }
  ```

- **Output**

  The parser returns an object containing all `Commands` & `Positional arguments` in an `args` array prop and all `short` & `long` options set in an object `opts` prop.

  ```json
  {
    "args": [...],
    "opts": {...}
  }
  ```

## Notes:

- There is no distinction while parsing `sub-commands`, all `commands` & `sub-commands` are included in the `args` prop of output object in the given order.

  ```ts
  parser('docker container create --name=ubuntu01 ubuntu');
  ```

  ```json
  {
    "args": ["docker", "container", "create", "ubuntu"],
    "opts": { "name": "ubuntu01" }
  }
  ```

- Due to auto-inference of types, the values might be mismatched.

  The following example shows the color value returning as type `number` converted from hex value.

  ```shell
  $ node example.js --color=0xFFFF
  ```

  ```json
  {
    "args": [],
    "opts": { "color": 65535 }
  }
  ```

  If you need the value as string, you can surround it with single or double quotes accordingly.

  ```shell
  $ node example.js --color='0xFFFF'
  ```

  ```json
  {
    "args": [],
    "opts": { "color": "0xFFFF" }
  }
  ```

- Currently `true` or `false` in the arguments will be parsed as string, Eg: `--foo=false` => `{ foo: 'false' }`

  The `auto-infer` boolean types feature can be implemented later based on the user requests.

## References

[Command Line Interface Guidelines](https://clig.dev/)

## License

Copyright (c) 2021, [Thanga Ganapathy](https://thanga-ganapathy.github.io) ([MIT License](./LICENSE)).
