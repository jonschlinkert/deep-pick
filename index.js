/*!
 * deep-pick <https://github.com/jonschlinkert/deep-pick>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var reduce = require('reduce-object');
var isObject = require('isobject');
var mixinDeep = require('mixin-deep');
var pick = require('object-pick');

module.exports = function flattenObject(obj, prop, options) {
  var value = pick(flatten(obj, prop), prop);
  if (options && options.value === true) {
    return value[prop];
  }
  return value;
};

function flatten(obj, prop) {
  return reduce(obj, function (acc, value, key) {
    if (key === prop) {
      acc[prop] = value;
    }

    if (isObject(value)) {
      if (value.hasOwnProperty(prop) && isObject(value[prop])) {
        mixinDeep(acc, value);
      }
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});
}