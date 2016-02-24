powm1
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes `xʸ - 1`.

When exponent `y` is very small, or when the base `x` is close to 1, using this function is more accurate than `Math.pow( x, y ) - 1`.

## Installation

``` bash
$ npm install math-powm1
```


## Usage

``` javascript
var powm1 = require( 'math-powm1' );
```

#### powm1( x, y )

Computes `xʸ - 1`.

``` javascript
var val = powm1( 2, 3 );
// returns 7

val = powm1( 4, 0.5 );
// returns 1

val = powm1( 100, 0 );
// returns 0

val = powm1( Math.PI, 5 );
// returns ~305.0197

val = powm1( NaN, 3 );
// returns NaN

val = powm1( 5, NaN );
// returns NaN
```


## Examples

``` javascript
var powm1 = require( 'math-powm1' );

var b;
var x;
var i;

for ( i = 0; i < 100; i++ ) {
	b = Math.round( Math.random()*10 );
	x = Math.round( Math.random()*10 ) - 5;
	console.log( '%d^%d = %d', b, x, powm1( b, x ) );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-powm1.svg
[npm-url]: https://npmjs.org/package/math-powm1

[build-image]: http://img.shields.io/travis/math-io/powm1/master.svg
[build-url]: https://travis-ci.org/math-io/powm1

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/powm1/master.svg
[coverage-url]: https://codecov.io/github/math-io/powm1?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/powm1.svg
[dependencies-url]: https://david-dm.org/math-io/powm1

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/powm1.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/powm1

[github-issues-image]: http://img.shields.io/github/issues/math-io/powm1.svg
[github-issues-url]: https://github.com/math-io/powm1/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[exponential-function]: https://en.wikipedia.org/wiki/Exponential_function
