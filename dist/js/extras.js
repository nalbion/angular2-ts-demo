var Test3 = (function () {
    function Test3() {
        console.info('test 3');
    }
    Test3.prototype.foo = function () {
        return 'bar';
    };
    return Test3;
})();

/// <reference path="test3.ts" />
var Test2 = (function () {
    function Test2() {
        console.info('test 2');
        var test3 = new Test3();
        console.info('test3.foo():', test3.foo());
    }
    return Test2;
})();

define(["require", "exports"], function (require, exports) {
    /// <reference path="extras/test2.ts" />
    function initExtras() {
        console.info('initialising extras...');
        var test2 = new Test2();
        console.info('initialised extras!');
    }
    exports.initExtras = initExtras;
});
