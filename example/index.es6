import gco from '../src/gco';

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
