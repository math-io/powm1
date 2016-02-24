'use strict';

// MODULES //

var tape = require( 'tape' );
var expm1 = require( 'math-float64-expm1' );
var ln = require( 'math-ln' );
var powm1 = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof powm1 === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function accepts two parameters: a base and an exponent', function test( t ) {
	t.equal( powm1.length, 2, 'arity is 2' );
	t.end();
});

tape( 'the function evaluates the exponential function minus 1', function test( t ) {
	t.equal( powm1( 2, 3 ), 7, '2^3 - 1 = 7' );
	t.equal( powm1( -5, 3 ), -126, '(-5)^3 - 1 = -126' );
	t.end();
});

tape( 'the function evaluates `xʸ - 1` as expm1( ln(x) * y ) for sufficiently small x or y', function test( t ) {
	t.equal( powm1( 4, 1e-3 ), expm1( ln(4) * 1e-3 ), '4**(1e-3) = exp( ln(4) * 1e-3 )' );
	t.end();
});

tape( 'the function returns `NaN` if asked to raise a negative number to a exponent whose absolute value is greater than 0 but less than 1', function test( t ) {
	var val;

	val = powm1( -125, 1/3 );
	t.ok( val !== val, 'returns NaN' );

	val = powm1( -16, -1/2 );
	t.ok( val !== val, 'returns NaN' );

	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN` for the exponent', function test( t ) {
	var val = powm1( -3, NaN );
	t.ok( val !== val, 'returns NaN' );
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN` for the base', function test( t ) {
	var val = powm1( NaN, 5 );
	t.ok( val !== val, 'returns NaN' );
	t.end();
});
