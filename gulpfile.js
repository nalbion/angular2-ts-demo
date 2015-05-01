'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;

var Config = require('./gulp/_config');

require('./gulp/scripts');
require('./gulp/wiredep');
require('./gulp/watch');
require('./gulp/connect');
//require('./gulp/fonts');
//require('./gulp/html');
//require('./gulp/images');
require('./gulp/inlinesource');
//require('./gulp/jshint');
require('./gulp/styles');
//require('./gulp/swagger');
require('./gulp/templates');

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('build', [
                    //'jshint',
                    'scripts',
                    'styles',
                    //, 'html', 'images', 'fonts', 'extras'
                    ], function () {
    return gulp.src('dist/**/*')
        .pipe($.size({title: 'build', gzip: true}));
});

gulp.task('serve', ['build', 'connect'], function () {
    if (!argv['dont-open']) {
        require('opn')('http://localhost:9000');
    }
});