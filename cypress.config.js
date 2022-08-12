const { defineConfig } = require( 'cypress' );
const { postsPrepare } = require( './src/blocks/posts/test/posts-prepare' );
const { gifPrepare } = require( './src/blocks/gif/test/gif-prepare' );

module.exports = defineConfig( {
	e2e: {
		chromeWebSecurity: false,
		defaultCommandTimeout: 120000,
		env: {
			testURL: 'http://localhost:8889',
			wpPassword: 'password',
			wpUsername: 'admin',
		},
		experimentalInteractiveRunEvents: true,
		fixturesFolder: 'languages',
		migrationPostList: {
			sample: 'sample',
		},
		pageLoadTimeout: 120000,
		projectId: 'sovnn2',
		retries: {
			openMode: 0,
			runMode: 0,
		},
		screenshotsFolder: '.dev/tests/cypress/screenshots',
		setupNodeEvents( on, config ) {
			require( 'cypress-log-to-output' ).install( on, ( type, event ) => event.level === 'error' || event.type === 'error' );
			return ( async () => {
				config.migrationPostList = {
					gifPrepare: await gifPrepare(),
					posts: await postsPrepare(),
				};
				return config;
			} )();
		},
		specPattern: '**/*.cypress.js',
		supportFile: '.dev/tests/cypress/support/commands.js',
		viewportHeight: 1440,
		viewportWidth: 2560,
	},
} );
