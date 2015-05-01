/// <reference path="test3.ts" />
var Test2 = (function () {
    function Test2() {
        console.info('test 2');
        var test3 = new Test3();
        console.info('test3.foo():', test3.foo());
    }
    return Test2;
})();
//# sourceMappingURL=test2.js.map