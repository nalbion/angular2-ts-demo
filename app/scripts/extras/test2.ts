/// <reference path="./test3.ts" />
class Test2 {
    constructor() {
        console.info('[extras] constructor - Test2');
        var test3 = new Test3();
        console.info('calling test3.foo():', test3.foo());
    }
}