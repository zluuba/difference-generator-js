import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/core.js';

let json1;
let json2;
let yaml1;
let yaml2;

let expectedStylish;
let expectedPlain;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  json1 = `${__dirname}/../__fixtures__/file1.json`, 'utf-8';
  json2 = `${__dirname}/../__fixtures__/file2.json`, 'utf-8';
  yaml1 = `${__dirname}/../__fixtures__/file1.yaml`, 'utf-8';
  yaml2 = `${__dirname}/../__fixtures__/file2.yaml`, 'utf-8';

  expectedStylish = fs.readFileSync(`${__dirname}/../__fixtures__/expectedStylish.txt`, 'utf-8');
  expectedPlain = fs.readFileSync(`${__dirname}/../__fixtures__/expectedPlain.txt`, 'utf-8');
});

test("gendiff stylish", () => {
  const receivedJson = genDiff(json1, json2, 'stylish');
  const receivedYaml = genDiff(yaml1, yaml2, 'stylish');
  const receivedMix = genDiff(json1, yaml2, 'stylish');

  expect(expectedStylish).toEqual(receivedJson);
  expect(expectedStylish).toEqual(receivedYaml);
  expect(expectedStylish).toEqual(receivedMix);
});

test("gendiff plain", () => {
  const receivedPlain = genDiff(json1, json2, 'plain');

  expect(expectedPlain).toEqual(receivedPlain);
});
