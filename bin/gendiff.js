#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/core.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .argument('file1', 'first file for comparison')
  .argument('file2', 'second file for comparison')
  .option('-f, --format <type>', 'output format')
  .action((file1, file2, options) => {
    const formatter = options.format ? options.format : 'stylish';
    const diff = genDiff(file1, file2, formatter);
    console.log(diff);
  });

program.parse();
