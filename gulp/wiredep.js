'use strict';
var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.less')
        .pipe(wiredep())
        .pipe(gulp.dest('app/css'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            exclude: ['bootstrap/dist'],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});