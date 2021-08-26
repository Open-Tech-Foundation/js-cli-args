import { setInObj } from '@open-tech-world/es-utils';
import getValue from './getValue';
import { ObjType } from './ObjType';

function parseLongObjOpt(str: string): ObjType {
  const obj: ObjType = {};
  const result = new RegExp(/^-{2}([a-zA-Z0-9.]{2,})(?:=(.*))?$/).exec(str);

  if (result) {
    setInObj(obj, result[1], getValue(result[2]));
  }

  return obj;
}

export default parseLongObjOpt;
