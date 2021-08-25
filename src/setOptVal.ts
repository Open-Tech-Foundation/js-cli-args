import { ObjType } from './ObjType';

function setOptsVal(optsObj: ObjType, newOptions: ObjType): void {
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

export default setOptsVal;
