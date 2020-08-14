const elems = document.querySelectorAll( '.animate' );

const observer = new IntersectionObserver( ( entries ) => {
	entries.forEach( ( entry ) => {
		if ( ! entry.isIntersecting ) {
			return;
		}

		entry.target.classList.add( 'fadeIn' );
		observer.unobserve( entry.target );
	} );
}, {
	threshold: [ 0.15 ],
} );

elems.forEach( ( elem ) => {
	observer.observe( elem );
} );
