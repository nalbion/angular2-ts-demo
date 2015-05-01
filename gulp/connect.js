'use strict';

var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('connect', ['scripts', 'styles'], function () {
    livereload.listen();

    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = require('connect')()
        .use(require('connect-livereload')({port: 35729}))
        .use(serveStatic('.tmp'))
        .use(serveStatic('app'))
        .use(serveStatic('lib'))
        // paths to bower_components should be relative to the current file
        // e.g. in app/index.html you should use ../bower_components
        .use('/bower_components', serveStatic('bower_components'))
        .use(serveIndex('app'));

    //http://localhost:9000/bower_components/angular-ui-router/release/angular-ui-router.js
    //http://localhost:9000/bower_components/angularjs/                angular.js

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});
