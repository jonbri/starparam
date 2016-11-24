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
        return (function(aSplit) {
          return {
            name: aSplit[0],
            value: aSplit[1]
          };
        }(s.split('=')));
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
    return _parse(sUrl).params.filter(function(oParam) {
      return oParam.name === sParam;
    })[0];
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


  //////////////////////////////////
  // execution starts
  // until this time, everything in this file
  // has just been variable and function declarations

  // expose api to global namespace
  (function() {
    var oStarParam = {
      parse: function(sUrl) {
        if (arguments.length === 0) {
          sUrl = window.location.href;
        }

        if (isNil(sUrl)) {
            return undefined;
        }

        return _parse(sUrl);
      },

      stringify: function(oUrl) {
        return _stringify(oUrl);
      },

      get: function(sParam, oConfig) {
        var sUrl;
        oConfig = oConfig || {};
        sUrl = oConfig.url;
        if (isNil(sUrl)) {
          sUrl = window.location.href;
        }
        return _get(sUrl, sParam);
      },

      add: function(sParam, sValue, oConfig) {
        var sUrlToOperateOn, sResultUrl;
        oConfig = oConfig || {};

        // if url not given, query browser
        sUrlToOperateOn = oConfig.hasOwnProperty('url') ?
          oConfig.url :
          window.location.href;

        // if the given url is null or undefined
        if (isNil(sUrlToOperateOn)) {
          return undefined;
        }

        // generate updated url
        sResultUrl = _add(sUrlToOperateOn, sParam, sValue);

        // update browser history
        if (oConfig.updateHistory !== false) {
          window.history.pushState('', '', sResultUrl);
        }

        return sResultUrl;
      },

      remove: function(sParam, oConfig) {
        var sUrlToOperateOn, sResultUrl;
        oConfig = oConfig || {};

        // if url not given, query browser
        sUrlToOperateOn = oConfig.hasOwnProperty('url') ?
          oConfig.url :
          window.location.href;

        // if the given url is null or undefined
        if (isNil(sUrlToOperateOn)) {
          return undefined;
        }

        // generate updated url
        sResultUrl = _remove(sUrlToOperateOn, sParam);

        // update browser history
        if (oConfig.updateHistory !== false) {
          window.history.pushState('', '', sResultUrl);
        }

        return sResultUrl;
      }
    };

    window.starparam = oStarParam;
  }());
}());
