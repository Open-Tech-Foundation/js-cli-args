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
        str += regExpResult[0];
        i = i + regExpResult[0].length - 1;
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
