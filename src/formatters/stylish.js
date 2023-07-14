import _ from 'lodash';

const flags = {
  default: '   ',
  add: ' + ',
  delete: ' - ',
};

const getStylishFormatDiff = (diff, replacer = ' ', spacesCount = 1) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = [];

    Object
      .entries(node)
      .forEach(([key, val]) => {
        if (val.flag === 'update') {
          lines.push(`${currentIndent}${flags.delete}${key}: ${iter(val.value[0], depth + 1)}`);
          lines.push(`${currentIndent}${flags.add}${key}: ${iter(val.value[1], depth + 1)}`);
        } else {
          lines.push(`${currentIndent}${flags[val.flag]}${key}: ${iter(val.value, depth + 1)}`);
        }
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};

export default getStylishFormatDiff;
