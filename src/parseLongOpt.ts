import { camelCase } from '@open-tech-world/es-utils';
import getValue from './getValue';
import { ObjType } from './ObjType';

function parseLongOpt(str: string): ObjType {
  const obj: ObjType = {};
  const result = new RegExp(/^-{2}([a-zA-Z0-9-]{2,})(?:=(.*))?$/).exec(str);

  if (result) {
    const opt = camelCase(result[1]);
    const value = result[2];
    obj[opt] = getValue(value);
  }

  return obj;
}

export default parseLongOpt;
