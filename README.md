# gco

**G**enerator based flow-**co**ntrol that supports promises.

[![build status](https://img.shields.io/travis/tanem/gco.svg?style=flat-square)](https://travis-ci.org/tanem/gco)
[![coverage status](https://img.shields.io/coveralls/tanem/gco.svg?style=flat-square)](https://coveralls.io/github/tanem/gco)
[![npm version](https://img.shields.io/npm/v/gco.svg?style=flat-square)](https://www.npmjs.com/package/gco)
[![npm downloads](https://img.shields.io/npm/dm/gco.svg?style=flat-square)](https://www.npmjs.com/package/gco)
[![dependency status](https://david-dm.org/tanem/gco.svg?style=flat-square)](https://david-dm.org/tanem/gco)
[![devDependency status](https://david-dm.org/tanem/gco/dev-status.svg?style=flat-square)](https://david-dm.org/tanem/gco#info=devDependencies)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/tanemorgangco.svg)](https://saucelabs.com/u/tanemorgangco)

## Motivation

Developed for a specific use-case, and for learning purposes. Heavily inspired by [co](https://github.com/tj/co), which I recommend using if you're after a more feature-rich and battle-tested solution :smiley:. You'll see co's influence in the documentation, API, and unit tests.

## Compatibility

[Babel](https://github.com/babel/babel) is used to transpile ES2015 to ES5. `gco` is tested against:

- The latest stable Node.js release
- The latest LTS Node.js release
- The browsers listed in the build matrix above.

## Installation

```
$ npm i gco
```

## Usage

```js
import gco from 'gco';

const onError = ({ stack }) => console.error(stack);

// Yield any promise.
gco(function* () {
  const result = yield Promise.resolve(true);
  console.log(result);
  // -> true
}).catch(onError);

// Yield an array to resolve multiple promises in parallel.
gco(function* () {
  const a = Promise.resolve(1);
  const b = Promise.resolve(2);
  const c = Promise.resolve(3);
  const result = yield [a, b, c];
  console.log(result);
  // -> [1, 2, 3]
}).catch(onError);

// Yield an object to resolve multiple promises in parallel.
gco(function* () {
  const res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res);
  // -> { 1: 1, 2: 2 }
}).catch(onError);

// Errors can be try/catched.
gco(function* () {
  try {
    yield Promise.reject(new Error('boom'));
  } catch (error) {
    console.error(error.message);
    // -> 'boom'
  }
}).catch(onError);
```

To run the above examples:

```
$ npm run example -s
```

## API

### gco(fn*).then(value =>)

Returns a promise that resolves a generator.

## Tests

```js
$ npm run test:local
```

## License

MIT
