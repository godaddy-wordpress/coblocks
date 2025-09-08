module.exports = ( on ) => {
	require( 'cypress-log-to-output' ).install( on, ( type, event ) => event.level === 'error' || event.type === 'error' );

	// Simple task to print diagnostic info from specs into the Node process output
	on( 'task', {
		log( message ) {
			// eslint-disable-next-line no-console
			console.log( '[cy.task log]', typeof message === 'object' ? JSON.stringify( message, null, 2 ) : message );
			return null;
		},
	} );
};
