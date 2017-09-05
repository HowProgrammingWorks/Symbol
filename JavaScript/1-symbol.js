'use strict';

const symbol1 = Symbol();
const symbol2 = Symbol();

console.dir(symbol1);
console.log(JSON.stringify(symbol1));

const eq = symbol1 === symbol2;
console.log('symbol1 === symbol2 : ' + eq);

if (Symbol('name') !== Symbol('name')) {
  console.log('Symbols with identical description are not equal');
}
