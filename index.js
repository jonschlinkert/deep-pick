/*!
 * flatten-object <https://github.com/jonschlinkert/flatten-object>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var reduce = require('reduce-object');
var isObject = require('isobject');
var mixinDeep = require('mixin-deep');
var pick = require('object-pick');


module.exports = function flattenObject(o, prop, options) {
  options = options || {};

  if (options.value === true) {
    return flatten(o, prop)[prop];
  }

  if (options.pick === true) {
    return pick(flatten(o, prop), prop);
  }

  return flatten(o, prop);
};


function flatten(o, prop) {
  return reduce(o, function (acc, value, key) {
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