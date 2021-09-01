export function requestIdleCallback( callback, options ) {
	if ( !! window.requestIdleCallback ) {
		return window.requestIdleCallback( callback, options );
	}

	return setTimeout( () => {
		callback( {
			didTimeout: true,
			timeRemaining: () => {
				return 1;
			},
		} );
	}, options.timeout ?? 0 );
}

export function cancelIdleCallback( id ) {
	if ( !! window.cancelIdleCallback ) {
		return window.cancelIdleCallback( id );
	}

	return clearTimeout( id );
}
