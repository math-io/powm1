'use strict';

/**
* NOTE: the original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/special_functions/powm1.hpp}.
*
* This implementation follows the original, but has been modified for JavaScript.
*/

/**
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var abs = require( 'math-abs' );
var expm1 = require( 'math-float64-expm1' );
var ln = require( 'math-ln' );
var pow = require( 'math-power' );
var trunc = require( 'math-truncate' );


// POWM1 //

/**
* FUNCTION: powm1( b, x )
*	Evaluates `bˣ - 1`.
*
* @param {Number} b - base
* @param {Number} x - exponent
* @returns {Number} bˣ - 1
*/
function powm1( b, x ) {
	var y;
	if (
		b !== b ||
		x !== x
	) {
		return NaN;
	}
	if ( b === 0.0 ) {
		// zero raised to any number is always zero => 0^x - 1 = -1
		return -1.0;
	}
	if ( b < 0 && x%2 === 0 ) {
		// If `x` is even, recognize that `(-b)**x == (b)**x`...
		b = -b;
	}
	if ( b > 0 ) {
		if (
			abs( x*(b-1.0) ) < 0.5 ||
			abs( x ) < 0.2
		) {
			// No good/quick approximation for ln(b)*x, so we have to evaluate...
			y = ln( b ) * x;
			if ( y < 0.5 ) {
				return expm1( y );
			}
		}
	} else {
		if ( trunc( x ) !== x ) {
			// exponentiation would yield a complex result...
			return NaN;
		}
	}
	return pow( b, x ) - 1;
} // end FUNCTION powm1()


// EXPORTS //

module.exports = powm1;
