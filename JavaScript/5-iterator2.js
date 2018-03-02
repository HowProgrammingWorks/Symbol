'use strict';

Number.prototype[Symbol.iterator] = function(){
  let curNumberIter = 0;
  if (this > 0 && this === Math.floor(this)){
    return { 
      next: () => {
        return {
          value: curNumberIter, 
          done: curNumberIter++ === this + 1
        }
      }
    }
  } else if (this < 0 && this === Math.floor(this)) {
    return {
      next: () => {
        return {
          value: curNumberIter,
          done: curNumberIter-- === this - 1
        }
      }
    }
  } else if (this > 0 && this !== Math.floor(this)) {
    return {
      next: () => {
        return {
          value: curNumberIter > this ? this : curNumberIter,
          done: curNumberIter++ >= this + 1 
        }
      }
    }
  } else if (this < 0 && this !== Math.floor(this)) {
    return {
      next: () => {
        return {
          value: curNumberIter < this ? this : curNumberIter,
          done: curNumberIter-- <= this -1 
        }
      }
    }
  }
}

console.log('of 6:');
for ( let i of 6) {
  console.log(i)
}

console.log('of -10.4:')
for ( let i of -10.4) {
  console.log(i);
}