# Simple Angular 2 app written in TypeScript

The point of this application was to build a simple application which:

- Creates a simple Angular 2.0 Component
- Uses Gulp to compile TypeScript down to ES5
- Compiles multiple `.ts` files into 2 `.js` files - `main.js` and `extras.js`
- Loads `main.js` from `index.html` and then `extras.js` asynchronously when required. 

## Use latest TypeScript compiler
TypeScript 1.5 beta will include everything you need. Until that is released,
we use a GitHub reference to the latest alpha.

    $ npm install -g mhegazy/typescript#v1.5-beta
    
`npm install` from mhegazy hung for me, so I just installed Microsoft's alpha, 
then downloaded mhegazy's version as a zip file from [GitHub](https://github.com/mhegazy/TypeScript/archive/v1.5-beta.zip).  
I then had to make tsc and tsserver executable:
 
    chmod +x /usr/local/lib/node_modules/typescript/bin/tsc
    chmod +x /usr/local/lib/node_modules/typescript/bin/tsserver

## Gulp

The following Gulp tasks are supported:

    gulp build --production   # optionally build in production mode
    
    # Don't open another browser/tab if you already have one open
    gulp serve --dont-open
    
    gulp watch 

    
## Browser Console Logs

    file: extras.ts
    file: my-app-component.ts
    file: main.ts
    inner main
    constructor: MyAppComponent
    [main] running initExtras (3 seconds later)
    [extras] initialising...
    [extras] constructor - Test2
    [extras] constructor - Test3
    calling test3.foo(): bar
    initialised extras!
    main timeout handler complete