'use strict';

var shell = require('shelljs');
var shellNodeCli = require('shelljs-nodecli');

shell.echo('=> test-browser-ci');
shellNodeCli.exec('zuul', '-- build/test/**/*.test.js');
