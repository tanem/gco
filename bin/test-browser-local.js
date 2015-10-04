'use strict';

var shell = require('shelljs');
var shellNodeCli = require('shelljs-nodecli');

shell.echo('=> test-browser-local');
shellNodeCli.exec('zuul', '--local -- build/test/**/*.test.js');
