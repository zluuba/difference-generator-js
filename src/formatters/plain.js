import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getEvent = (node, path) => {
  switch (node.flag) {
    case 'add':
      return `Property '${path}' was added with value: ${stringify(node.value)}`;
    case 'delete':
      return `Property '${path}' was removed`;
    case 'update':
      return `Property '${path}' was updated. From ${stringify(node.value.old)} to ${stringify(node.value.new)}`;
    default:
      return null;
  }
};

const getPlainFormatDiff = (diff) => {
  const inner = (node, path) => node
    .map((obj) => {
      const newPath = path ? `${path}.${obj.key}` : obj.key;

      if (obj.flag === 'nested') {
        return inner(obj.value, newPath);
      }
      return getEvent(obj, newPath);
    })
    .filter((line) => line)
    .join('\n');

  return inner(diff, '');
};

export default getPlainFormatDiff;
