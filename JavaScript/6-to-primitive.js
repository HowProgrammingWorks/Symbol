'use strict';

console.log('"toPrimitive" in Symbol', 'toPrimitive' in Symbol);

let person = {
  name: 'Gena',
  age: 19
}

person[Symbol.toPrimitive] = function(hint) {
  console.log('need', hint);
  let primitives = {
    number: () => {
      return this.age
    },
    string: () => {
      return this.name
    },
    default: () => {
      return undefined;
    }
  }
  return primitives[hint]();
}

Object.defineProperty(person, Symbol.toPrimitive, {
  enumerable: false,
  configurable: false
})

console.log({ person });
console.log('person.toString():', JSON.stringify(person));
