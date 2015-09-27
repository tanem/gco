import gco from '..';

// Yield any promise.
gco(function* () {
  const result = yield Promise.resolve(true);
  console.log(result);
  // true
}).catch(onError);

// Resolve multiple promises in parallel.
gco(function* () {
  const a = Promise.resolve(1);
  const b = Promise.resolve(2);
  const c = Promise.resolve(3);
  const result = yield [a, b, c];
  console.log(result);
  // [1, 2, 3]
}).catch(onError);

// Errors can be try/catched.
gco(function* () {
  try {
    yield Promise.reject(new Error('boom'));
  } catch (error) {
    console.error(error.message);
    // 'boom'
  }
}).catch(onError);

function onError(error) {
  console.error(error.stack);
}