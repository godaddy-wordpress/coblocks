// @ts-check
const { devices } = require( '@playwright/test' );

const config = {
	expect: {
		timeout: 5000,
	},
	forbidOnly: !! process.env.CI,
	fullyParallel: true,
	globalSetup: require.resolve( './.dev/tests/playwright/global-setup' ),
	outputDir: './.dev/tests/playwright/test-results/',
	projects: [
		{
			name: 'chromium',
			use: {
				...devices[ 'Desktop Chrome' ],
			},
		},

		{
			name: 'firefox',
			use: {
				...devices[ 'Desktop Firefox' ],
			},
		},

		/**
		 * WordPress version 6.1+ throws and error with the version of Webkit
		 * that Playwright currently utilizes. Likely this will be resolved when
		 * Gutenberg finishes migrating to Playwright, and then we can use the
		 * wordpress/e2e-test-utils-playwright package from Core.
		 */
		// {
		// 	name: 'webkit',
		// 	use: {
		// 		...devices[ 'Desktop Safari' ],
		// 	},
		// },
	],

	reporter: process.env.CI ? 'dot' : [ [ 'html', { open: 'never' } ] ],
	retries: process.env.CI ? 2 : 0,
	testDir: './src',
	testMatch: '**/src/**/**/*.playwright.js',
	timeout: 30 * 1000,
	use: {
		actionTimeout: 0,
		baseURL: 'http://localhost:8889',
		headless: true,
		storageState: './.dev/tests/playwright/storage-state.json',
		trace: 'on-first-retry',
		video: 'on-first-retry',
	},
};

module.exports = config;
