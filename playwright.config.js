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

		{
			name: 'webkit',
			use: {
				...devices[ 'Desktop Safari' ],
			},
		},

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: {
				...devices[ 'Pixel 5' ],
			},
		},
		{
			name: 'Mobile Safari',
			use: {
				...devices[ 'iPhone 12' ],
			},
		},
	],

	reporter: process.env.CI ? 'dot' : [ [ 'html', { open: 'never' } ] ],
	retries: process.env.CI ? 2 : 0,
	testDir: './src',
	testMatch: '**/src/**/**/*.playwright.spec.js',
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
