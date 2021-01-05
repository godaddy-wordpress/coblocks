module.exports = ( on ) => {
	on( 'task', {
		log( message ) {
			// eslint-disable-next-line no-console
			console.log( message );
			return null;
		},
	} );
};
