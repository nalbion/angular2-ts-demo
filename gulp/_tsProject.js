module.exports = {
    typescript: require('typescript'),
    sourceRoot: 'app/scripts',
    sortOutput: true,
    declarationFiles: true,
    noExternalResolve: false,
    //emitDecoratorMetadata: true,
    //declaration: false,
    //noImplicitAny: false,
    //removeComments: true,
    //noLib: false,
    // use SystemJS to build your files to es5 with System.register wrapper
    //target: 'ES6'
    target: 'ES5',
    module: 'amd'       // commonjs (for Node) or amd (eg RequireJS for web)
};