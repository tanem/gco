'use strict';

require('./clean');
require('./lint');
require('./transpile');
require('./test-node');
if (process.env.BROWSER_TEST) {
  require('./test-browser-ci');
}
