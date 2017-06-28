// starparam - URL Parameter Utility
//
// https://github.com/jonbri/starparam
// https://www.npmjs.com/package/starparam
//
// Jonathan Brink <jonathandavidbrink@gmail.com>

//
// utility functions
//
function isNil(s) {
  return s === null || s === undefined;
}

function getParamObject(sUrl, sParam) {
  return parse(sUrl).params.filter(oParam => oParam.name === sParam)[0];
}


//
// api functions
//
function parse(sUrl) {
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

function get(sUrl, sParam) {
  if (isNil(sUrl) || isNil(sParam)) {
    return undefined;
  }
  const oMatch = getParamObject(sUrl, sParam);
  return isNil(oMatch) ? undefined : oMatch.value;
}

function set(sUrl, sParam, sValue) {
  if (isNil(sUrl) || isNil(sParam)) {
    return undefined;
  }
  if (isNil(sValue)) {
    sValue = '';
  }

  const oUrl = parse(sUrl);

  if (isNil(getParamObject(sUrl, sParam))) {
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

  return stringify(oUrl);
}

function remove(sUrl, sParam) {
  if (isNil(sUrl)) {
    return undefined;
  }
  if (isNil(sParam)) {
    return sUrl;
  }

  const oUrl = parse(sUrl);
  oUrl.params = oUrl.params.filter(oParam => oParam.name !== sParam);

  return stringify(oUrl);
}

function stringify(o) {
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

module.exports = {
  parse,
  get,
  set,
  remove,
  stringify
};
