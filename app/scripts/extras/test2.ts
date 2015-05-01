/// <reference path="test3.ts" />
class Test2 {
    constructor() {
        console.info('test 2');
        var test3 = new Test3();
        console.info('test3.foo():', test3.foo());
    }
}