import yaml from 'js-yaml';
import fs from 'fs';

const getFileExtension = (filename) => filename.split('.').pop();
const readFile = (file) => fs.readFileSync(file, 'utf-8');

const upload = (sourseFile) => {
  const fileExtension = getFileExtension(sourseFile);

  if (fileExtension === 'json') {
    return JSON.parse(readFile(sourseFile));
  }
  if (fileExtension === 'yaml' || fileExtension === 'yml') {
    return yaml.load(readFile(sourseFile));
  }

  throw new Error(
    'Unknown file extension. The app only supports json and yaml formats.'
  );
};

export default upload;
