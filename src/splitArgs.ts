function splitArgs(args: string): string[] {
  const out = [];
  let str = '';

  for (let i = 0; i < args.length; i++) {
    const char = args[i];

    if (char === '"' || char === "'") {
      const regExpResult = new RegExp(/("[^"]*")|('[^']*')/).exec(
        args.substring(i)
      );

      if (regExpResult) {
        const matchStr = regExpResult[0];
        str += matchStr.slice(1, -1);
        i = i + regExpResult[0].length;
        out.push(str);
        str = '';
        continue;
      }
    }

    if (char === ' ') {
      out.push(str);
      str = '';
      continue;
    }

    str += char;
  }

  if (str) {
    out.push(str);
  }

  return out;
}

export default splitArgs;
