'use strict';

var shell = require('shelljs');
var shellNodeCli = require('shelljs-nodecli');

shell.echo('=> tape');
shellNodeCli.exec('tape', 'build/test/**/*.test.js');
