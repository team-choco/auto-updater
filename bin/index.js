#!/usr/bin/env node

const yargs = require('yargs');

const args = yargs.option('package', {
  type: 'string',
  description: 'The name of the package to check for updates.',
}).argv;

console.log(args);

const updater = require('../src');

updater.autoUpdate(args.package, args._.join(' '));
