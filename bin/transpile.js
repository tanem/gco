'use strict';

var shell = require('shelljs');
var shellNodeCli = require('shelljs-nodecli');

shell.echo('=> transpile');
shellNodeCli.exec('babel', '--optional runtime src/ -d build/src/');
shellNodeCli.exec('babel', 'index.es6 -d build/');
shellNodeCli.exec('babel', '--optional runtime example/ -d build/example/');
shellNodeCli.exec('babel', '--optional runtime test/ -d build/test/');
