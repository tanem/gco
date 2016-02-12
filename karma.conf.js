/* eslint no-var: 0 */

var path = require('path');

module.exports = function (config) {

  var isLocal = process.env.TEST_ENV === 'local';

  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    'SL_Safari': {
      base: 'SauceLabs',
      browserName: 'safari'
    },
    'SL_Opera': {
      base: 'SauceLabs',
      browserName: 'opera'
    },
    'SL_IE': {
      base: 'SauceLabs',
      browserName: 'internet explorer'
    },
    'SL_iOS': {
      base: 'SauceLabs',
      browserName: 'iphone'
    },
    'SL_Android': {
      base: 'SauceLabs',
      browserName: 'android'
    }
  };

  var localConfig = {
    browsers: ['Chrome'],
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.' }
      ]
    },
    files: ['test/gco.test.js'],
    frameworks: ['tap'],
    preprocessors: {
      'test/gco.test.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots', 'coverage'],
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
          },
          {
            test: /\.js$/,
            include: path.resolve('src'),
            exclude: /test/,
            loader: 'isparta'
          }
        ]
      },
      node: {
        fs: 'empty'
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  };

  if (isLocal) {
    return config.set(localConfig);
  }

  config.set(Object.assign({}, localConfig, {
    browsers: Object.keys(customLaunchers),
    browserNoActivityTimeout: 300000,
    captureTimeout: 300000,
    customLaunchers: customLaunchers,
    reporters: ['dots', 'saucelabs', 'coverage', 'coveralls'],
    sauceLabs: {
      public: 'public',
      recordScreenshots: false
    }
  }));

};
