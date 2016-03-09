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
* FUNCTION: powm1( x, y )
*	Evaluates `xʸ - 1`.
*
* @param {Number} x - base
* @param {Number} y - exponent
* @returns {Number} xʸ - 1
*/
function powm1( x, y ) {
	var p;
	if (
		x !== x ||
		y !== y
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		return -1.0;
	}
	if ( x > 0 ) {
		if (
			abs( y*(x-1.0) ) < 0.5 ||
			abs( y ) < 0.2
		) {
			// No good/quick approximation for ln(x)*y, so we have to evaluate...
			p = ln( x ) * y;
			if ( p < 0.5 ) {
				return expm1( p );
			}
		}
	} else {
		if ( trunc( y ) !== y ) {
			return NaN; // exponentiation yields a complex result
		}
		// If `y` is even, recognize that `(-x)**y == (x)**y`...
		if ( y%2 === 0 ) {
			return powm1( -x, y );
		}
	}
	return pow( x, y ) - 1;
} // end FUNCTION powm1()


// EXPORTS //

module.exports = powm1;
