#!/usr/bin/env node

const [node, script, ...args] = process.argv;

const updater = require('../src');

updater.autoUpdate('@team-choco/choco-bot', args.join(' '));
