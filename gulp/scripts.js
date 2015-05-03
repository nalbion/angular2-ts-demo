'use strict';
var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv,
    ts = require('gulp-typescript'),
    replace = require('gulp-replace'),
    sourcemaps = require('gulp-sourcemaps'),
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
    //emitDecoratorMetadata: true,
    //declaration: false,
    //noImplicitAny: false,
    //removeComments: true,
    //noLib: false,
    // use SystemJS to build your files to es5 with System.register wrapper
    //target: 'ES6'
    target: 'ES5',
    module: 'amd'       // commonjs (for Node) or amd (eg RequireJS for web)
});

gulp.task('typescript', function () {
    var tsResult = gulp.src('app/scripts/**/*.ts')
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(ts(tsProject, {}, ts.reporter.longReporter()));

    //return tsResult.js
    //        //.pipe(ts.filter(tsProject, { referencedFrom: ['_main.ts'] }))
    //        //.pipe(concat('main.js'))
    //        //.pipe(replace(/'scripts\/_/, '\'js/'))
    //        //.pipe(gulpif(!argv.production, sourcemaps.write()))
    //        .pipe(gulp.dest(Config.paths.dest + '/js/es6'));

    return merge(
        tsResult.js
            .pipe(ts.filter(tsProject, { referencedFrom: ['main/init.ts'] }))
            .pipe(concat('main.js'))
            .pipe(replace(/'scripts\/_/, '\'js/'))
            .pipe(gulpif(!argv.production, sourcemaps.write()))
            .pipe(gulp.dest(Config.paths.dest + '/js')),
        tsResult.js
            .pipe(ts.filter(tsProject, { referencedFrom: ['extras/init.ts'] }))
            .pipe(concat('extras.js'))
            .pipe(gulpif(!argv.production, sourcemaps.write()))
            .pipe(gulp.dest(Config.paths.dest + '/js')),
        tsResult.dts.pipe(gulp.dest(Config.paths.dest + '/declarations')),
        gulp.src('app/declarations/**/*d.ts')
            .pipe(gulp.dest(Config.paths.dest + '/declarations'))
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

var systemjsConfig = {
    // baseURL: where to find library code
    baseURL: path.resolve('bower_components'),
    // map module aliases to their locations
    map: {
        //angular2: '../lib'
        //angular2: '../node_modules/angular2/es6/dev'
        //angular2: '../node_modules/angular2',
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
        'extras/*': path.resolve('.tmp/js/es6/extras/*.js')
        //'babel': '../node_modules/babel-core/browser.js',
        //angular2: '../node_modules/angular2'
    }
    //bundles: {
    //    main: ['MyAppComponent', 'Test1'],
    //    extras: ['Extras', 'Test2', 'Test3']
    //},
    // opt in to Babel for transpiling over Traceur
    //transpiler: 'babel',
    //babelOptions: {
    //    blacklist: ['useStrict'],
    //    sourceMaps: true
    //    //inputSourceMap:
    //}
    //traceurOptions: {
    //}
};

gulp.task('scripts', ['typescript', 'scripts:lib'], function() {
    var Builder = require('systemjs-builder');

    //Builder.build('.tmp/main', systemjsConfig, 'app/.out/sys-build-test.js')

    var builder = new Builder(systemjsConfig);

    //builder.build('main/**/* - angular2/angular2', Config.paths.dest + '/js/myModule.js');

    //Promise.all([builder.trace('main/**/*'), //  - angular2/angular2
    //             builder.trace('extras/**/*')])
    //    .then(function(trees) {
    //        //var commonTree = builder.intersectTrees(trees[0], trees[1]);
    //        return Promise.all([
    //            //builder.buildTree(commonTree,
    //            //                Config.paths.dest + '/js/shared-bundle.js'),
    //            builder.buildTree(trees[0], //builder.subtractTrees(trees[0], commonTree),
    //                            Config.paths.dest + '/js/main.js'),
    //            builder.buildTree(trees[1], //builder.subtractTrees(trees[1], commonTree),
    //                            Config.paths.dest + '/js/extras.js')
    //        ]);
    //    });

        //builder.build('_main - angular2/angular2',
        //        Config.paths.dest + '/js/main.js'
        //        //,{ minify: true, sourceMaps: true, config: cfg
        //        // lowResSourceMaps: true
        //        // mangle: false, globalDefs: { DEBUG: false } }}
        //)
        //.then(function(output) {
        //    // if outFile is left out, does in-memory compile
        //    //    output.source;    // generated bundle source
        //    //    output.sourceMap; // generated bundle source map
        //    //    output.modules;   // array of module names defined in the bundle
        //    //}
        //    console.log('Build complete');
        //})
        //.catch(function(err) {
        //    console.log('Build error');
        //    console.log(err);
        //});
});
