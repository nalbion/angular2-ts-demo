var path = require('path'),
    Config = require('./_config');

module.exports = {
    // baseURL: where to find library code
    baseURL: path.resolve('bower_components'),
        // map module aliases to their locations
        map: {
            rx: '../node_modules/angular2/node_modules/rx/dist/rx'
        },
    meta: {
        'angular2/angular2': {
            build: false
        }
    },
    // paths: where to find our code
    paths: {
        '_main': path.resolve(Config.paths.dest + '/js/es5/*.js'),
        '_extras': path.resolve(Config.paths.dest + '/js/es5/*.js'),
        'main': path.resolve(Config.paths.dest + '/js/es6/main.js'),
        'extras': path.resolve(Config.paths.dest + '/js/es6/extras.js')
    }
};