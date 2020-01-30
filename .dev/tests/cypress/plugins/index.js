const { initPlugin } = require( 'cypress-plugin-snapshots/plugin' );

module.exports = ( on, config ) => {
	initPlugin( on, config );

	on( 'task', {
		log( message ) {
			console.log( message );
			return null
		}
	} );

	return config;
}
