/// <reference path="./test2.ts" />
//import {Test2} from './test2';

console.info('file: extras/init.ts');


export function initExtras() {
    console.info('[extras] initialising...');
    var test2 = new Test2();
    console.info('initialised extras!');
}