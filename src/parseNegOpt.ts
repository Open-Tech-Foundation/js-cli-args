import { ObjType } from './ObjType';

function parseNegOpt(str: string): ObjType {
  const obj: ObjType = {};
  const result = new RegExp(/^-{2}no-([a-zA-Z]+)$/).exec(str);

  if (result) {
    obj[result[1]] = false;
  }

  return obj;
}

export default parseNegOpt;
