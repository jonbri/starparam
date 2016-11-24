#!/bin/sh

version=`grep version ./package.json | \
    awk -F "\"" '{ print $4 }'`

echo "/* https://github.com/jonbri/starparam v$version" `date` "*/" > starparam.min.js
uglifyjs starparam.js --compress --mangle >> starparam.min.js

