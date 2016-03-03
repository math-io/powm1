'use strict';

// MODULES //

var tape = require( 'tape' );
var abs = require( 'math-abs' );
var expm1 = require( 'math-float64-expm1' );
var ln = require( 'math-ln' );
var powm1 = require( './../lib' );


// FIXTURES //

var data = JSON.parse( require( './fixtures/output.json' ).program_message );
var x = data.x;
var y = data.y;
var expected = data.expected;


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof powm1 === 'function', 'main export is a function' );
	t.end();
});

tape( 'the function accepts two parameters: a base and an exponent', function test( t ) {
	t.equal( powm1.length, 2, 'arity is 2' );
	t.end();
});

tape( 'the function evaluates the exponential function minus 1 (tested against Boost)', function test( t ) {
	var delta;
	var tol;
	var v;
	var i;

	for ( i = 0; i < x.length; i++ ) {
		v = powm1( x[ i ], y[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 1e-14 * Math.max( 1, abs( v ), abs( expected[ i ] ) );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + 'y: ' + y[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
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
