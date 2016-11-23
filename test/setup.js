jQuery('#runTestsButton').click(function() {
    window.starparam_runTests();
});

// turn off auto-run?
var href = window.location.href;
if (/[?&]autorun=false/.test(href) !== true) {
    window.starparam_runTests();
}

jQuery('#autorun').click(function() {
    var url = window.location.href;
    if (url.indexOf('autorun') > 0) {
        url = url.replace(/[\?&]+autorun=(false|true)/,'');
    } else {
        if (url.indexOf('?') === -1) {
            url += "?autorun=false";
        } else {
            url += "&autorun=false";
        }
    }
    window.location.replace(url);
});

