import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFullPath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const json1 = getFullPath('file1.json');
const json2 = getFullPath('file2.json');
const yaml1 = getFullPath('file1.yaml');
const yaml2 = getFullPath('file2.yml');

test('gendiff stylish', () => {
  const receivedJson = genDiff(json1, json2, 'stylish');
  const receivedYaml = genDiff(yaml1, yaml2, 'stylish');
  const receivedMix = genDiff(json1, yaml2, 'stylish');

  const expectedStylish = fs.readFileSync(getFullPath('expectedStylish.txt'), 'utf-8');

  expect(expectedStylish).toEqual(receivedJson);
  expect(expectedStylish).toEqual(receivedYaml);
  expect(expectedStylish).toEqual(receivedMix);
});

test('gendiff plain', () => {
  const receivedPlain = genDiff(json1, json2, 'plain');
  const expectedPlain = fs.readFileSync(getFullPath('expectedPlain.txt'), 'utf-8');

  expect(expectedPlain).toEqual(receivedPlain);
});

test('gendiff json', () => {
  const receivedJson = genDiff(json1, json2, 'json');
  const expectedJson = fs.readFileSync(getFullPath('expectedJson.txt'), 'utf-8');

  expect(expectedJson).toEqual(receivedJson);
});

test('unknow format exception', () => {
  const msg = 'Unknown file extension: .txt. The app only supports json and yaml formats.';
  expect(() => genDiff('file1.txt', 'file2.txt')).toThrow(msg);
});

test('unknow formatter exception', () => {
  const msg = 'Unknown formatter: such. Please, choose stylish, plain or json formatter.';
  expect(() => genDiff(json1, json2, 'such')).toThrow(msg);
});
