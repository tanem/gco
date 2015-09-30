import test from 'tape';
import gco from '..';

const getPromise = (val, err) => {
  return new Promise((resolve, reject) => {
    if (err) reject(err);
    else resolve(val);
  });
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

test('yielding a non-promise', (t) => {
  t.plan(1);
  gco(function* () {
    const actual = yield 1;
    t.equal(actual, 1);
  });
});

test('yielding a promise', (t) => {
  t.plan(1);
  gco(function* () {
    const actual = yield getPromise(1);
    const expected = 1;
    t.equal(actual, expected);
  });
});

test('yielding several promises', (t) => {
  t.plan(1);
  gco(function* () {
    const a = yield getPromise(1);
    const b = yield getPromise(2);
    const c = yield getPromise(3);
    const actual = [a, b, c];
    const expected = [1, 2, 3];
    t.deepEqual(actual, expected);
  });
});

test('throw and resume when a promise is rejected ', (t) => {
  t.plan(2);
  gco(function* () {
    try {
      yield getPromise(null, new Error('boom'));
    } catch (error) {
      t.equal(error.message, 'boom');
    }
    const ret = yield getPromise(1);
    t.equal(ret, 1);
  });
});

test('returning a value', (t) => {
  t.plan(1);
  gco(function* () {
    return 1;
  }).then((actual) => t.equal(actual, 1));
});

test('returning a resolved promise', (t) => {
  t.plan(1);
  gco(function* () {
    return Promise.resolve(1);
  }).then((actual) => t.equal(actual, 1));
});

test('returning a rejected promise', (t) => {
  t.plan(1);
  gco(function* () {
    return Promise.reject(1);
  }).catch((actual) => t.equal(actual, 1));
});

test('catching errors', (t) => {
  t.plan(1);
  gco(function* () {
    throw new Error('boom');
  }).then(() => {
    throw new Error('nope');
  }).catch((actual) => {
    t.equal(actual.message, 'boom');
  });
});

test('yielding an array', (t) => {
  t.plan(1);
  gco(function* () {
    const actual = yield [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3)
    ];
    t.deepEqual(actual, [1, 2, 3]);
  });
});

test('yielding an empty array', (t) => {
  t.plan(1);
  gco(function* () {
    const actual = yield [];
    t.deepEqual(actual, []);
  });
});

test('yielding an object', (t) => {
  t.plan(1);
  gco(function* () {

    const a = Promise.resolve(1);
    const b = Promise.resolve(2);
    const c = Promise.resolve(3);

    const actual = yield {
      a: a,
      b: b,
      c: c
    };

    t.deepEqual(actual, { a: 1, b: 2, c: 3 });

  });
});

test('yielding an empty object', (t) => {
  t.plan(1);
  gco(function* () {
    const actual = yield {};
    t.deepEqual(actual, {});
  });
});

test('preserving key order when yielding an object', (t) => {
  t.plan(1);
  gco(function* () {

    const before = {
      first: sleep(30),
      second: sleep(20),
      third: sleep(10)
    };

    const after = yield before;

    const actualKeys = Object.keys(after);
    const expectedKeys = Object.keys(before);

    t.deepEqual(actualKeys, expectedKeys);

  });
});
