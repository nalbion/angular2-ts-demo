'use strict';
var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('watch', ['build', 'connect'], function() {
    //livereload.listen();

    // watch for changes
    gulp.watch([
        'app/*.html',
        '.tmp/css/**/*.css',
        '.tmp/js/**/*.js',
        'app/images/**/*'
    ]).on('change', livereload.changed);

    gulp.watch('app/**/*.html', ['inlinesource']);
    gulp.watch('app/views/**/*.html', ['templates']);
    gulp.watch('app/styles/**/*.less', ['styles', 'inlinesource']);
    gulp.watch(['app/scripts/**/*.{js,ts}'], ['scripts']);
    //gulp.watch('bower.json', ['wiredep']);
});