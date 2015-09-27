# gco

[![Build Status](https://travis-ci.org/tanem/gco.png?branch=master)](https://travis-ci.org/tanem/gco)
[![Dependency Status](https://david-dm.org/tanem/gco.svg)](https://david-dm.org/tanem/gco)
[![devDependency Status](https://david-dm.org/tanem/gco/dev-status.svg)](https://david-dm.org/tanem/gco#info=devDependencies)

Generator based flow-control that supports promises.

## Motivation

Developed for a specific use-case, and for learning purposes. Heavily inspired by [co](https://github.com/tj/co), which I recommend using if you're after a more feature-rich and battle-tested solution :smiley:. You'll see co's influence in the documentation, API, and unit tests.

## Compatibility

- For node <0.11.0 and for many older browsers, you should include your own promise polyfill.
- When using node >=0.11.0 <=0.12.7, you must use the `--harmony-generators` flag or just `--harmony` to get access to generators.
- When using node <0.11.0, or browsers without generator support, you must use [gnode](https://github.com/TooTallNate/gnode) and/or [regenerator](https://github.com/facebook/regenerator).
- Node >=4.0.0 and io.js are supported out of the box, you can use `gco` without flags or polyfills.

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

// Resolve multiple promises in parallel.
gco(function* () {
  const a = Promise.resolve(1);
  const b = Promise.resolve(2);
  const c = Promise.resolve(3);
  const result = yield [a, b, c];
  console.log(result);
  // -> [1, 2, 3]
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
$ npm test -s
```

## License

MIT
