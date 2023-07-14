import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/core.js';

let json1;
let json2;
let yaml1;
let yaml2;
let expected;

beforeEach(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  json1 = `${__dirname}/../__fixtures__/flat1.json`, 'utf-8';
  json2 = `${__dirname}/../__fixtures__/flat2.json`, 'utf-8';
  yaml1 = `${__dirname}/../__fixtures__/flat1.yaml`, 'utf-8';
  yaml2 = `${__dirname}/../__fixtures__/flat2.yaml`, 'utf-8';

  expected = fs.readFileSync(`${__dirname}/../__fixtures__/expectedFlat.txt`, 'utf-8');
});

test("gendiff main", () => {
  const receivedJson = genDiff(json1, json2, 'stylish');
  const receivedYaml = genDiff(yaml1, yaml2, 'stylish');
  const receivedMix = genDiff(json1, yaml2, 'stylish');

  expect(expected).toEqual(receivedJson);
  expect(expected).toEqual(receivedYaml);
  expect(expected).toEqual(receivedMix);
});
