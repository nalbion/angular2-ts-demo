/// <reference path="../../declarations/angular2/angular2.d.ts" />
/// <reference path="../../node_modules/typescript/bin/lib.es6.d.ts" />
import {bootstrap} from 'angular2/angular2';
import {MyAppComponent} from './main/my-app-component';

declare var System;

console.info('file: main.ts');

export function init() {
    console.info('inner main');

    bootstrap(MyAppComponent);

    setTimeout(function () {
        console.info('[main] running initExtras (3 seconds later)');

        System.config({
            paths: {
                '*': 'js/*.js'
            }
        });
        var extras = System.import('extras').then(function(extras) {
            extras.initExtras();
        });

        console.info('main timeout handler complete');
    }, 3000);
}

