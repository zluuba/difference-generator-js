import path from 'path';
import upload from './loader.js';
import getDiffTree from './diffBuilder.js';
import getFormatDiff from './formatter.js';

const currentDir = process.cwd();

const getFullPath = (filename) => path.resolve(currentDir, filename);

const genDiff = (file1, file2, formatter = 'stylish') => {
  const data1 = upload(getFullPath(file1));
  const data2 = upload(getFullPath(file2));

  const diffTree = getDiffTree(data1, data2);
  return getFormatDiff(diffTree, formatter);
};

export default genDiff;
