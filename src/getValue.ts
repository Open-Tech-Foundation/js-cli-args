import { isNumber } from '@open-tech-world/es-utils';

function getValue(str: string): unknown {
  if (!str) {
    return true;
  }

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

export default getValue;
