'use strict';

var shell = require('shelljs');
var shellNodeCli = require('shelljs-nodecli');

shell.echo('=> test-node');
shellNodeCli.exec('tape', 'build/test/**/*.test.js');
