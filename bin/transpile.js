'use strict';

var shell = require('shelljs');
var shellNodeCli = require('shelljs-nodecli');

shell.echo('=> transpile');
shellNodeCli.exec('babel', 'src/ -d build/src/');
shellNodeCli.exec('babel', 'index.es6 -d build/');
shellNodeCli.exec('babel', 'example/ -d build/example/');
shellNodeCli.exec('babel', 'test/ -d build/test/');
