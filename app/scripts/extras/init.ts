/// <reference path="./test2.ts" />
console.info('file: extras/init.ts');

export function initExtras() {
    console.info('initialising extras...');
    var test2 = new Test2();
    console.info('initialised extras!');
}