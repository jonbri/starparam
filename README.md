# starparam

[![Build Status](https://travis-ci.org/jonbri/starparam.svg?branch=master)](https://travis-ci.org/jonbri/starparam)

URL Parameter Utility

This module provides utlity functions for managing url parameters.

* update `window.history`
* add/replace url parameter
* remove parameter
* parse/stringify object representing url


## Installation
`npm install`

Load `node_modules/starparam/dist/starparam.min.js`.

Play with StarParam: https://jonbri.github.io/starparam/


## API
When StarParam is loaded the `starparam` global variable is made available on the `window` object.

Functionality is driven by invoking static functions on the `starparam` object.

### get
Get the value of a url parameter.

```
// url is http://localhost?foo=bar

starparam.get('foo') // returns 'bar'
```

### add
Add a parameter to the url.

```
// url is http://localhost?foo=bar

starparam.add('baz', 'zoo');
// url is now http://localhost?foo=bar&baz=zoo

starparam.add('baz', 'ZOO');
// url is now http://localhost?foo=bar&baz=ZOO
```

### remove
Remove a parameter from the url.

```
// url is http://localhost?foo=bar

starparam.remove('foo');
// url is now http://localhost
```

### parse
Parse the url, breaking it up into a simple representative object.

```
// url is http://localhost?foo=bar#one

var aUrl = starparam.parse();
aUrl.prefix          // 'http://localhost'
aUrl.params          // array of simple param objects
aUrl.params[0].name  // 'foo'
aUrl.params[0].value // 'bar'
aUrl.hash            // 'one'
```

### stringify
Convert from a starparam url object into a url string (the inverse of `parse`).

```
// url is http://localhost?foo=bar

var aUrl = starparam.parse();
starparam.stringify(aUrl) // 'http://localhost?foo=bar'
```


## API Options
API functions take a config object as their last parameter for invocation flexibility.

### url
By default, functions like `get`, `add` and `remove` will act upon `window.location.href`, but a custom url can be passed-in.

```
starparam.get('boo', {
    url: 'http://localhost?boo=zoo'
}) // returns 'zoo'
```

### updateHistory
Specify if `window.history.pushState` should be updated.
```
// url is http://localhost
starparam.add('boo', 'zoo', {
    updateHistory: false
});
// returns 'http://localhost?boo=zoo',
// but doesn't actually update the browser's url
```

## License
[BSD-2-Clause](http://spdx.org/licenses/BSD-2-Clause)
