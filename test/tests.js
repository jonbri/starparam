QUnit.config.reorder = false;

//////////////////////////////////
// tests
window.starparam_runTests = function() {

  // #######
  // parse
  // #######
  QUnit.module('"parse/stringify"', {
  });

  QUnit.test('parse null/undefined args', function(assert) {
    assert.strictEqual(starparam.parse(null), undefined, 'null arg returns undefined');
    assert.strictEqual(starparam.parse(undefined), undefined, 'undefined arg returns undefined');
  });

  QUnit.test('stringify null/undefined args', function(assert) {
    assert.strictEqual(starparam.stringify(null), undefined, 'null arg returns undefined');
    assert.strictEqual(starparam.stringify(undefined), undefined, 'undefined returns undefined');
  });

  QUnit.test('no params or hash', function(assert) {
    var sUrl ='http://test.com';
    var oObject = starparam.parse(sUrl);
    assert.strictEqual(oObject.prefix, 'http://test.com', 'prefix is correct');
    assert.strictEqual(oObject.params.length, 0, 'param length is correct');
    assert.strictEqual(oObject.hash, undefined, 'no hash present');
    assert.strictEqual(starparam.stringify(oObject), sUrl, 'stringify is correct');
  });

  QUnit.test('1 param', function(assert) {
    var sUrl ='http://test.com?one=two';
    var oObject = starparam.parse(sUrl);
    assert.strictEqual(oObject.prefix, 'http://test.com', 'prefix is correct');
    assert.strictEqual(oObject.params.length, 1, 'param length is correct');
    assert.strictEqual(oObject.params[0].name, 'one', 'first param name is correct');
    assert.strictEqual(oObject.params[0].value, 'two', 'first param value is correct');
    assert.strictEqual(oObject.hash, undefined, 'no hash');
    assert.strictEqual(starparam.stringify(oObject), sUrl, 'stringify is correct');
  });

  QUnit.test('1 param, hash', function(assert) {
    var sUrl ='http://test.com?one=two#hash';
    var oObject = starparam.parse(sUrl);
    assert.strictEqual(oObject.prefix, 'http://test.com', 'prefix is correct');
    assert.strictEqual(oObject.params.length, 1, 'param length is correct');
    assert.strictEqual(oObject.params[0].name, 'one', 'first param name is correct');
    assert.strictEqual(oObject.params[0].value, 'two', 'first param value is correct');
    assert.strictEqual(oObject.hash, 'hash', 'hash is correct');
    assert.strictEqual(starparam.stringify(oObject), sUrl, 'stringify is correct');
  });

  QUnit.test('2 params, hash', function(assert) {
    var sUrl ='http://test.com?one=two&three=four#hash';
    var oObject = starparam.parse(sUrl);
    assert.strictEqual(oObject.prefix, 'http://test.com', 'prefix is correct');
    assert.strictEqual(oObject.params.length, 2, 'param length is correct');
    assert.strictEqual(oObject.params[0].name, 'one', 'first param name is correct');
    assert.strictEqual(oObject.params[0].value, 'two', 'first param value is correct');
    assert.strictEqual(oObject.params[1].name, 'three', 'second param name is correct');
    assert.strictEqual(oObject.params[1].value, 'four', 'second param value is correct');
    assert.strictEqual(oObject.hash, 'hash', 'hash is correct');
    assert.strictEqual(starparam.stringify(oObject), sUrl, 'stringify is correct');
  });

  QUnit.test('just hash', function(assert) {
    var sUrl ='http://test.com#hash';
    var oObject = starparam.parse(sUrl);
    assert.strictEqual(oObject.prefix, 'http://test.com', 'prefix is correct');
    assert.strictEqual(oObject.params.length, 0, 'param length is correct');
    assert.strictEqual(oObject.hash, 'hash', 'hash is correct');
    assert.strictEqual(starparam.stringify(oObject), sUrl, 'stringify is correct');
  });


  // #######
  // get
  // #######
  QUnit.module('"get"', {
  });

  QUnit.test('null/undefined first arg', function(assert) {
    assert.strictEqual(starparam.get(null, 'one'), undefined, 'null url returns undefined');
    assert.strictEqual(starparam.get(undefined, 'one'), undefined, 'undefined url returns undefined');
    assert.strictEqual(starparam.get('http://test.com', null), undefined, 'null param returns undefined');
    assert.strictEqual(starparam.get('http://test.com', undefined), undefined, 'undefined param returns undefined');
  });

  QUnit.test('match', function(assert) {
    assert.strictEqual(starparam.get('http://test.com?one=two', 'one'), 'two', 'basic match works');
  });

  QUnit.test('non-match', function(assert) {
    assert.strictEqual(starparam.get('http://test.com?one=two', 'nope'), undefined, 'non match returns undefined');
  });


  // #######
  // add
  // #######
  QUnit.module('"add"', {
  });

  QUnit.test('null/undefined args', function(assert) {
    assert.strictEqual(starparam.add(null, 'one', 'two'), undefined, 'null url returns undefined');
    assert.strictEqual(starparam.add(undefined, 'one', 'two'), undefined, 'undefined url returns undefined');

    assert.strictEqual(starparam.add('http://test.com', null, 'two'), undefined, 'null param name returns undefined');
    assert.strictEqual(starparam.add('http://test.com', undefined, 'two'), undefined, 'undefined param name returns undefined');
  });

  QUnit.test('null/undefined param value, no match', function(assert) {
    assert.strictEqual(starparam.add('http://test.com', 'one', null), 'http://test.com?one=', 'null param value works');
    assert.strictEqual(starparam.add('http://test.com', 'one', undefined), 'http://test.com?one=', 'undefined param value works');
  });

  QUnit.test('null/undefined param value, match', function(assert) {
    assert.strictEqual(starparam.add('http://test.com?one=two', 'one', null), 'http://test.com?one=', 'null param value replaces correctly');
    assert.strictEqual(starparam.add('http://test.com?one=two', 'one', undefined), 'http://test.com?one=', 'undefined param value replaces correctly');
  });

  QUnit.test('simple', function(assert) {
    assert.strictEqual(starparam.add('http://test.com', 'one', 'two'), 'http://test.com?one=two', 'basic add works');
  });

  QUnit.test('already params (1)', function(assert) {
    assert.strictEqual(starparam.add('http://test.com?foo=bar', 'one', 'two'), 'http://test.com?foo=bar&one=two', 'basic add with already-existing param works');
  });

  QUnit.test('already params (2)', function(assert) {
    assert.strictEqual(starparam.add('http://test.com?foo=bar&baz=boo', 'one', 'two'), 'http://test.com?foo=bar&baz=boo&one=two', 'basic add with already-existing params works');
  });

  QUnit.test('already exists', function(assert) {
    assert.strictEqual(starparam.add('http://test.com?one=foo', 'one', 'two'), 'http://test.com?one=two', 'basic replace works');
  });

  QUnit.test('already exists with multiple params (1)', function(assert) {
    assert.strictEqual(starparam.add('http://test.com?foo=bar&one=foo', 'one', 'two'), 'http://test.com?foo=bar&one=two', 'basic replace after already-existing param works');
  });

  QUnit.test('already exists with multiple params (2)', function(assert) {
    assert.strictEqual(starparam.add('http://test.com?one=foo&foo=bar', 'one', 'two'), 'http://test.com?one=two&foo=bar', 'basic replace before already-existing param works');
  });

  QUnit.test('already exists with multiple params (3)', function(assert) {
    assert.strictEqual(starparam.add('http://test.com?foo=bar&one=foo&baz=zoo', 'one', 'two'), 'http://test.com?foo=bar&one=two&baz=zoo', 'basic replace in-between already-existing params works');
  });

  QUnit.test('simple with hash', function(assert) {
    assert.strictEqual(starparam.add('http://test.com#hash', 'one', 'two'), 'http://test.com?one=two#hash', 'add param with hash works');
  });

  QUnit.test('already params (1) with hash', function(assert) {
    assert.strictEqual(starparam.add('http://test.com?foo=bar#hash', 'one', 'two'), 'http://test.com?foo=bar&one=two#hash', 'add param with hash and already-existing params works ');
  });

  QUnit.test('already exists with multiple params with hash', function(assert) {
    assert.strictEqual(starparam.add('http://test.com?foo=bar&one=foo&baz=zoo#hash', 'one', 'two'), 'http://test.com?foo=bar&one=two&baz=zoo#hash', 'add param with hash and multiple already-existing params works');
  });


  // #######
  // remove
  // #######
  QUnit.module('"remove"', {
  });

  QUnit.test('null/undefined args', function(assert) {
    assert.strictEqual(starparam.remove(null, 'one'), undefined, 'null url returns undefined');
    assert.strictEqual(starparam.remove(undefined, 'one'), undefined, 'undefined url returns undefined');
    assert.strictEqual(starparam.remove('http://test.com?one=two', null), 'http://test.com?one=two', 'null param returns url');
    assert.strictEqual(starparam.remove('http://test.com?one=two', undefined), 'http://test.com?one=two', 'undefined param returns url');
  });

  QUnit.test('only match arg present', function(assert) {
    assert.strictEqual(starparam.remove('http://test.com?one=two', 'one'), 'http://test.com', 'remove param works');
  });

  QUnit.test('other args present and after', function(assert) {
    assert.strictEqual(starparam.remove('http://test.com?one=two&three=four', 'one'), 'http://test.com?three=four', 'remove param with other param after works');
  });

  QUnit.test('other args present and before', function(assert) {
    assert.strictEqual(starparam.remove('http://test.com?three=four&one=two', 'one'), 'http://test.com?three=four', 'remove param with other param before works');
  });

  QUnit.test('only match arg present with hash', function(assert) {
    assert.strictEqual(starparam.remove('http://test.com?one=two#hash', 'one'), 'http://test.com#hash', 'remove param with hash works');
  });

  QUnit.test('other args present and before with hash', function(assert) {
    assert.strictEqual(starparam.remove('http://test.com?three=four&one=two#hash', 'one'), 'http://test.com?three=four#hash', 'remove param with other params present works');
  });

  QUnit.test('no match', function(assert) {
    assert.strictEqual(starparam.remove('http://test.com', 'one'), 'http://test.com', 'no match returns unmodified url');
  });

  QUnit.test('no match and other params present', function(assert) {
    assert.strictEqual(starparam.remove('http://test.com?foo=bar', 'one'), 'http://test.com?foo=bar', 'no match with other params returns unmodified url');
  });


  QUnit.test('exit', function(assert) {
    assert.ok('true');
    setTimeout(function() {
      jQuery('#runTestsButton').prop('disabled', false);
    }, 100);
  });
};
