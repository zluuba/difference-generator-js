import _ from 'lodash';

const getDiffTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const diffTree = sortedKeys
    .map((key) => {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { key, flag: 'nested', value: getDiffTree(data1[key], data2[key]) };
      }
      if (_.has(data1, key) && _.has(data2, key)) {
        if (data1[key] === data2[key]) {
          return { key, flag: 'unchanged', value: data1[key] };
        }
        return { key, flag: 'update', value: [data1[key], data2[key]] };
      }
      if (_.has(data1, key)) {
        return { key, flag: 'delete', value: data1[key] };
      }
      return { key, flag: 'add', value: data2[key] };
    });

  return diffTree;
};

export default getDiffTree;
