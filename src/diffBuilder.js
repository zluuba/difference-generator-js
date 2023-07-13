import _ from "lodash";

const getDiffTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { [key]: getDiffTree(data1[key], data2[key]) };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] == data2[key])
        return { key: key, flag: 'noChanges', value: data1[key] };
      return { key: key, flag: 'update', oldValue: data1[key], newValue: data2[key] };
    }
    if (_.has(data1, key)) {
      return { key: key, flag: 'delete', oldValue: data1[key] };
    }
    return { key: key, flag: 'add', newValue: data2[key] };
  });
};

export default getDiffTree;
