'use strict';

var powm1 = require( './../lib' );

var x;
var y;
var z;
var i;

for ( i = 0; i < 100; i++ ) {
	x = Math.round( Math.random()*10 );
	y = Math.round( Math.random()*10 ) - 5;
	z = powm1( x, y );
	console.log( '%d^%d - 1 = %d', x, y, z );
}
