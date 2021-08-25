import { ObjType } from './ObjType';

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

export default parseShortOpts;
