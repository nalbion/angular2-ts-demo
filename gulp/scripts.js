'use strict';
var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    ts = require('gulp-typescript'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    merge = require('merge2');

var Config = require('./_config'),
    tsProject = ts.createProject(require('./_tsProject')),
    systemjsConfig = require('./_systemjsConfig');


gulp.task('scripts', ['typescript', 'scripts:lib'], function() {
    if (argv.production) {
        var Builder = require('systemjs-builder');
        var builder = new Builder(systemjsConfig);

        //builder.build('main/**/* - angular2/angular2', Config.paths.dest + '/js/myModule.js');

        Promise.all([builder.trace('main - extras'), //  - angular2/angular2
                     builder.trace('extras')])
               .then(function (trees) {
                    return Promise.all([
                        builder.buildTree(trees[0], Config.paths.dest + '/js/main.js'),
                        builder.buildTree(trees[1], Config.paths.dest + '/js/extras.js')
                    ]);
                });
    }
});

// skip source maps:  gulp scripts --production
gulp.task('typescript', function() {
    if (argv.production) {
        gulp.start('typescript:prod');
    } else {
        gulp.start('typescript:dev');
    }
});

// To reduce and simplify the final js files,
// concat the TypeScript source files before compilation
// Remove local "/// <reference" and lines commented with "remove from concatenated ts"
gulp.task('typescript:concat', function () {
    return merge(
        gulp.src(['app/scripts/main.ts', 'app/scripts/main/**/*.ts'])
            .pipe(concat('main.ts')),
        gulp.src(['app/scripts/extras.ts', 'app/scripts/extras/**/*.ts'])
            .pipe(concat('extras.ts'))
    )
    .pipe(replace(/\/\/\/ <reference path="\.[^\.].+/g, ''))
    .pipe(replace(/.*\/\/ remove from concatenated ts/g, ''))
    .pipe(replace(/^import {[^}]+} from '\.\/.+/mg, ''))
    .pipe(replace(/^export class/mg, 'class'))
    .pipe(replace(/\/\/\/ <reference path="(\.\.\/)+declarations/g, '/// <reference path="../../declarations'))
    .pipe(gulp.dest('.tmp/ts'));
});

gulp.task('typescript:prod', ['typescript:concat'], function () {
    var tsResult = gulp.src('.tmp/ts/*.ts')
        //.pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(ts(tsProject, {}, ts.reporter.longReporter()));

    return tsResult.js
            //.pipe(ts.filter(tsProject, { referencedFrom: ['_main.ts'] }))
            //.pipe(concat('main.js'))
            //.pipe(replace(/'scripts\/_/, '\'js/'))
            //.pipe(gulpif(!argv.production, sourcemaps.write()))
            .pipe(gulp.dest(Config.paths.dest + '/js/es6'));
});



gulp.task('typescript:dev', function () {
    var tsResult = gulp.src('app/scripts/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject, {}, ts.reporter.longReporter()));

    //return tsResult.js
    //    //.pipe(ts.filter(tsProject, { referencedFrom: ['_main.ts'] }))
    //    //.pipe(concat('main.js'))
    //    //.pipe(replace(/'scripts\/_/, '\'js/'))
    //    .pipe(sourcemaps.write())
    //    .pipe(gulp.dest(Config.paths.dest + '/js/es6'));

    return merge(
        tsResult.js
            //.pipe(ts.filter(tsProject, { referencedFrom: ['main.ts', 'extras.ts'] }))
            //.pipe(concat('main.js'))
            //.pipe(replace(/'scripts\/_/, '\'js/'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(Config.paths.dest + '/js')),
        //tsResult.js
        //    .pipe(ts.filter(tsProject, { referencedFrom: ['main.ts'] }))
        //    .pipe(concat('main.js'))
        //    //.pipe(replace(/'scripts\/_/, '\'js/'))
        //    .pipe(sourcemaps.write())
        //    .pipe(gulp.dest(Config.paths.dest + '/js')),
        //tsResult.js
        //    .pipe(ts.filter(tsProject, { referencedFrom: ['extras.ts'] }))
        //    .pipe(concat('extras.js'))
        //    .pipe(sourcemaps.write())
        //    .pipe(gulp.dest(Config.paths.dest + '/js')),
        tsResult.dts.pipe(gulp.dest(Config.paths.dest + '/declarations'))
    );
});

/** SystemJS requires es6-module-loader.js to be in the same directory */
gulp.task('scripts:lib', function() {
    return merge(
        merge(
            gulp.src('bower_components/systemjs/dist/system.*'),
            gulp.src('bower_components/es6-module-loader/dist/es6-module-loader.*'),
            gulp.src('node_modules/babel-core/browser.js'),
            gulp.src('node_modules/es6-micro-loader/dist/system-polyfill.min.js'),
            gulp.src('node_modules/es6-micro-loader/dist/system-polyfill.js')
        ).pipe(gulp.dest(Config.paths.dest + '/js/lib')),
        gulp.src('node_modules/babel-core/external-helpers.js')
            .pipe(gulp.dest(Config.paths.dest + '/babel')),
        gulp.src('lib/angular2/angular2.js')
            .pipe(gulp.dest(Config.paths.dest + '/angular2'))
    );
});