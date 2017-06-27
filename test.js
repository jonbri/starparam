import test from 'tape';
import starparam from './index';

// #######
// parse
// #######
test('parse null/undefined args', function(assert) {
  assert.strictEqual(starparam.parse(null), undefined, 'null arg returns undefined');
  assert.strictEqual(starparam.parse(undefined), undefined, 'undefined arg returns undefined');
  assert.end();
});
test('parse blank url', function(assert) {
  var oObject = starparam.parse('');
  assert.strictEqual(oObject.prefix, undefined, 'no prefix');
  assert.strictEqual(oObject.params.length, 0, 'no params');
  assert.strictEqual(oObject.hash, undefined, 'no hash present');
  assert.end();
});
test('stringify null/undefined args', function(assert) {
  assert.strictEqual(starparam.stringify(null), undefined, 'null arg returns undefined');
  assert.strictEqual(starparam.stringify(undefined), undefined, 'undefined returns undefined');
  assert.end();
});
test('no params or hash', function(assert) {
  var sUrl ='http://test.com',
    oObject = starparam.parse(sUrl);
  assert.strictEqual(oObject.prefix, 'http://test.com', 'prefix is correct');
  assert.strictEqual(oObject.params.length, 0, 'param length is correct');
  assert.strictEqual(oObject.hash, undefined, 'no hash present');
  assert.strictEqual(starparam.stringify(oObject), sUrl, 'stringify is correct');
  assert.end();
});
test('1 param', function(assert) {
  var sUrl ='http://test.com?one=two',
    oObject = starparam.parse(sUrl);
  assert.strictEqual(oObject.prefix, 'http://test.com', 'prefix is correct');
  assert.strictEqual(oObject.params.length, 1, 'param length is correct');
  assert.strictEqual(oObject.params[0].name, 'one', 'first param name is correct');
  assert.strictEqual(oObject.params[0].value, 'two', 'first param value is correct');
  assert.strictEqual(oObject.hash, undefined, 'no hash');
  assert.strictEqual(starparam.stringify(oObject), sUrl, 'stringify is correct');
  assert.end();
});
test('1 param, hash', function(assert) {
  var sUrl ='http://test.com?one=two#hash',
    oObject = starparam.parse(sUrl);
  assert.strictEqual(oObject.prefix, 'http://test.com', 'prefix is correct');
  assert.strictEqual(oObject.params.length, 1, 'param length is correct');
  assert.strictEqual(oObject.params[0].name, 'one', 'first param name is correct');
  assert.strictEqual(oObject.params[0].value, 'two', 'first param value is correct');
  assert.strictEqual(oObject.hash, 'hash', 'hash is correct');
  assert.strictEqual(starparam.stringify(oObject), sUrl, 'stringify is correct');
  assert.end();
});
test('2 params, hash', function(assert) {
  var sUrl ='http://test.com?one=two&three=four#hash',
    oObject = starparam.parse(sUrl);
  assert.strictEqual(oObject.prefix, 'http://test.com', 'prefix is correct');
  assert.strictEqual(oObject.params.length, 2, 'param length is correct');
  assert.strictEqual(oObject.params[0].name, 'one', 'first param name is correct');
  assert.strictEqual(oObject.params[0].value, 'two', 'first param value is correct');
  assert.strictEqual(oObject.params[1].name, 'three', 'second param name is correct');
  assert.strictEqual(oObject.params[1].value, 'four', 'second param value is correct');
  assert.strictEqual(oObject.hash, 'hash', 'hash is correct');
  assert.strictEqual(starparam.stringify(oObject), sUrl, 'stringify is correct');
  assert.end();
});
test('just hash', function(assert) {
  var sUrl ='http://test.com#hash',
    oObject = starparam.parse(sUrl);
  assert.strictEqual(oObject.prefix, 'http://test.com', 'prefix is correct');
  assert.strictEqual(oObject.params.length, 0, 'param length is correct');
  assert.strictEqual(oObject.hash, 'hash', 'hash is correct');
  assert.strictEqual(starparam.stringify(oObject), sUrl, 'stringify is correct');
  assert.end();
});

// #######
// get
// #######
test('null/undefined first arg', function(assert) {
  assert.strictEqual(starparam.get(null, 'one'), undefined, 'null url returns undefined');
  assert.strictEqual(starparam.get(undefined, 'one'), undefined, 'undefined url returns undefined');
  assert.strictEqual(starparam.get('http://test.com', null), undefined, 'null param returns undefined');
  assert.strictEqual(starparam.get('http://test.com', undefined), undefined, 'undefined param returns undefined');
  assert.end();
});
test('match', function(assert) {
  assert.strictEqual(starparam.get('http://test.com?one=two', 'one'), 'two', 'basic match works');
  assert.end();
});
test('non-match', function(assert) {
  assert.strictEqual(starparam.get('http://test.com?one=two', 'nope'), undefined, 'non match returns undefined');
  assert.end();
});

// #######
// set
// #######
test('null/undefined args', function(assert) {
  assert.strictEqual(starparam.set(null, 'one', 'two'), undefined, 'null url returns undefined');
  assert.strictEqual(starparam.set(undefined, 'one', 'two'), undefined, 'undefined url returns undefined');
  assert.strictEqual(starparam.set('http://test.com', null, 'two'), undefined, 'null param name returns undefined');
  assert.strictEqual(starparam.set('http://test.com', undefined, 'two'), undefined, 'undefined param name returns undefined');
  assert.end();
});
test('null/undefined param value, no match', function(assert) {
  assert.strictEqual(starparam.set('http://test.com', 'one', null), 'http://test.com?one=', 'null param value works');
  assert.strictEqual(starparam.set('http://test.com', 'one', undefined), 'http://test.com?one=', 'undefined param value works');
  assert.end();
});
test('null/undefined param value, match', function(assert) {
  assert.strictEqual(starparam.set('http://test.com?one=two', 'one', null), 'http://test.com?one=', 'null param value replaces correctly');
  assert.strictEqual(starparam.set('http://test.com?one=two', 'one', undefined), 'http://test.com?one=', 'undefined param value replaces correctly');
  assert.end();
});
test('simple', function(assert) {
  assert.strictEqual(starparam.set('http://test.com', 'one', 'two'), 'http://test.com?one=two', 'basic set works');
  assert.end();
});
test('already params (1)', function(assert) {
  assert.strictEqual(starparam.set('http://test.com?foo=bar', 'one', 'two'), 'http://test.com?foo=bar&one=two', 'basic set with already-existing param works');
  assert.end();
});
test('already params (2)', function(assert) {
  assert.strictEqual(starparam.set('http://test.com?foo=bar&baz=boo', 'one', 'two'), 'http://test.com?foo=bar&baz=boo&one=two', 'basic set with already-existing params works');
  assert.end();
});
test('already exists', function(assert) {
  assert.strictEqual(starparam.set('http://test.com?one=foo', 'one', 'two'), 'http://test.com?one=two', 'basic replace works');
  assert.end();
});
test('already exists with multiple params (1)', function(assert) {
  assert.strictEqual(starparam.set('http://test.com?foo=bar&one=foo', 'one', 'two'), 'http://test.com?foo=bar&one=two', 'basic replace after already-existing param works');
  assert.end();
});
test('already exists with multiple params (2)', function(assert) {
  assert.strictEqual(starparam.set('http://test.com?one=foo&foo=bar', 'one', 'two'), 'http://test.com?one=two&foo=bar', 'basic replace before already-existing param works');
  assert.end();
});
test('already exists with multiple params (3)', function(assert) {
  assert.strictEqual(starparam.set('http://test.com?foo=bar&one=foo&baz=zoo', 'one', 'two'), 'http://test.com?foo=bar&one=two&baz=zoo', 'basic replace in-between already-existing params works');
  assert.end();
});
test('simple with hash', function(assert) {
  assert.strictEqual(starparam.set('http://test.com#hash', 'one', 'two'), 'http://test.com?one=two#hash', 'add param with hash works');
  assert.end();
});
test('already params with hash', function(assert) {
  assert.strictEqual(starparam.set('http://test.com?foo=bar#hash', 'one', 'two'), 'http://test.com?foo=bar&one=two#hash', 'add param with hash and already-existing params works ');
  assert.end();
});
test('already exists with multiple params with hash', function(assert) {
  assert.strictEqual(starparam.set('http://test.com?foo=bar&one=foo&baz=zoo#hash', 'one', 'two'), 'http://test.com?foo=bar&one=two&baz=zoo#hash', 'add param with hash and multiple already-existing params works');
  assert.end();
});

// #######
// remove
// #######
test('null/undefined args', function(assert) {
  assert.strictEqual(starparam.remove(null, 'one'), undefined, 'null url returns undefined');
  assert.strictEqual(starparam.remove(undefined, 'one'), undefined, 'undefined url returns undefined');
  assert.strictEqual(starparam.remove('http://test.com?one=two', null), 'http://test.com?one=two', 'null param returns url');
  assert.strictEqual(starparam.remove('http://test.com?one=two', undefined), 'http://test.com?one=two', 'undefined param returns url');
  assert.end();
});
test('only match arg present', function(assert) {
  assert.strictEqual(starparam.remove('http://test.com?one=two', 'one'), 'http://test.com', 'remove param works');
  assert.end();
});
test('other args present and after', function(assert) {
  assert.strictEqual(starparam.remove('http://test.com?one=two&three=four', 'one'), 'http://test.com?three=four', 'remove param with other param after works');
  assert.end();
});
test('other args present and before', function(assert) {
  assert.strictEqual(starparam.remove('http://test.com?three=four&one=two', 'one'), 'http://test.com?three=four', 'remove param with other param before works');
  assert.end();
});
test('only match arg present with hash', function(assert) {
  assert.strictEqual(starparam.remove('http://test.com?one=two#hash', 'one'), 'http://test.com#hash', 'remove param with hash works');
  assert.end();
});
test('other args present and before with hash', function(assert) {
  assert.strictEqual(starparam.remove('http://test.com?three=four&one=two#hash', 'one'), 'http://test.com?three=four#hash', 'remove param with other params present works');
  assert.end();
});
test('no match', function(assert) {
  assert.strictEqual(starparam.remove('http://test.com', 'one'), 'http://test.com', 'no match returns unmodified url');
  assert.end();
});
test('no match and other params present', function(assert) {
  assert.strictEqual(starparam.remove('http://test.com?foo=bar', 'one'), 'http://test.com?foo=bar', 'no match with other params returns unmodified url');
  assert.end();
});
