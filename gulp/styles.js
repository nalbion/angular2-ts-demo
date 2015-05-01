'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge2'),
    argv = require('yargs').argv;

var Config = require('./_config');

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({browsers: ['last 2 versions']});

gulp.task('styles', function (cb) {
    var options = {
        paths: ['.'],
        plugins: [autoprefix]
    };

    if (argv.production) {
        options.compress = true;
    }

    return merge(
        gulp.src('app/styles/inline*.less')
//            .pipe($.changed('.tmp/css'))
            .pipe(plumber())
            .pipe(less(options))
            .pipe(replace(new RegExp('/\\*!((?!\\*/).)*\\*/', 'g'), ''))
            //.pipe(minifyCSS({keepBreaks: false}))
            //.pipe($.csso())
            .pipe(gulp.dest(Config.paths.dest + '/css')),
        gulp.src('app/styles/main.less')
            //.pipe($.changed('.tmp/css'))
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(less({
                paths: ['.'],
                plugins: [autoprefix]
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(Config.paths.dest + '/css'))
        //.on('end', cb || function() {})
        //.on('error', $.util.log)
    );
});
