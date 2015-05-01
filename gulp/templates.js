'use strict';

var gulp = require('gulp'),
    fileinclude = require('gulp-file-include'),
    templateCache = require('gulp-angular-templatecache');


gulp.task('templates', function() {
    return gulp.src(['app/views/template/**/*.html',
        'bower_components/angular-ui-bootstrap/template/**'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'app/views/partial'
        }))
        .pipe(templateCache({
            standalone: true,
            root: 'template'
        }))
        .pipe(gulp.dest('.tmp/js'));
});
