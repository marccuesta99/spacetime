'use strict';
const test = require('tape');
const spacetime = require('../src');

test('add', (t) => {
  let s = spacetime('January 1, 2017 1:20:05', 'Canada/Eastern');
  //initial state
  t.equal(s.date(), 1, '.date()');
  t.equal(s.monthName(), 'january', '.month()');
  t.equal(s.year(), 2017, '.year()');
  t.equal(s.hour(), 1, '.hour()');
  t.equal(s.minute(), 20, '.minute()');
  t.equal(s.dayName(), 'sunday', '.day()');

  s.add(1, 'hour');
  t.equal(s.hour(), 2, 'movehour-.hour()');
  t.equal(s.minute(), 20, 'movehour-.minute()');
  t.equal(s.date(), 1, 'movehour-.date()');
  t.equal(s.month(), 0, 'movehour-.month()');
  t.equal(s.year(), 2017, 'movehour-.year()');

  s.add(1, 'month');
  t.equal(s.date(), 1, 'movemonth.date()');
  t.equal(s.monthName(), 'february', 'movemonth.month()');
  t.equal(s.year(), 2017, 'movemonth.year()');

  s.add(2, 'days');
  t.equal(s.date(), 3, 'moveday-.date()');
  t.equal(s.monthName(), 'february', 'moveday-.month()');
  t.equal(s.year(), 2017, 'moveday-.year()');
  t.equal(s.dayName(), 'friday', 'moveday-.day()');

  s.add(1, 'week');
  t.equal(s.date(), 10, 'moveweek-.date()');
  t.equal(s.monthName(), 'february', 'moveweek-.month()');
  t.equal(s.year(), 2017, 'moveweek-.year()');
  t.equal(s.dayName(), 'friday', 'moveweek-.day()');

  s.add(1, 'year');
  t.equal(s.date(), 10, 'moveyear.date()');
  t.equal(s.month(), 'february', 'moveyear.month()');
  t.equal(s.year(), 2018, 'moveyear.year()');

  s = spacetime('January 1, 2017 1:20:05', 'Canada/Eastern');
  s.add(1, 'quarter');
  t.equal(s.date(), 1, 'movequarter.date()');
  t.equal(s.monthName(), 'april', 'movequarter.date()');

  s.add(2, 'years');
  t.equal(s.date(), 1, 'moveyear-.date()');
  t.equal(s.monthName(), 'april', 'moveyear.month()');
  t.equal(s.year(), 2019, 'moveyear.years()');
  t.end();
});

test('subtract', (t) => {
  let s = spacetime('January 1, 2016 1:20:05', 'Canada/Eastern');
  //initial state
  t.equal(s.date(), 1, '.date()');
  t.equal(s.month(), 0, '.month()');
  t.equal(s.year(), 2016, '.year()');
  t.equal(s.hour(), 1, '.hour()');
  t.equal(s.minute(), 20, '.minute()');

  s.subtract(1, 'month');
  t.equal(s.date(), 1, '.date()');
  t.equal(s.month(), 11, '.month()');
  t.equal(s.year(), 2015, '.year()');

  s.subtract(2, 'days');
  t.equal(s.date(), 29, '.date()');
  t.equal(s.monthName(), 'november', '.month()');
  t.equal(s.year(), 2015, '.year()');
  t.equal(s.day(), 'sunday', '.day()');

  s.subtract(1, 'week');
  t.equal(s.date(), 22, '.date()');
  t.equal(s.month(), 'november', '.month()');
  t.equal(s.year(), 2015, '.year()');
  t.equal(s.day(), 'sunday', '.day()');

  s.subtract(1, 'year');
  t.equal(s.date(), 22, '.date()');
  t.equal(s.monthName(), 'november', '.month()');
  t.equal(s.year(), 2014, '.year()');

  t.end();
});

test('hour regression', (t) => {
  let s = spacetime('January 1, 2017 13:20:00', 'Canada/Pacific');
  t.equal(s.hour(), 13, '.hour()');
  t.equal(s.minute(), 20, '.minute()');

  s.add(1, 'hour');
  t.equal(s.hour(), 15, '.hour()');
  t.equal(s.minute(), 20, '.minute()');
  t.end();
});