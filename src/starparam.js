/**
 * StarParam<br>
 * Url Parameter Utility<br><br>
 *
 * {@link http://jonbri.github.io/starparam}<br>
 * {@link https://github.com/jonbri/starparam}<br>
 * {@link https://www.npmjs.com/package/starparam}<br><br>
 *
 * @module starparam
 * @author Jonathan Brink <jonathandavidbrink@gmail.com>
 */
(function starparam_go() {

  function isNil(s) {
    return s === null || s === undefined;
  }

  function _parse(sUrl) {
    var aMatches;

    if (isNil(sUrl)) {
      return undefined;
    }

    aMatches = new RegExp(
      "(^[^?&#]+)" + // prefix
      "\\??" +
      "([^#]*)" + // params
      "#?" +
      "(.*)$" // hash
    ).exec(sUrl);

    if (isNil(aMatches)) {
      return {
        params: []
      };
    }

    return {
      prefix: aMatches[1],
      params: aMatches[2].split('&').filter(function(s) {
        return s !== '';
      }).map(function(s) {
        var aSplit = s.split('=');
        return {
          name: aSplit[0],
          value: aSplit[1]
        };
      }),
      hash: aMatches[3] === '' ? undefined : aMatches[3]
    };
  }

  function _stringify(o) {
    var sResult = '';

    if (isNil(o)) {
      return undefined;
    }

    if (isNil(o.prefix) === false) {
      sResult += o.prefix;
    }

    if (isNil(o.params) === false) {
      o.params.forEach(function(oParam, iIndex) {
        if (iIndex === 0) {
          sResult += "?";
        } else {
          sResult += "&";
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
    return _parse(sUrl).params.find(function(oParam) {
      return oParam.name === sParam;
    });
  }

  function _get(sUrl, sParam) {
    var oMatch;
    if (isNil(sUrl) || isNil(sParam)) {
      return undefined;
    }
    oMatch = _getParamObject(sUrl, sParam);
    return isNil(oMatch) ? undefined : oMatch.value;
  }

  function _add(sUrl, sParam, sValue) {
    var oUrl;

    if (isNil(sUrl) || isNil(sParam)) {
      return undefined;
    }
    if (isNil(sValue)) {
      sValue = '';
    }

    oUrl = _parse(sUrl);

    if (isNil(_getParamObject(sUrl, sParam))) {
      oUrl.params.push({
        name: sParam,
        value: sValue
      });
    } else {
      oUrl.params = oUrl.params.map(function(oParam) {
        if (oParam.name === sParam) {
          oParam.value = sValue;
        }
        return oParam;
      });
    }

    return _stringify(oUrl);
  }

  function _remove(sUrl, sParam) {
    var oUrl;

    if (isNil(sUrl)) {
      return undefined;
    }
    if (isNil(sParam)) {
      return sUrl;
    }

    oUrl = _parse(sUrl);

    oUrl.params = oUrl.params.filter(function(oParam) {
      return oParam.name !== sParam;
    });

    return _stringify(oUrl);
  }

  function _getBrowserUrl() {
    // TODO
    return '';
  }

  function operation(sOperation, aArgs) {
    var sUrl, sReturnUrl;

    switch(sOperation) {
      case 'parse':
        if (aArgs.length === 1) {
          sReturnUrl = _parse(aArgs[0]);
        } else {
          sReturnUrl = _parse(_getBrowserUrl());
        }
        break;
      case 'get':
        if (aArgs.length === 2) {
          sReturnUrl = _get(aArgs[0], aArgs[1]);
        } else {
          sReturnUrl = _get(_getBrowserUrl(), aArgs[0]);
        }
        break;
      case 'add':
        if (aArgs.length === 3) {
          sReturnUrl = _add(aArgs[0], aArgs[1], aArgs[2]);
        } else {
          sReturnUrl = _add(_getBrowserUrl(), aArgs[0], aArgs[1]);
        }
        break;
      case 'remove':
        if (aArgs.length === 2) {
          sReturnUrl = _remove(aArgs[0], aArgs[1]);
        } else {
          sReturnUrl = _remove(_getBrowserUrl(), aArgs[0]);
        }
        break;
    }

    return sReturnUrl;
  }

  //////////////////////////////////
  // execution starts
  // until this time, everything in this file
  // has just been variable and function declarations

  // expose api to global namespace
  (function() {
    var starparam = {};

    starparam.stringify = function(o) {
      return _stringify(o);
    };
    starparam.parse = function() {
      return operation('parse', Array.prototype.slice.call(arguments));
    };
    starparam.get = function() {
      return operation('get', Array.prototype.slice.call(arguments));
    };
    starparam.add = function() {
      return operation('add', Array.prototype.slice.call(arguments));
    };
    starparam.remove = function() {
      return operation('remove', Array.prototype.slice.call(arguments));
    };

    window.starparam = starparam;
  }());
}());
