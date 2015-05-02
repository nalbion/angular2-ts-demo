'use strict';
var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    ts = require('gulp-typescript'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    merge = require('merge2'),
    path = require('path');

var Config = require('./_config');

// skip source maps:  gulp scripts --production

var tsProject = ts.createProject({
    typescript: require('typescript'),
    sourceRoot: 'app/scripts',
    sortOutput: true,
    declarationFiles: true,
    noExternalResolve: false,
    // use SystemJS to build your files to es5 with System.register wrapper
    target: 'ES6'
    //module: 'amd'       // commonjs (for Node) or amd (eg RequireJS for web)
});

gulp.task('typescript', function () {
    var tsResult = gulp.src('app/scripts/**/*.ts')
        //...no, that didn't work...// Change the external modules to internal
        //.pipe(replace(/import \{.*\} from '\.\/(main\/[^']+)';/g,
        //        '/// <reference path="$1.ts" />'))
        //.pipe(replace(/export class ([^_][^\s]+) {/g,
        //        'class $1 {'))
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(ts(tsProject, {}, ts.reporter.longReporter()));

    //return tsResult.js
    //        //.pipe(ts.filter(tsProject, { referencedFrom: ['_main.ts'] }))
    //        //.pipe(concat('main.js'))
    //        //.pipe(replace(/'scripts\/_/, '\'js/'))
    //        //.pipe(gulpif(!argv.production, sourcemaps.write()))
    //        .pipe(gulp.dest(Config.paths.dest + '/js/es6'));

    var babelOptions = {

    };

    return merge(
        tsResult.js
            .pipe(ts.filter(tsProject, { referencedFrom: ['_main.ts'] }))
            .pipe(babel(babelOptions))
            .pipe(concat('main.js'))
            //.pipe(replace(/'scripts\/_/, '\'js/'))
            //.pipe(replace(/var _([^ ]+) = require\(\'\.\/main\/.*/g, 'var _$1 = $1;'))
            .pipe(gulpif(!argv.production, sourcemaps.write()))
            .pipe(gulp.dest(Config.paths.dest + '/js')),
        tsResult.js
            .pipe(ts.filter(tsProject, { referencedFrom: ['_extras.ts'] }))
            .pipe(babel(babelOptions))
            .pipe(concat('extras.js'))
            .pipe(gulpif(!argv.production, sourcemaps.write()))
            .pipe(gulp.dest(Config.paths.dest + '/js')),
        tsResult.dts.pipe(gulp.dest(Config.paths.dest + '/declarations')),
        gulp.src('app/declarations/**/*d.ts')
            .pipe(gulp.dest(Config.paths.dest + '/declarations'))
    );
});

var systemjsConfig = {
    // baseURL: where to find library code
    baseURL: path.resolve('bower_components'),
    // map module aliases to their locations
    map: {
        //angular2: '../lib'
        //angular2: '../node_modules/angular2/es6/dev'
        angular2: '../node_modules/angular2',
        rx: '../node_modules/angular2/node_modules/rx/dist/rx'
    },
    meta: {
        'angular2/angular2': {
            build: false
        }
    },
    // paths: where to find our code
    paths: {
        //'app': path.resolve('.tmp/js/*.js')
        '_main': path.resolve('.tmp/js/es6/*.js'),
        '_extras': path.resolve('.tmp/js/es6/*.js'),
        'main/*': path.resolve('.tmp/js/es6/main/*.js'),
        'extras/*': path.resolve('.tmp/js/es6/extras/*.js'),
        'babel': '../node_modules/babel-core/browser.js'
    },
    //bundles: {
    //    main: ['MyAppComponent', 'Test1'],
    //    extras: ['Extras', 'Test2', 'Test3']
    //},
    // opt in to Babel for transpiling over Traceur
    transpiler: 'babel',
    babelOptions: {
        blacklist: ['useStrict'],
        sourceMaps: true
        //inputSourceMap:
    }
    //traceurOptions: {
    //}
};

/** SystemJS requires es6-module-loader.js to be in the same directory */
gulp.task('scripts:lib', function() {
    return merge(
        merge(
            gulp.src('bower_components/systemjs/dist/system.*'),
            gulp.src('bower_components/es6-module-loader/dist/es6-module-loader.*'),
            gulp.src('node_modules/babel-core/browser.js')
        ).pipe(gulp.dest(Config.paths.dest + '/js/lib')),
        gulp.src('node_modules/babel-core/external-helpers.js')
            .pipe(gulp.dest(Config.paths.dest + '/babel'))
        );
});

gulp.task('scripts', ['typescript', 'scripts:lib'], function() {
    //var Builder = require('systemjs-builder');
    //
    ////Builder.build('.tmp/main', systemjsConfig, 'app/.out/sys-build-test.js')
    //
    //var builder = new Builder(systemjsConfig);
    ////Promise.all([builder.trace('_main'), builder.trace('_extras')])
    ////    .then(function(trees) {
    ////        //var commonTree = builder.intersectTrees(trees[0], trees[1]);
    ////        return Promise.all([
    ////            //builder.buildTree(commonTree,
    ////            //                Config.paths.dest + '/js/shared-bundle.js'),
    ////            builder.buildTree(trees[0], //builder.subtractTrees(trees[0], commonTree),
    ////                            Config.paths.dest + '/js/main.js'),
    ////            builder.buildTree(trees[1], //builder.subtractTrees(trees[1], commonTree),
    ////                            Config.paths.dest + '/js/extras.js')
    ////        ]);
    ////    });
    //
    //    builder.build('_main - angular2/angular2',
    //            Config.paths.dest + '/js/main.js'
    //            //,{ minify: true, sourceMaps: true, config: cfg
    //            // lowResSourceMaps: true
    //            // mangle: false, globalDefs: { DEBUG: false } }}
    //    )
    //    .then(function(output) {
    //        // if outFile is left out, does in-memory compile
    //        //    output.source;    // generated bundle source
    //        //    output.sourceMap; // generated bundle source map
    //        //    output.modules;   // array of module names defined in the bundle
    //        //}
    //        console.log('Build complete');
    //    })
    //    .catch(function(err) {
    //        console.log('Build error');
    //        console.log(err);
    //    });
});
