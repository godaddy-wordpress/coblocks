const fs = require( 'fs' );
const path = require( 'path' );

// Default login for Docker environment.
let wpCreds = {
	testURL: 'http://localhost:8889',
	wpUsername: 'admin',
	wpPassword: 'password',
};

const configFilePath = path.join( process.cwd(), '.dev', 'tests', 'cypress', 'wp_creds.json' );

try {
	wpCreds = JSON.parse( fs.readFileSync( configFilePath ) );
} catch ( error ) { }

export default wpCreds;
