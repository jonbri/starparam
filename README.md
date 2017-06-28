# starparam

[![Build Status](https://travis-ci.org/jonbri/starparam.svg?branch=master)](https://travis-ci.org/jonbri/starparam)

URL Parameter Utility

This module provides utility functions for managing url parameters.

Only string operations occur...changes to `window.history` are left to the consumer.

* add/replace url parameter
* remove url parameter
* parse/stringify object representing url


## Installation
`npm install --save-dev starparam`

```
import starparam from 'starparam';
```

## API
### get
Get the value of a url parameter.

```
starparam.get('http://localhost?foo=bar', 'foo') // returns 'bar'
```

### set
Generate a url string with a parameter added/updated.

```
starparam.set('http://localhost?foo=bar', 'baz', 'zoo'); // returns http://localhost?foo=bar&baz=zoo
```

### remove
Generate a url string with a parameter removed.

```
starparam.remove('http://localhost?foo=bar', 'foo'); // returns http://localhost
```

### parse
Parse the url, breaking it up into a simple representative object.

```
var oUrl = starparam.parse('http://localhost?foo=bar#one');
oUrl.prefix          // 'http://localhost'
oUrl.params          // array of simple param objects
oUrl.params[0].name  // 'foo'
oUrl.params[0].value // 'bar'
oUrl.hash            // 'one'
```

### stringify
Convert from a starparam url object into a url string (the inverse of `parse`).

```
starparam.stringify(starparam.parse('http://localhost?foo=bar')) // returns string: 'http://localhost?foo=bar'
```

## License
[BSD-2-Clause](http://spdx.org/licenses/BSD-2-Clause)
