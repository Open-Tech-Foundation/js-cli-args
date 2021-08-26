import { camelCase } from '@open-tech-world/es-utils';
import { ObjType } from './ObjType';

function parseNegOpt(str: string): ObjType {
  const obj: ObjType = {};
  const result = new RegExp(/^-{2}no-([a-zA-Z-]+)$/).exec(str);

  if (result) {
    const opt = result[1];
    const prop = opt.length === 1 ? opt : camelCase(opt);
    obj[prop] = false;
  }

  return obj;
}

export default parseNegOpt;
