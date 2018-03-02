'use strict';

console.log('iterator in Symbol:', 'iterator' in Symbol);

const generateNumbersObject = {
  start: 1,
  end: 10
}

generateNumbersObject[Symbol.iterator] = function() {
  let value = this.start;
  return {
    next: () => {
      return {
        value: value,
        done: value++ === this.end + 1
      }
    }
  }
}

Object.defineProperty(generateNumbersObject, Symbol.iterator, {
  enumerable: false,
  configurable: false
})

console.dir(generateNumbersObject);
console.log(Object.getOwnPropertySymbols(generateNumbersObject));

for (let number of generateNumbersObject) {
  console.log(number);
}

function useIterable(...iterableObject){
  let sum = iterableObject.reduce((prev, cur) => {
    return prev + cur;
  });
  return sum;
}

let sum = useIterable(...generateNumbersObject);
console.log('sum:', sum);