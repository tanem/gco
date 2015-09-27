export default function (generator) {
  return new Promise((resolve) => {
    const iterator = generator();
    const next = ({ value, done }) => {
      if (done) return resolve(value);
      const promise = Array.isArray(value) ?
        Promise.all(value) :
        Promise.resolve(value);
      promise
        .then((value) => next(iterator.next(value)))
        .catch((reason) => next(iterator.throw(reason)));
    }
    next(iterator.next());
  });
};
