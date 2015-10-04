'use strict';

var shell = require('shelljs');
var shellNodeCli = require('shelljs-nodecli');

shell.echo('=> lint');
shellNodeCli.exec('eslint', 'index.es6 example/ src/ test/');
