'use strict';

// If an ordinary user wants to overwrite a secret field,
// we can not throw error or forbid it,
// since then he will understand that the field is occupied.
// Instead, all calls to the secret field, after being recorded by the ordinary user,
// will be redirected to a specially created field simulating a secret field,
// and storing information that the user tried to write to the secret field

function hideSymbol(obj, symbol) {
  obj = {
    realObj: Object.assign(obj),
    simulateSecretField: undefined
  };

  // As a result, the field obj.simulateSecretField in the object itself remained free
  // And the user can use it as a normal fieldw

  obj = new Proxy(obj, {
    ownKeys: (target) => {
      if (symbol in target.realObj) {
        let properties = Reflect.ownKeys(target.realObj);
        const indexField = properties.indexOf(symbol);
        properties.splice(indexField, 1);
        if (target.simulateSecretField) {
          properties = properties.concat(symbol);
        }
        return properties;
      } else {
        return Reflect.ownKeys(target);
      }
    },

    get: (target, property) => {
      if (property === symbol && target.simulateSecretField) {
        return target.simulateSecretField;
      }
      if (property === symbol && target.simulateSecretField === undefined) {
        return undefined;
      }
      return target.realObj[property];
    },

    set: (target, property, value) => {
      if (property === symbol) {
        return Reflect.set(target, 'simulateSecretField', value);
      } else {
        return Reflect.set(target.realObj, property, value);
      }
    },

    getOwnPropertyDescriptor: (target, property) => {
      if (property === symbol && target.simulateSecretField) {
        return  Object.getOwnPropertyDescriptor(target, 'simulateSecretField');
      }
      if (property === symbol && target.simulateSecretField === undefined) {
        return undefined;
      }
      return Reflect.getOwnPropertyDescriptor(target.realObj, property);
    },

    enumerate: (target) => {
      return target.keys[Symbol.iterator];
    },

    deleteProperty(target, property) {
      if (property !== symbol) {
        delete target.realObj[property];
      } else if (property === symbol && target.simulateSecretField) {
        target.simulateSecretField = undefined;
      }
      return true;
    },
  });
  return obj;
}

// Usage:

// we have added an opcional method _debugOutputSecretField,
// to check at the end of the work that the information in the secret field was left
// This is the only way to verify this information
// (This field should not be in a real project)

let obj = {
  name: 'Marcus Aurelius',
  born: 121,
  [Symbol.for('secret')]: 'some secret information',
  [Symbol.for('notsecret')]: 'some not secret information',
  get getter() {
    return 'GETTER';
  },
  set setter(value) {},
  get _debugOutputSecretField() {
    return this[Symbol.for('secret')];
  }
};

// We must completely hide the field obj[Symbol.for('secret')]

console.log('\n\nBEFORE PROXYING:\n\n');

console.log('\x1b[4mfor in:\x1b[0m');
for (const i in obj) {
  console.log(i);
}

console.log('\x1b[4mconsole.log("obj"):\x1b[0m');
console.log(obj);

console.log('\x1b[4mconsole.dir("obj"):\x1b[0m');
console.dir(obj, {
  showHidden: true,
  depth: null
});

console.log('\x1b[4mconsole.log(Object.getOwnPropertyNames):\x1b[0m');
console.log(Object.getOwnPropertyNames(obj));

console.log('\x1b[4mconsole.log(Object.getOwnPropertySymbols):\x1b[0m');
console.log(Object.getOwnPropertySymbols(obj));

console.log(
  '\x1b[4mconsole.log(Object.getOwnPropertyDescriptor(obj, Symbol.for("secret")))\x1b[0m'
);
console.log(Object.getOwnPropertyDescriptor(obj, Symbol.for('secret')));

console.log('\x1b[4mconsole.log(Object.keys(obj)):\x1b[0m');
console.log(Object.keys(obj));

console.log('\x1b[4mconsole.log(obj[Symbol.for("secret")]):\x1b[0m');
console.log(obj[Symbol.for('secret')]);

console.log('\x1b[4mconsole.log(Object.entries(obj)):\x1b[0m');
console.log(Object.entries(obj));


// proxying:
obj = hideSymbol(obj, Symbol.for('secret'));

console.log('\n\nAFTER PROXYING:\n\n');

console.log('\x1b[4mfor in:\x1b[0m');
for (const i in obj) {
  console.log(i);
}

console.log('\x1b[4mconsole.log("obj"):\x1b[0m');
console.log(obj);

console.log('\x1b[4mconsole.dir("obj"):\x1b[0m');
console.dir(obj, {
  showHidden: true,
  depth: null
});

console.log('\x1b[4mconsole.log(Object.getOwnPropertyNames):\x1b[0m');
console.log(Object.getOwnPropertyNames(obj));

console.log('\x1b[4mconsole.log(Object.getOwnPropertySymbols):\x1b[0m');
console.log(Object.getOwnPropertySymbols(obj));

console.log(
  '\x1b[4mconsole.log(Object.getOwnPropertyDescriptor(obj, Symbol.for("secret")))\x1b[0m'
);
console.log(Object.getOwnPropertyDescriptor(obj, Symbol.for('secret')));

console.log('\x1b[4mconsole.log(Object.keys(obj)):\x1b[0m');
console.log(Object.keys(obj));

console.log('\x1b[4mconsole.log(obj[Symbol.for("secret")])\x1b[0m');
console.log(obj[Symbol.for('secret')]);

console.log('\x1b[4mconsole.log(Object.entries(obj)):\x1b[0m');
console.log(Object.entries(obj));

// overwrite:

console.log('\n\nOVERWRITE SECRET FIELD:\n\n');

console.log('\x1b[4m[Symbol.for("secret")] = "overwrite value"\x1b[0m');
obj[Symbol.for('secret')] = 'overwrite value';

console.log('\x1b[4mconsole.log("obj"):\x1b[0m');
console.log(obj);

console.log('\x1b[4mconsole.log(Object.getOwnPropertySymbols):\x1b[0m');
console.log(Object.getOwnPropertySymbols(obj));

console.log('\x1b[4mconsole.log(obj[Symbol.for("secret")])\x1b[0m');
console.log(obj[Symbol.for('secret')]);

// in fact, in the secret field our line is still stored

console.log('\n\nREAL VALUE OF obj[Symbol.for("secret")]:\n\n');

console.log('\x1b[4mconsole.log(obj._debugOutputSecretField):\x1b[0m');
console.log(obj._debugOutputSecretField);
