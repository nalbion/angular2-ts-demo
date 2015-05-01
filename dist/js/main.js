var __decorate = this.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/angular2'], function (require, exports, angular2_1) {
    var Main;
    (function (Main) {
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
    })(Main || (Main = {}));
});

console.info('test 1');

define(["require", "exports", 'js/extras'], function (require, exports, _extras_1) {
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
        _extras_1.initExtras();
        console.info('main timeout handler complete');
    }, 3000);
});
