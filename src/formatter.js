import getStylishFormatDiff from './formatters/stylish.js';
import getPlainFormatDiff from './formatters/plain.js';
import getJsonFormatDiff from './formatters/json.js';

const getFormatDiff = (diff, formatter) => {
  switch (formatter) {
    case 'stylish':
      return getStylishFormatDiff(diff);
    case 'plain':
      return getPlainFormatDiff(diff);
    case 'json':
      return getJsonFormatDiff(diff);
    default:
      throw new Error(
        `Unknown formatter: ${formatter}. Please, choose stylish, plain or json formatter.`,
      );
  }
};

export default getFormatDiff;
