'use strict';

var shell = require('shelljs');

require('./clean');
require('./lint');
require('./transpile');

shell.echo('=> example');
shell.exec('node build/example');
