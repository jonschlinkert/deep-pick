/*!
 * flatten-object <https://github.com/jonschlinkert/flatten-object>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var flatten = require('./');

describe('.flatten()', function () {
  it('should recursively flatten and return the specified property.', function () {
    var o = flatten({locals: {aa: 'aa'}, b: {locals: {bb: 'bb'}}, c: {locals: {cc: 'cc'}}, j: 'k'}, 'locals');
    o.should.eql({ locals: { aa: 'aa', bb: 'bb', cc: 'cc' }, j: 'k' });
  });

  it('should work when the value-type is inconsistent:', function () {
    var a = flatten({locals: {aa: 'aa'}, b: {locals: 'foo'}, c: {locals: {cc: 'cc'}}, j: 'k'}, 'locals', {pick: true});
    a.should.eql({ locals: { aa: 'aa', cc: 'cc' } });

    var b = flatten({locals: 'bar', b: {locals: 'foo'}, c: {locals: {cc: 'cc'}}, j: 'k'}, 'locals', {pick: true});
    b.should.eql({ locals: { cc: 'cc' } });
  });
});

describe('when `value: true` is passed on the options:', function () {
  it('should return only the value:', function () {
    var o = flatten({locals: {aa: 'aa'}, b: {locals: {bb: 'bb'}}, c: {locals: {cc: 'cc'}}}, 'locals', {value: true});
    o.should.eql({ aa: 'aa', bb: 'bb', cc: 'cc' });
    o.should.eql({ aa: 'aa', bb: 'bb', cc: 'cc' });
  });
});

describe('when `pick: true` is passed on the options:', function () {
  it('should return only the specified property, and no other root-level properties:', function () {
    var o = flatten({locals: {aa: 'aa'}, b: {locals: {bb: 'bb'}}, c: {locals: {cc: 'cc'}}, j: 'k'}, 'locals', {pick: true});
    o.should.not.eql({ locals: { aa: 'aa', bb: 'bb', cc: 'cc' }, j: 'k' });
    o.should.eql({ locals: { aa: 'aa', bb: 'bb', cc: 'cc' } });
  });
});

describe('flatten examples:', function () {

  it('should flatten the specified property:', function () {
    var o = flatten({foo: {a: 'a'}, bar: {foo: {b: 'b'}}, baz: 'baz'}, 'foo');
    o.should.eql({foo: {a: 'a', b: 'b'}, baz: 'baz'});
  });

  it('should flatten the specified property:', function () {
    var o = flatten({foo: {a: 'a'}, bar: {foo: {b: 'b'}}, baz: 'baz'}, 'foo', {pick: true});
    o.should.eql({foo: {a: 'a', b: 'b'}});
  });

  it('should only return the value of specified property:', function () {
    var o = flatten({foo: {a: 'a'}, bar: {foo: {b: 'b'}}, baz: 'baz'}, 'foo', {value: true});
    o.should.eql({a: 'a', b: 'b'});
  });
});
