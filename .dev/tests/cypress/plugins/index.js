module.exports = ( on ) => {
	require( 'cypress-log-to-output' ).install( on, ( type, event ) => event.level === 'error' || event.type === 'error' );
};
