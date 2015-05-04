import {Test2} from './extras/test2';
console.info('file: extras.ts');

export function initExtras() {
    console.info('[extras] initialising...');
    var test2 = new Test2();
    console.info('initialised extras!');
}