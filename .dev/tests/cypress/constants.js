const fs = require( 'fs' );
const path = require( 'path' );

// Default login for Docker environment.
let wpCreds = {
	testURL: 'http://localhost:8889',
	wpUsername: 'admin',
	wpPassword: 'password',
};

try {
	const configFilePath = path.resolve( process.cwd(), 'wp_creds.json' );

	fs.accessSync( configFilePath, fs.constants.R_OK );
	wpCreds = require( configFilePath );
} catch ( err ) {}

export default wpCreds;
