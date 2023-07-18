import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/core.js';

let json1;
let json2;
let yaml1;
let yaml2;
let expectedFlat;

let jsonNested1;
let jsonNested2;
let expectedNested;

beforeEach(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  json1 = `${__dirname}/../__fixtures__/flat1.json`, 'utf-8';
  json2 = `${__dirname}/../__fixtures__/flat2.json`, 'utf-8';
  yaml1 = `${__dirname}/../__fixtures__/flat1.yaml`, 'utf-8';
  yaml2 = `${__dirname}/../__fixtures__/flat2.yaml`, 'utf-8';
  expectedFlat = fs.readFileSync(`${__dirname}/../__fixtures__/expectedFlat.txt`, 'utf-8');

  jsonNested1 = `${__dirname}/../__fixtures__/nested1.json`, 'utf-8';
  jsonNested2 = `${__dirname}/../__fixtures__/nested2.json`, 'utf-8';
  expectedNested = fs.readFileSync(`${__dirname}/../__fixtures__/expectedNested.txt`, 'utf-8');
});

test("gendiff flat", () => {
  const receivedJson = genDiff(json1, json2, 'stylish');
  const receivedYaml = genDiff(yaml1, yaml2, 'stylish');
  const receivedMix = genDiff(json1, yaml2, 'stylish');

  expect(expectedFlat).toEqual(receivedJson);
  expect(expectedFlat).toEqual(receivedYaml);
  expect(expectedFlat).toEqual(receivedMix);
});

test("gendiff nested", () => {
  const receivedJson = genDiff(jsonNested1, jsonNested2, 'stylish');

  expect(expectedNested).toEqual(receivedJson);
});
