/// <reference path="../../../declarations/angular2/angular2.d.ts" />
/// <reference path="../../../node_modules/typescript/bin/lib.es6.d.ts" />
import {bootstrap} from 'angular2/angular2';
import {initExtras} from '../extras/init';

console.info('file: main/init.ts');
declare var MyAppComponent;             // remove from es6 concat

export function init() {
    console.info('inner main');

    bootstrap(MyAppComponent);

    setTimeout(function () {
        console.info('[main] running initExtras (3 seconds later)');

        initExtras();
        console.info('main timeout handler complete');
    }, 3000);
}

