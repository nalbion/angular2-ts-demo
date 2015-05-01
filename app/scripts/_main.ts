/// <reference path="main/my-app-component.ts" />
/// <reference path="main/test1.ts" />
//import {Extras} from 'scripts/_extras';
import {initExtras} from 'scripts/_extras';

//@Component({
//    selector: 'my-app'
//})
//@View({
//    template: '<h1>Hello {{ name }}!</h1>'
//})
//class MyAppComponent {
//    name:string;
//
//    constructor() {
//        this.name = 'World';
//    }
//}
//
//bootstrap(MyAppComponent);

setTimeout(function () {
    console.info('main - running initExtras (3 seconds later)');
    initExtras();
    console.info('main timeout handler complete');
}, 3000);