#!/usr/bin/env node

const repl = require('../build/repl.js').default;
const program = require('../build/program.js').default
const { promises: fs} = require('fs');

const [command, ...args] = process.argv.slice(2);

if(command) {
    fs.readFile(command, 'utf-8')
    .then(result => {
        const res = program('index.op', result);
        console.log(res);
    })
} else {
    repl();
}