import _ from 'lodash';

const flags = {
  nested: '   ',
  unchanged: '   ',
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

    let lines;

    if (!Array.isArray(node)) {
      lines = Object
        .entries(node)
        .map(([key, value]) => `${currentIndent}${flags.nested}${key}: ${iter(value, depth + 4)}`);
    } else {
      lines = node
        .map((obj) => {
          if (obj.flag === 'update') {
            return (`${currentIndent}${flags.delete}${obj.key}: ${iter(obj.value.old, depth + 4)}\n`
                    + `${currentIndent}${flags.add}${obj.key}: ${iter(obj.value.new, depth + 4)}`);
          }
          return `${currentIndent}${flags[obj.flag]}${obj.key}: ${iter(obj.value, depth + 4)}`;
        });
    }

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(diff, 1);
};

export default getStylishFormatDiff;
