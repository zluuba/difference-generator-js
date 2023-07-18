import _ from 'lodash';

const flags = {
  nested: '   ',
  unchanged: '   ',
  add: ' + ',
  delete: ' - ',
};

const getStylishFormatDiff = (diff, replacer = ' ', spacesCount = 1, baseIndent = 3) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const newDepth = depth + spacesCount + baseIndent;

    const lines = !Array.isArray(node)
      ? Object
        .entries(node)
        .map(([key, value]) => `${currentIndent}${flags.nested}${key}: ${iter(value, newDepth)}`)

      : node
        .map((obj) => {
          if (obj.flag === 'update') {
            return (`${currentIndent}${flags.delete}${obj.key}: ${iter(obj.value.old, newDepth)}\n`
                    + `${currentIndent}${flags.add}${obj.key}: ${iter(obj.value.new, newDepth)}`);
          }
          return `${currentIndent}${flags[obj.flag]}${obj.key}: ${iter(obj.value, newDepth)}`;
        });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(diff, 1);
};

export default getStylishFormatDiff;
