'use strict';

require('./clean');
require('./lint');
require('./transpile');
require('./tape');
if (process.env.BROWSER_TEST) {
  require('./test-browser-ci');
}
