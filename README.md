# starparam

[![Build Status](https://travis-ci.org/jonbri/starparam.svg?branch=master)](https://travis-ci.org/jonbri/starparam)

URL Parameter Utility

This module provides utlity functions for managing url parameters.

Only string operations occur...changes to `window.history` are left to the consumer.

* add/replace url parameter
* remove url parameter
* parse/stringify object representing url


## Installation
`npm install`

Load `node_modules/starparam/starparam.min.js`.

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

### set
Generate a url string with a parameter added/updated.

```
// url is http://localhost?foo=bar

starparam.set('baz', 'zoo');
// url is now http://localhost?foo=bar&baz=zoo

starparam.set('baz', 'ZOO');
// url is now http://localhost?foo=bar&baz=ZOO
```

### remove
Generate a url string with a parameter removed.

```
// url is http://localhost?foo=bar

starparam.remove('foo');
// url is now http://localhost
```

### parse
Parse the url, breaking it up into a simple representative object.

```
// url is http://localhost?foo=bar#one

var oUrl = starparam.parse();
oUrl.prefix          // 'http://localhost'
oUrl.params          // array of simple param objects
oUrl.params[0].name  // 'foo'
oUrl.params[0].value // 'bar'
oUrl.hash            // 'one'
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
By default, functions like `get`, `set` and `remove` will act upon `window.location.href`, but a custom url can be passed-in.

```
starparam.get('boo', {
    url: 'http://localhost?boo=zoo'
}) // returns 'zoo'
```

## License
[BSD-2-Clause](http://spdx.org/licenses/BSD-2-Clause)
