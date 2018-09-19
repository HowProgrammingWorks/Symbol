'use strict';

console.log('iterator in Symbol:', 'iterator' in Symbol);

const generateNumbersObject = {
  start: 1,
  end: 10
};

generateNumbersObject[Symbol.iterator] = function() {
  let value = this.start;
  return {
    next: () => {
      return {
        value,
        done: value++ === this.end + 1
      };
    }
  };
};

Object.defineProperty(generateNumbersObject, Symbol.iterator, {
  enumerable: false,
  configurable: false
});

// Usage:

console.dir(generateNumbersObject);
console.log(Object.getOwnPropertySymbols(generateNumbersObject));

for (const number of generateNumbersObject) {
  console.log(number);
}

function useIterable(...iterableObject) {
  const sum = iterableObject.reduce((prev, cur) => {
    return prev + cur;
  });
  return sum;
}

const sum = useIterable(...generateNumbersObject);
console.log('sum:', sum);
