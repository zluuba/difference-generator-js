import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/core.js';

let json1;
let json2;
let expected;

beforeEach(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  json1 = `${__dirname}/../__fixtures__/nested1.json`, 'utf-8';
  json2 = `${__dirname}/../__fixtures__/nested2.json`, 'utf-8';
  expected = fs.readFileSync(`${__dirname}/../__fixtures__/expectedNested.txt`, 'utf-8');
});

test("gendiff main", () => {
  const receivedJson = genDiff(json1, json2, 'stylish');

  expect(expected).toEqual(receivedJson);
});
