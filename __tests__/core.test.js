import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/core.js';

let file1;
let file2;
let expected;

beforeEach(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  file1 = `${__dirname}/../__fixtures__/flat1.json`, 'utf-8';
  file2 = `${__dirname}/../__fixtures__/flat2.json`, 'utf-8';
  expected = fs.readFileSync(`${__dirname}/../__fixtures__/expectedFlat.txt`, 'utf-8');
});

test("gendiff main", () => {
  const received = genDiff(file1, file2, 'stylish');

  expect(expected).toEqual(received);
});
