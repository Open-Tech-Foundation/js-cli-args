import { camelCase, isNumber } from '@open-tech-world/es-utils';

type ObjType = Record<string, unknown>;

function getValue(str: string): unknown {
  if (isNumber(str)) {
    return Number(str);
  }

  if (new RegExp(/^["'][^"']*["']$/).test(str)) {
    const regExpRes = new RegExp(/^["']([^"']*)["']$/).exec(str);
    if (regExpRes) {
      return regExpRes[1];
    }
  }

  if (new RegExp(/^(?:.+),(?:.+)$/).test(str)) {
    const arr = [];
    const regExp = new RegExp(/([^,]+)/g);
    let match;
    while ((match = regExp.exec(str)) !== null) {
      arr.push(getValue(match[0]));
    }

    return arr;
  }

  return str;
}

function parseShortOpts(str: string): ObjType {
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

function parseShortOptVal(str: string): ObjType {
  const obj: ObjType = {};
  const result = new RegExp(/^(?:-{1})([a-zA-Z]+)=(.*)$/).exec(str);

  if (result) {
    obj[result[1]] = getValue(result[2]);
  }

  return obj;
}

function parseLongOpt(str: string): ObjType {
  const obj: ObjType = {};
  const result = new RegExp(/^-{2}([a-zA-Z0-9-]{2,})(?:=(.*))?$/).exec(str);

  if (result) {
    const opt = camelCase(result[1]);
    const value = result[2];
    obj[opt] = value ? getValue(value) : true;
  }

  return obj;
}

function parseNegationOpt(str: string): ObjType {
  const obj: ObjType = {};
  const result = new RegExp(/^-{2}no-([a-zA-Z]+)$/).exec(str);

  if (result) {
    obj[result[1]] = false;
  }

  return obj;
}

function isShortOpts(str: string): boolean {
  return new RegExp(/^(?:-{1})(?:[a-zA-Z]+)$/).test(str);
}

function isShortOptVal(str: string): boolean {
  return new RegExp(/^(?:-{1})(?:[a-zA-Z]+)=(?:.*)$/).test(str);
}

function splitStr(args: string): string[] {
  const out = [];
  let str = '';

  for (let i = 0; i < args.length; i++) {
    const char = args[i];

    if (char === '"' || char === "'") {
      const regExpResult = new RegExp(/["']([^"']*)["']/).exec(
        args.substring(i)
      );

      if (regExpResult) {
        str += regExpResult[0];
        i = i + regExpResult[0].length;
        continue;
      }
    }

    if (char === ' ') {
      out.push(str);
      str = '';
      continue;
    }

    str += char;
  }

  out.push(str);

  return out;
}

function isLongOpt(str: string): boolean {
  return new RegExp(/^-{2}[a-zA-Z0-9-]{2,}(?:=.*)?$/).test(str);
}

function isNegationOpt(str: string): boolean {
  return new RegExp(/^-{2}no-(?:[a-zA-Z]+)$/).test(str);
}

interface IOutObj {
  args: unknown[];
  opts: ObjType;
}

function setOptsValue(optsObj: ObjType, newOptions: ObjType): void {
  for (const [key, value] of Object.entries(newOptions)) {
    if (key in optsObj) {
      if (typeof value === 'boolean') {
        optsObj[key] = value;
      }

      if (typeof value === 'number') {
        if (Array.isArray(optsObj[key])) {
          (optsObj[key] as number[]).push(value);
        } else {
          optsObj[key] = [optsObj[key], value];
        }
      }

      if (typeof value === 'string') {
        if (Array.isArray(optsObj[key])) {
          (optsObj[key] as string[]).push(value);
        } else {
          optsObj[key] = [optsObj[key], value];
        }
      }

      if (Array.isArray(value)) {
        (optsObj[key] as unknown[]).push(...value);
      }
    } else {
      optsObj[key] = value;
    }
  }
}

function parser(args: string | string[]): IOutObj {
  const curArgs = typeof args === 'string' ? splitStr(args.trim()) : args;
  const outObj: IOutObj = { args: [], opts: {} };

  for (let i = 0; i < curArgs.length; i++) {
    const str = curArgs[i];

    if (isShortOpts(str)) {
      const opts = parseShortOpts(str);
      setOptsValue(outObj.opts, opts);
      continue;
    }

    if (isShortOptVal(str)) {
      const opts = parseShortOptVal(str);
      setOptsValue(outObj.opts, opts);
      continue;
    }

    if (isNegationOpt(str)) {
      const opts = parseNegationOpt(str);
      setOptsValue(outObj.opts, opts);
      continue;
    }

    if (isLongOpt(str)) {
      const opts = parseLongOpt(str);
      setOptsValue(outObj.opts, opts);
      continue;
    }

    outObj.args.push(getValue(str));
  }

  return outObj;
}

export default parser;
