#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/core.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .argument('file1', 'first file for comparison')
  .argument('file2', 'second file for comparison')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((file1, file2, options) => {
    console.log(genDiff(file1, file2, options.format));
  });

program.parse();
