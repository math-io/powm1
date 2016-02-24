'use strict';

/**
* NOTE: the original C++ code and copyright notice is from the [Boost library]{http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/powm1.hpp}.
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
	if( abs(x) < 1 || abs(y) < 1 ) {
		p = ln( x ) * y;
		if ( abs(p) < 2 ) {
			return expm1( p );
		}
	}
	return pow( x, y ) - 1;
} // end FUNCTION powm1()


// EXPORTS //

module.exports = powm1;
