import getValue from './getValue';
import { ObjType } from './ObjType';
import parseLongObjOpt from './parseLongObjOpt';
import parseLongOpt from './parseLongOpt';
import parseNegOpt from './parseNegOpt';
import parseShortOpts from './parseShortOpts';
import parseShortOptVal from './parseShortOptVal';
import setOptsVal from './setOptVal';
import splitArgs from './splitArgs';

interface IOutObj {
  args: unknown[];
  opts: ObjType;
}

function isShortOpts(str: string): boolean {
  return new RegExp(/^(?:-{1})(?:[a-zA-Z]+)$/).test(str);
}

function isShortOptVal(str: string): boolean {
  return new RegExp(/^(?:-{1})(?:[a-zA-Z]+)=(?:.*)$/).test(str);
}

function isLongOpt(str: string): boolean {
  return new RegExp(/^-{2}[a-zA-Z0-9-]{2,}(?:=.*)?$/).test(str);
}

function isNegationOpt(str: string): boolean {
  return new RegExp(/^-{2}no-(?:[a-zA-Z]+)$/).test(str);
}

function isLongObjOpt(str: string): boolean {
  return new RegExp(/^-{2}[a-zA-Z0-9.]{2,}(?:=.*)?$/).test(str);
}

function parser(args: string | string[]): IOutObj {
  const curArgs = typeof args === 'string' ? splitArgs(args.trim()) : args;
  const outObj: IOutObj = { args: [], opts: {} };

  for (let i = 0; i < curArgs.length; i++) {
    const str = curArgs[i];

    if (isShortOpts(str)) {
      const opts = parseShortOpts(str);
      setOptsVal(outObj.opts, opts);
      continue;
    }

    if (isShortOptVal(str)) {
      const opts = parseShortOptVal(str);
      setOptsVal(outObj.opts, opts);
      continue;
    }

    if (isNegationOpt(str)) {
      const opts = parseNegOpt(str);
      setOptsVal(outObj.opts, opts);
      continue;
    }

    if (isLongOpt(str)) {
      const opts = parseLongOpt(str);
      setOptsVal(outObj.opts, opts);
      continue;
    }

    if (isLongObjOpt(str)) {
      const opts = parseLongObjOpt(str);
      setOptsVal(outObj.opts, opts);
      continue;
    }

    outObj.args.push(getValue(str));
  }

  return outObj;
}

export default parser;
