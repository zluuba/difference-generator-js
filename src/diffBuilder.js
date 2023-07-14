import _ from "lodash";

const getDiffTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const diffTree = {};

  for (const key of sortedKeys) {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      diffTree[key] = getDiffTree(data1[key], data2[key]);
    } else if (_.has(data1, key) && _.has(data2, key)) {
      diffTree[key] = data1[key] == data2[key] ? { flag: 'default', value: data1[key] } : { flag: 'update', value: [data1[key], data2[key]] }
    } else if (_.has(data1, key)) {
      diffTree[key] = { flag: 'delete', value: data1[key] };
    } else {
      diffTree[key] = { flag: 'add', value: data2[key] };
    }
  }

  return diffTree;
};

export default getDiffTree;
