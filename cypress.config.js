const { defineConfig } = require( 'cypress' );
const { postsPrepare } = require( './src/blocks/posts/test/posts-prepare' );

module.exports = defineConfig( {

	e2e: {
		chromeWebSecurity: false,
		defaultCommandTimeout: 120000,

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
		async setupNodeEvents( on, config ) {
			await on( 'before:run', async ( details ) => {
				return { migrationPostList: await postsPrepare() };
			} );
			require( 'cypress-log-to-output' ).install( on, ( type, event ) => event.level === 'error' || event.type === 'error' );
		},
		specPattern: '**/*.cypress.js',
		supportFile: '.dev/tests/cypress/support/commands.js',
		viewportHeight: 1440,
		viewportWidth: 2560,
	},
	migrationPostList: {},
} );
