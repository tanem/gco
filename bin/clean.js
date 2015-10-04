'use strict';

var shell = require('shelljs');

shell.echo('=> clean');
shell.rm('-rf', 'build');
