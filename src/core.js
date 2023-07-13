import getDiffTree from './diffBuilder.js';
import getFormatDiff from './formatter.js';
import upload from './loader.js';
import path from 'path';
import _ from 'lodash';

const currentDir = process.cwd();

const getFullPath = (filename) => path.resolve(currentDir, filename);

const genDiff = (file1, file2, formatter) => {
  const data1 = upload(getFullPath(file1));
  const data2 = upload(getFullPath(file2));

  const diff = getDiffTree(data1, data2);
  return getFormatDiff(diff, formatter);
};

export default genDiff;
