/// <reference path="../../declarations/angular2/angular2.d.ts" />
/// <reference path="../../../node_modules/typescript/bin/lib.es6.d.ts" />

//import {initExtras} from '../extras/init';
//
console.info('file: main/init.ts');
//
//export function init() {
//    console.info('inner main');
//
//    setTimeout(function () {
//        console.info('main - running initExtras (3 seconds later)');
//        initExtras();
//        console.info('main timeout handler complete');
//    }, 3000);
//}


import {Component, View, bootstrap} from 'angular2/angular2';
@Component({
    selector: 'my-app'
})
@View({
    template: '<h1>Hello {{ foo }}!</h1>'
})
class MyAppComponent {
    foo:string;

    constructor() {
        console.info('constructor: MyAppComponent');
        this.foo = 'World';
    }
}

bootstrap(MyAppComponent);