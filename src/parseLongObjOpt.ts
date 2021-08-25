import getValue from './getValue';
import { ObjType } from './ObjType';

function parseLongObjOpt(str: string): ObjType {
  const obj: ObjType = {};
  const result = new RegExp(/^-{2}([a-zA-Z0-9.]{2,})(?:=(.*))?$/).exec(str);

  if (result) {
    const props = result[1].split('.');
    const value = getValue(result[2]);
    let tempPath: ObjType = obj;
    props.forEach((item, index) => {
      if (index === props.length - 1) {
        tempPath[item] = value;
        return;
      }

      if (!tempPath[item]) {
        tempPath[item] = {};
      }

      tempPath = tempPath[item] as ObjType;
    });
  }

  return obj;
}

export default parseLongObjOpt;
