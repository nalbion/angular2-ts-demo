'use strict';
var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    ts = require('gulp-typescript'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    merge = require('merge2');

var Config = require('./_config');

// skip source maps:  gulp scripts --production

var tsProject = ts.createProject({
    typescript: require('typescript'),
    sourceRoot: 'app/scripts',
    sortOutput: true,
    declarationFiles: true,
    noExternalResolve: false,
    target: 'ES5',
    module: 'amd'       // commonjs (for Node) or amd (eg RequireJS for web)
});

gulp.task('scripts', function () {
    var tsResult = gulp.src('app/scripts/**/*.ts')
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(ts(tsProject, {}, ts.reporter.longReporter()));

    return merge(
        tsResult.js
            .pipe(ts.filter(tsProject, { referencedFrom: ['_main.ts'] }))
            .pipe(concat('main.js'))
            .pipe(replace(/'scripts\/_/, '\'js/'))
            .pipe(gulpif(!argv.production, sourcemaps.write()))
            .pipe(gulp.dest(Config.paths.dest + '/js')),
        tsResult.js
            .pipe(ts.filter(tsProject, { referencedFrom: ['_extras.ts'] }))
            .pipe(concat('extras.js'))
            .pipe(gulpif(!argv.production, sourcemaps.write()))
            .pipe(gulp.dest(Config.paths.dest + '/js')),
        tsResult.dts.pipe(gulp.dest(Config.paths.dest + '/declarations')),
        gulp.src('app/declarations/**/*d.ts')
            .pipe(gulp.dest(Config.paths.dest + '/declarations'))
    );
});
