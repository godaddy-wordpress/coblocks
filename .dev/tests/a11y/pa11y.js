/* eslint no-console: 0 */
'use strict';

const pa11y = require( 'pa11y' );
const chalk = require( 'chalk' );
const packageJson = require( '../../../package.json' );
const testingUrls = packageJson.testing.urls;

// Initialize variables
let url;
let key;

// Loop through all the URLs and set the test destination
if ( process.argv[ 2 ] ) {
	for ( key in testingUrls ) {
		if ( key === process.argv[ 2 ] ) {
			// Set the testing URL
			if ( packageJson.testing.urls[ key ] !== '' ) {
				url = packageJson.testing.urls[ key ];
			} else {
				// If the URL object exists, but is empty
				console.log( chalk.red.bold( '✘ Error: Please add a URL for ' + key ) );
				console.log( '' );
				process.exit( 1 );
			}
		}
	} // for()
} else {
	url = packageJson.testing.urls.local;
}

// Set up the pa11y config options
const config = {
	standard: packageJson.testing.accessibility.compliance,
	hideElements: '#wpadminbar, #gist5332801 > div > div:nth-child(2)',
	includeWarnings: true,
	rootElement: 'body',
	threshold: 2,
	timeout: 20000,
	userAgent: 'pa11y',
	wait: 2000,
	width: 1280,
	ignore: [
		'notice',
	],
	actions: [
		'screen capture ./.dev/tests/a11y/pa11y-homepage.png',
		'wait for element button[aria-label="Previous"] to be visible',
	],
	log: {
		debug: console.log.bind( console ),
		error: console.error.bind( console ),
		info: console.log.bind( console ),
	},
	chromeLaunchConfig: {
		ignoreHTTPSErrors: true,
		executablePath: '/usr/bin/google-chrome',
	},
};

/**
 * Run Accessibility Test
 *
 * @param {string}   url    test URL
 * @param {Object}   config test configuration option
 * @param {Function} [cb]   Callback
 * @return {Object} test results
 */
pa11y( url, config, ( error, results ) => {
	if ( error ) {
		return console.error( error );
	} else if ( results.issues.length ) {
		console.log( results );
	} else {
		console.log( chalk.green.bold( '✔ All accessibility tests have passed.' ) );
	}
} );
