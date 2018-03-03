'use strict';


let obj = {
  name: 'Gena',
  age: 12,
  [Symbol.for('secret')]: 'some secret information',
  [Symbol.for('notsecret')]: 'some not secret information',
  get getter() {
    return 12
  },
  set setter(value) {},
  get _debugOutputSecretField() {
    return this[Symbol.for('secret')]
  } 
}

Object.defineProperty(obj, 'name', {
  enumerable: false
})


//If an ordinary user wants to overwrite a secret field, 
//we can not throw error or forbid it, 
//since then he will understand that the field is occupied. 
//Instead, all calls to the secret field, after being recorded by the ordinary user, 
//will be redirected to a specially created field simulating a secret field, 
//and storing information that the user tried to write to the secret field

obj = {
  realObj: Object.assign(obj),
  simulateSecretField: undefined
}


obj = new Proxy(obj, {
  ownKeys: (target) => {
    console.log('ownKe')
    if (Symbol.for('secret') in target.realObj) {
      let properties = Reflect.ownKeys(target.realObj);
      let indexField = properties.indexOf(Symbol.for('field'));
      properties.splice(indexField - 1, 1);
      if (target.simulateSecretField) {
        properties = properties.concat(Symbol.for('secret'))
        console.log('GOOOOOOOOOOOOOOOOOOOOOOOOOOOD', properties)
      }
      return properties
    } else {    
      return Reflect.ownKeys(target)
    }
  },
  
  get: (target, property) => {
    console.log('GET CONNECT on property', property);
    if (property === Symbol.for('secret') && target.simulateSecretField) {
      return target.simulateSecretField;
    };
    if (property === Symbol.for('secret') && target.simulateSecretField === undefined) {
      return undefined;
    }
    return target.realObj[property];  
  },
  set: (target, property, value) => {
    if (property === Symbol.for('secret')) {
      return Reflect.set(target, 'simulateSecretField', value);
    } else {
      return Reflect.set(target.realObj, property, value);
    }
  },
  getOwnPropertyDescriptor: (target, property) => {
    console.log('getOwnPropertyDescriptor: ', property);
    if (property === Symbol.for('secret') && target.simulateSecretField) {
      return  Object.getOwnPropertyDescriptor(target, 'simulateSecretField');
    };
    if (property === Symbol.for('secret') && target.simulateSecretField === undefined) {
      return undefined;
    }
    return Object.getOwnPropertyDescriptor(target.realObj, property)  
  },



  enumerate: (target) => {
    console.log('ENUMERABLE CONECT');
    return target.keys[Symbol.iterator];
  }, 
  deleteProperty(target, property) {
    if (property !== Symbol.for('secret')) {
      delete target.realObj[property]
    } else if (property === Symbol.for('secret') && target.simulateSecretField) {
      target.simulateSecretField = undefined;
    }
    return true
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
 
  construct: (target) => {
    console.log('construct');
    return undefined
  }
});

console.log(obj);



// console.log(obj)
//console.log('otl', obj)
// console.log('KLYC:  ', Object.keys(obj))
// // console.log('START')
// console.log(Object.keys(obj))
// console.log(Object.getOwnPropertyNames(obj))


//console.log(Object.keys(obj))
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


console.dir(obj, {
  showHidden: true,
  depth: null
})

console.log(obj[Symbol.for('secret')]);
obj[Symbol.for('secret')] = 123;
console.log('start      --')
console.dir(obj, {
  showHidden: true,
  depth: null
})
console.log(obj[Symbol.for('secret')]);
console.log(obj.debugOutput)


console.log(Symbol.for('secret') in obj)

for (let i in obj) {
  console.log(i)
}
console.log(obj[Symbol.for('secret')]);
delete obj[Symbol.for('secret')];

console.log(obj[Symbol.for('secret')]);
console.log(obj._debugOutputSecretField);