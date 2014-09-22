/*!
 * deep-pick <https://github.com/jonschlinkert/deep-pick>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var deepPick = require('./');

describe('.deepPick()', function () {
  it('should recursively flatten and return only the specified property.', function () {
    var o = deepPick({locals: {aa: 'aa'}, b: {locals: {bb: 'bb'}}, c: {locals: {cc: 'cc'}}, j: 'k'}, 'locals');
    o.should.eql({ locals: { aa: 'aa', bb: 'bb', cc: 'cc' } });
  });

  it('should return the property when the value-type is inconsistent:', function () {
    var a = deepPick({locals: {aa: 'aa'}, b: {locals: 'foo'}, c: {locals: {cc: 'cc'}}, j: 'k'}, 'locals');
    a.should.eql({locals: { aa: 'aa', cc: 'cc' }});

    var b = deepPick({locals: 'bar', b: {locals: 'foo'}, c: {locals: {cc: 'cc'}}, j: 'k'}, 'locals');
    b.should.eql({locals: { cc: 'cc' }});
  });
});

describe('when `value: true` is passed on the options:', function () {
  it('should return only the value:', function () {
    var o = deepPick({locals: {aa: 'aa'}, b: {locals: {bb: 'bb'}}, c: {locals: {cc: 'cc'}}}, 'locals', {value: true});
    o.should.eql({ aa: 'aa', bb: 'bb', cc: 'cc' });
    o.should.eql({ aa: 'aa', bb: 'bb', cc: 'cc' });
  });

  it('should return the value when the value-type is inconsistent:', function () {
    var a = deepPick({locals: {aa: 'aa'}, b: {locals: 'foo'}, c: {locals: {cc: 'cc'}}, j: 'k'}, 'locals', {value: true});
    a.should.eql({ aa: 'aa', cc: 'cc' });

    var b = deepPick({locals: 'bar', b: {locals: 'foo'}, c: {locals: {cc: 'cc'}}, j: 'k'}, 'locals', {value: true});
    b.should.eql({ cc: 'cc' });
  });
});

describe('.deepPick() examples:', function () {

  it('should pick the specified property:', function () {
    var o = deepPick({foo: {a: 'a'}, bar: {foo: {b: 'b'}}, baz: 'baz'}, 'foo');
    o.should.eql({foo: {a: 'a', b: 'b'}});
  });

  it('should pick the value for the specified property:', function () {
    var o = deepPick({foo: {a: 'a'}, bar: {foo: {b: 'b'}}, baz: 'baz'}, 'foo', {value: true});
    o.should.eql({a: 'a', b: 'b'});
  });
});
