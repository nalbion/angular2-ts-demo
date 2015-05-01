'use strict';

var gulp = require('gulp'),
    inlinesource = require('gulp-inline-source');

gulp.task('inlinesource', ['styles'], function () {
    return gulp.src('app/*.html')
        .pipe(inlinesource({rootpath: '.tmp/'}))
        .pipe(gulp.dest('.tmp'));
});
