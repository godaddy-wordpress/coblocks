/**
 * Cross-browser compatible module to use Object.fromEntries.
 * Module includes support for IE11, Edge, and Opera.
 *
 * @param {Iterable} iterable The iterable object to recurse.
 */
export default function fromEntries( iterable ) {
	if ( typeof Object.fromEntries === 'undefined' ) {
		return [ ...iterable ].reduce(
			( obj, { 0: key, 1: val } ) => Object.assign( obj, { [ key ]: val } ),
			{}
		);
	}
	return Object.fromEntries( iterable );
}
