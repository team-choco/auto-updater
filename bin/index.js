#!/usr/bin/env node

const yargs = require('yargs');

const args = yargs.option('package', {
  type: 'string',
  description: 'The name of the package to check for updates.',
}).option('interval', {
  type: 'number',
  description: 'The interval to check for package updates. (in ms)',
}).demandOption([
  'package',
]).argv;

const updater = require('../dist/auto-updater');

updater.autoUpdate({
  name: args.package,
  interval: args.interval,
  command: args._.join(' '),
});
