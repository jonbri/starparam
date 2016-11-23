#!/bin/sh

mkdir -p dist
version=`grep version ./package.json | \
    awk -F "\"" '{ print $4 }'`

echo "/* https://github.com/jonbri/starparam v$version" `date` "*/" > dist/starparam.min.js
uglifyjs src/starparam.js --compress --mangle >> dist/starparam.min.js
cp src/starparam.js dist/starparam.js

