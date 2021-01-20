const elems = document.querySelectorAll( '.coblocks-animate' );

if ( 'IntersectionObserver' in window ) {
	const observer = new IntersectionObserver( ( entries ) => {
		entries.forEach( ( entry ) => {
			if ( ! entry.isIntersecting ) {
				return;
			}

			entry.target.classList.add( entry.target.dataset.coblocksAnimation );
			observer.unobserve( entry.target );
		} );
	}, {
		threshold: [ 0.15 ],
	} );

	elems.forEach( ( elem ) => {
		observer.observe( elem );
	} );
} else {
	// Disable animations if IntersectionObserver is not available.
	elems.forEach( ( node ) => {
		node.classList.remove( 'coblocks-animate' );
		delete ( node.dataset.coblocksAnimation );
	} );
}
