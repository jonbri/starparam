/**
 * StarParam
 *
 * Url Parameter Utility
 *
 * http://jonbri.github.io/starparam
 * https://github.com/jonbri/starparam
 * https://www.npmjs.com/package/starparam
 *
 * Jonathan Brink <jonathandavidbrink@gmail.com>
 */
function isNil(s) {
  return s === null || s === undefined;
}

function _parse(sUrl) {
  if (isNil(sUrl)) {
    return undefined;
  }

  const aMatches = new RegExp(
    '(^[^?&#]+)' + // prefix
    '\\??' +
    '([^#]*)' + // params
    '#?' +
    '(.*)$' // hash
  ).exec(sUrl);

  if (isNil(aMatches)) {
    return {
      params: []
    };
  }

  return {
    prefix: aMatches[1],
    params: aMatches[2]
      .split('&')
      .filter(s => s !== '')
      .map(s => s.split('='))
      .map(a => ({ name: a[0], value: a[1] })),
    hash: aMatches[3] === '' ? undefined : aMatches[3]
  };
}

function _stringify(o) {
  let sResult = '';

  if (isNil(o)) {
    return undefined;
  }

  if (isNil(o.prefix) === false) {
    sResult += o.prefix;
  }

  if (isNil(o.params) === false) {
    o.params.forEach((oParam, iIndex) => {
      if (iIndex === 0) {
        sResult += '?';
      } else {
        sResult += '&';
      }
      sResult += oParam.name + '=' + oParam.value;
    });
  }

  if (isNil(o.hash) === false) {
    sResult += '#' + o.hash;
  }

  return sResult;
}

function _getParamObject(sUrl, sParam) {
  return _parse(sUrl).params.filter(oParam => oParam.name === sParam)[0];
}

function _get(sUrl, sParam) {
  if (isNil(sUrl) || isNil(sParam)) {
    return undefined;
  }
  const oMatch = _getParamObject(sUrl, sParam);
  return isNil(oMatch) ? undefined : oMatch.value;
}

function _set(sUrl, sParam, sValue) {
  if (isNil(sUrl) || isNil(sParam)) {
    return undefined;
  }
  if (isNil(sValue)) {
    sValue = '';
  }

  const oUrl = _parse(sUrl);

  if (isNil(_getParamObject(sUrl, sParam))) {
    oUrl.params.push({
      name: sParam,
      value: sValue
    });
  } else {
    oUrl.params = oUrl.params.map(oParam => {
      if (oParam.name === sParam) {
        oParam.value = sValue;
      }
      return oParam;
    });
  }

  return _stringify(oUrl);
}

function _remove(sUrl, sParam) {
  if (isNil(sUrl)) {
    return undefined;
  }
  if (isNil(sParam)) {
    return sUrl;
  }

  const oUrl = _parse(sUrl);
  oUrl.params = oUrl.params.filter(oParam => oParam.name !== sParam);

  return _stringify(oUrl);
}


//////////////////////////////////
// execution starts
// until this time, everything in this file
// has just been variable and function declarations

// expose api to global namespace
module.exports = {
  parse: _parse,
  stringify: _stringify,
  get: _get,
  set: _set,
  remove: _remove
};
