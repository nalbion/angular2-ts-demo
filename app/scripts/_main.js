var __decorate = this.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
/// <reference path="../declarations/angular2/angular2.d.ts" />
/// <reference path="main/my-app-component.ts" />
/// <reference path="main/test1.ts" />
var angular2_1 = require('angular2/angular2');
//import {Extras} from 'scripts/_extras';
var _extras_1 = require('scripts/_extras');
var MyAppComponent = (function () {
    function MyAppComponent() {
        this.name = 'World';
    }
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            template: '<h1>Hello {{ name }}!</h1>'
        })
    ], MyAppComponent);
    return MyAppComponent;
})();
angular2_1.bootstrap(MyAppComponent);
setTimeout(function () {
    console.info('main - running initExtras (3 seconds later)');
    _extras_1.initExtras();
    console.info('main timeout handler complete');
}, 3000);
//# sourceMappingURL=_main.js.map