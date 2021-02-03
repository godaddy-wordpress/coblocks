// Shim for requestIdleCallback and cancelIdleCallback
window.requestIdleCallback = window.requestIdleCallback ||
function( callback ) {
	return setTimeout( () => {
		callback( {
			didTimeout: true,
			timeRemaining: () => {
				return 1;
			},
		} );
	}, 0 );
};

window.cancelIdleCallback = window.cancelIdleCallback ||
function( id ) {
	clearTimeout( id );
};
