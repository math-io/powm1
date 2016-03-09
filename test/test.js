'use strict';

// MODULES //

var tape = require( 'tape' );
var abs = require( 'math-abs' );
var expm1 = require( 'math-float64-expm1' );
var ln = require( 'math-ln' );
var powm1 = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/output.json' );
data = JSON.parse( data.program_message );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof powm1, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function accepts two parameters: a base and an exponent', function test( t ) {
	t.equal( powm1.length, 2, 'arity is 2' );
	t.end();
});

tape( 'if provided a base equal to `0`, the function always returns `-1`', function test( t ) {
	var i;
	for ( i = 0; i < 100; i++ ) {
		t.equal( powm1( 0, i ), -1, 'returns -1' );
		t.equal( powm1( 0, Math.random()*10-5 ), -1, 'returns -1' );
	}
	t.end();
});

tape( 'the function evaluates `xʸ - 1` (Boost)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var v;
	var i;

	x = data.x;
	y = data.y;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = powm1( x[ i ], y[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 1e-15 * Math.max( 1, abs( v ), abs( expected[ i ] ) );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + 'y: ' + y[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function evaluates `xʸ - 1`', function test( t ) {
	t.equal( powm1( 2, 3 ), 7, '2^3-1 = 7' );
	t.equal( powm1( -5, 3 ), -126, '(-5)^3-1 = -126' );
	t.end();
});

tape( 'the function evaluates `xʸ - 1` as expm1( ln(x) * y ) for sufficiently small x or y', function test( t ) {
	var expected;
	var actual;

	expected = expm1( ln(4.0)*1e-3 );
	actual = powm1( 4.0, 1e-3 );
	t.equal( actual, expected, '4**(1e-3) = exp( ln(4)*1e-3 )' );

	expected = expm1( ln(1.1)*0.4 );
	actual = powm1( 1.1, 0.4 );
	t.equal( actual, expected, '1.1**(0.4) = exp( ln(1.1)*0.4 )' );

	t.end();
});

tape( 'the function returns `NaN` if provided a negative base and a exponent which is not an integer', function test( t ) {
	var val;

	val = powm1( -125.0, 1/3 );
	t.ok( val !== val, 'returns NaN' );

	val = powm1( -16.0, -1/2 );
	t.ok( val !== val, 'returns NaN' );

	val = powm1( -2.0, -5/4 );
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
