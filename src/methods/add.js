'use strict';
const walkTo = require('./query/walk');
const ms = require('../lib/milliseconds');


const normalize = (str) => {
  str = str.toLowerCase();
  str = str.replace(/s$/, '');
  if (str === 'day') {
    return 'date';
  }
  return str;
};



const addMethods = (Space) => {

  const methods = {
    add: function(num, unit) {
      unit = normalize(unit);

      //we shift milliseconds for these ones..
      if (unit === 'week') {
        this.epoch += ms.day * (num * 7);
        return this;
      }
      if (unit === 'quarter') {
        this.epoch += ms.month * (num * 4);
        return this;
      }
      if (unit === 'season') {
        this.epoch += ms.month * (num * 4);
        return this;
      }

      let want = {
        year: this.year(),
        month: this.month(),
        date: this.date(),
        hour: this.hour(),
        minute: this.minute(),
      };
      want[unit] = this[unit]() + num;
      // console.log(want);
      walkTo(this, want);

      return this;
    },
    subtract: function(num, unit) {
      this.add(num * -1, unit);
      return this;
    },
  };

  //hook them into proto
  Object.keys(methods).forEach((k) => {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;
