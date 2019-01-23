#!/bin/bash

if [[ $NODE_ENV = "production" ]]; then

    npm run start

    if [[ ! -d "node_modules" ]]; then
        echo "Missing dependencies, runing npm install..."
        npm install
    fi
else

    if [[ ! -d "node_modules" ]]; then
        echo "First run, npm install..."
        npm install
        echo "Save package.json checksum"
        sum package.json > package.json.sum
    fi
    
    grep "`sum package.json`" package.json.sum
    if [[ $? -ne 0 ]]; then
        echo "package.json has changed, run npm install..."
        npm install
        echo "Save new package.json checksum"
        sum package.json > package.json.sum
    else
        echo "No changes in package.json"
    fi
    NODE_ENV="dev" nodemon --inspect=0.0.0.0:5858 --expose-gc  --legacy-watch index.js

fi