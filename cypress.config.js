const { defineConfig } = require( 'cypress' );

module.exports = defineConfig( {
	chromeWebSecurity: false,
	defaultCommandTimeout: 120000,
	e2e: {
		setupNodeEvents( on, config ) {
			return require( './.dev/tests/cypress/plugins/index.js' )( on, config );
		},
		specPattern: './/**/*.cypress.js',
		supportFile: '.dev/tests/cypress/support/commands.js',
	},
	env: {
		testURL: 'http://localhost:8889',
		wpPassword: 'password',
		wpUsername: 'admin',
	},
	fixturesFolder: 'languages',
	pageLoadTimeout: 120000,
	projectId: 'sovnn2',
	retries: {
		openMode: 0,
		runMode: 0,
	},
	screenshotsFolder: '.dev/tests/cypress/screenshots',
	viewportHeight: 1440,
	viewportWidth: 2560,
} );
