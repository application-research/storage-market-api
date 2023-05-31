const hasOwn = {}.hasOwnProperty;

function print({ address, copy }) {
  console.log(`\x1b[1m\x1b[37m\[${address}\]\x1b[0m : ${copy}`);
}

export const runQuery = async ({ queryFn, errorFn, label }) => {
  let response;
  try {
    response = await queryFn();
  } catch (e) {
    response = errorFn(e);
  }

  print({ address: `database-query`, copy: label });
  return response;
};

export const toDateISOString = (data: string): string => {
  const date = new Date(data);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
};

export function bytesToTerabytes(bytes) {
  const terabytes = bytes / 1024 ** 4;
  return terabytes.toFixed(2);
}

export const bytesToSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${sizes[i]}`;
};

export const isEmpty = (text: any): boolean => {
  // NOTE(jim): If a number gets passed in, it isn't considered empty for zero.
  if (text === 0) {
    return false;
  }

  if (!text) {
    return true;
  }

  if (typeof text === 'object') {
    return true;
  }

  if (text.length === 0) {
    return true;
  }

  text = text.toString();

  return Boolean(!text.trim());
};

export function classNames(...args: any[]): string {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}
