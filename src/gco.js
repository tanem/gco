import isPromise from 'is-promise';

const toPromise = (value) => {
  if (isPromise(value)) return value;
  if (Array.isArray(value)) return Promise.all(value);
  if (typeof value === 'object') return objectToPromise(value);
  return Promise.resolve(value);
};

const objectToPromise = (object) => {

  const map = new Map();

  for (const key of Object.keys(object)) {
    map.set(key, Promise.resolve(object[key]));
  }

  let resultObject = {};

  return Promise.all(map.values()).then((result) => {
    for (const key of map.keys()) {
      resultObject[key] = result.shift();
    }
    return resultObject;
  });

};

export default (generator) => {
  return new Promise((resolve) => {
    const iterator = generator();
    const next = ({ value, done }) => {
      if (done) return resolve(value);
      toPromise(value)
        .then((value) => next(iterator.next(value)))
        .catch((reason) => next(iterator.throw(reason)));
    };
    next(iterator.next());
  });
};
