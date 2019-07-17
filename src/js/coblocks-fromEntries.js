// Act as polyfill for Object.fromEntries for IE11.
export default function fromEntries( iterable ) {
	return [ ...iterable ].reduce(
		( obj, { 0: key, 1: val } ) => Object.assign( obj, { [ key ]: val } ),
		{}
	);
}
