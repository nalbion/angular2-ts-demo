/// <reference path="../../../declarations/angular2/angular2.d.ts" />
import {Component, View} from 'angular2/angular2';

console.info('file: my-app-component.ts');

@Component({
    selector: 'my-app'
})
@View({
    template: '<h1>Hello {{ foo }}!</h1>'
})
export class MyAppComponent {
    foo:string;

    constructor() {
        console.info('constructor: MyAppComponent');
        this.foo = 'World';
    }
}