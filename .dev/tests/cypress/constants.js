const { readFileSync } = require( 'fs' );
const { hasProjectFile } = require( '@wordpress/scripts/utils' );

// Default login for Docker environment.
let wpCreds = {
	testURL: 'http://localhost:8889',
	wpUsername: 'admin',
	wpPassword: 'password',
};

const configFilePath = '.dev/tests/cypress/wp_creds.json';

if ( hasProjectFile( configFilePath ) ) {
	wpCreds = JSON.parse( readFileSync( configFilePath ) );
}

export default wpCreds;
