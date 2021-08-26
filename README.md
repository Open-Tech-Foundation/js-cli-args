# @open-tech-world/es-cli-args

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

```ts
parser('-x=1 -x=2'));
```

Output:

```json
{
  "args": [],
  "opts": { "x": [1, 2] }
}
```

Input:

```ts
parser('-y=1,2');
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

**Options:**

The Options or Flags are named parameters.

Denoted with either a hyphen and a single-letter name or a double hyphen and a multiple-letter name.

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

- The arguments types are auto infered.

- The commands & sub-commands are included in the `args` array property of the `output object`.

- The positional arguments are also included in the `args` array property of the `output object`.

- The options are converted into [camelCased](https://es-utils.netlify.app/docs/String/camelCase)

  Eg: `parser(--dry-run)` => `{ args: [], opts: { dryRun: true } }`

- The default value for a option is boolean `true`.

- A different value can be set for options using `=` character.

  Eg:
  
  String value: `git commit -m="New commit msg"`

  Number value: `ssh test.server.com -p=3322`, `tar --level=5`

- The Options can contain array values, use `,`(comma) character without space.

  Eg: `-x=1,2` => `{ args: [], opts: { x: [1, 2] } }`

- The short options can grouped.
  
  Eg: `tar -tvf archive.tar`

## References

[Command Line Interface Guidelines](https://clig.dev/)

## License

Copyright (c) 2021, [Thanga Ganapathy](https://thanga-ganapathy.github.io) ([MIT License](./LICENSE)).
