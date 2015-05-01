'use strict';
// Idea borrowed from https://github.com/28msec/cellstore/blob/master/tasks/config.js
var argv = require('yargs').argv;

var config = {
    paths: {
        dest: argv.production ? 'dist' : '.tmp'
    }
};

module.exports = config;