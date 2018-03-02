'use strict';

let util = require('util');

let obj = {
  name: 'Gena',
  age: 12,
   [Symbol.for('secret')]: 'some secret information',
  // rang: 11,
  // [Symbol.for('simple')]: 'simple information',
  
}


obj = new Proxy(obj, {
   ownKeys: (trap) => {
       console.log('ownKeys Conect')
    // //   console.log(trap)
    
  //   // if (Symbol.for('secret') in trap) {
    //   //   let propNames = Object.getOwnPropertyNames(trap);
  //   //   let symbNames = Object.getOwnPropertySymbols(trap);
  //   //   let indexField = symbNames.indexOf(Symbol.for('field'));
  //   //   symbNames.splice(indexField - 1, 1);
  //   //   let res = propNames.concat(symbNames);
  //   //   console.log('@@ОТДАСТ::', res);
  //   //   return res
  //   // } else {
    //     //  console.log('@@ОТДАСТ::',Object.keys(trap))
    
          return Reflect.ownKeys(trap)
    //  }
  },
  
  getOwnPropertyDescriptor: (trap, prop) => {
    console.log('getOwnPropertyDescriptor');
    if (prop = Symbol.for('secret')) {
      return undefined;
    }
    return {enumerable: true, writable: true, configurable: true, value: 1}
    
  },
  enumerate: (targ) => {
    console.log('ENUMERABLE CONECT')
    return ['name'][Symbol.iterator];
  }, 
  get: (targer, property) => {
    console.log('GET CONECT');
    console.log('GET __ PROP:', property)
    console.log(targer[property])
    return 123
  },
  getPrototypeOf: (target) => {
    console.log('getPrototypeOf');
    return {}
  },
  setPrototypeOf: (ch, p) => {
    console.log('setPrototypeOf')
    return false
  },
  isExtensible: (target) => {
    console.log('isExtensible');
    return false
  },
  preventExtensions: (target) => {
    console.log('preventExtensions');
    return false;
  },
  defineProperty: (target, key, d) => {
    console.log('defineProperty');
    return true
  },
  has: (target, key) => {
    console.log('has');
    return false
  },
  construct: (target) => {
    console.log('construct');
    return undefined
  }
});

// console.log(obj)
//console.log('otl', obj)
// console.log('KLYC:  ', Object.keys(obj))
// // console.log('START')
// console.log(Object.keys(obj))
console.log(Object.getOwnPropertyNames(obj))



// getPrototypeOf – перехватывает обращение к методу getPrototypeOf.
// setPrototypeOf – перехватывает обращение к методу setPrototypeOf.
// isExtensible – перехватывает обращение к методу isExtensible.
// preventExtensions – перехватывает обращение к методу preventExtensions.
// getOwnPropertyDescriptor – перехватывает обращение к методу getOwnPropertyDescriptor.
// defineProperty – перехватывает обращение к методу defineProperty.
// has – перехватывает проверку существования свойства, которая используется в операторе in и в некоторых других методах встроенных объектов.
// get – перехватывает чтение свойства.
// set – перехватывает запись свойства.
// deleteProperty – перехватывает удаление свойства оператором delete.
// enumerate – срабатывает при вызове for..in или for..of, возвращает итератор для свойств объекта.
// ownKeys – перехватывает обращения к методу getOwnPropertyNames.
// apply – перехватывает вызовы target().
// construct – перехватывает вызовы new target().
