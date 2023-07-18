import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const getFileExtension = (filename) => path.extname(filename);
const readFile = (file) => fs.readFileSync(file, 'utf-8');

const upload = (file) => {
  const fileExtension = getFileExtension(file);

  switch (fileExtension) {
    case '.json':
      return JSON.parse(readFile(file));
    case '.yaml':
    case '.yml':
      return yaml.load(readFile(file));
    default:
      throw new Error(
        `Unknown file extension: ${fileExtension}. The app only supports json and yaml formats.`,
      );
  }
};

export default upload;
