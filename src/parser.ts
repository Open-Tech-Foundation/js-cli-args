import { isNumber } from '@open-tech-world/es-utils';

type ObjType = Record<string, unknown>;

function getValue(str: string): unknown {
  if (isNumber(str)) {
    return Number(str);
  }

  return str;
}

function parseShortOpts(str: string) {
  const obj: ObjType = {};
  const result = new RegExp(/^(?:-{1})([a-zA-Z]+)$/).exec(str);

  if (result) {
    const opts = result[1];

    for (let i = 0; i < opts.length; i++) {
      obj[opts[i]] = true;
    }
  }

  return obj;
}

function parseShortOptVal(str: string) {
  const obj: ObjType = {};
  const result = new RegExp(/^(?:-{1})([a-zA-Z]+)=(.*)$/).exec(str);

  if (result) {
    obj[result[1]] = getValue(result[2]);
  }

  return obj;
}

function isShortOpts(str: string): boolean {
  return RegExp(/^(?:-{1})(?:[a-zA-Z]+)$/).test(str);
}

function isShortOptVal(str: string): boolean {
  return RegExp(/^(?:-{1})(?:[a-zA-Z]+)=(?:.*)$/).test(str);
}

function parser(args: string | string[]): ObjType {
  const curArgs = typeof args === 'string' ? args.trim().split(' ') : args;
  const outObj: ObjType = { args: [], opts: {} };

  for (let i = 0; i < curArgs.length; i++) {
    const str = curArgs[i];

    if (isShortOpts(str)) {
      const shortOpts = parseShortOpts(str);
      outObj.opts = { ...(outObj.opts as ObjType), ...shortOpts };
      continue;
    }

    if (isShortOptVal(str)) {
      const shortOpts = parseShortOptVal(str);
      outObj.opts = { ...(outObj.opts as ObjType), ...shortOpts };
      continue;
    }
  }

  return outObj;
}

export default parser;
