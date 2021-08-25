import getValue from './getValue';
import { ObjType } from './ObjType';

function parseShortOptVal(str: string): ObjType {
  const obj: ObjType = {};
  const result = new RegExp(/^(?:-{1})([a-zA-Z]+)=(.*)$/).exec(str);

  if (result) {
    obj[result[1]] = getValue(result[2]);
  }

  return obj;
}

export default parseShortOptVal;
