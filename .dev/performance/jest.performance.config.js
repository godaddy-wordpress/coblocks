module.exports = {
	testRunner: 'jest-circus/runner',
	globalSetup: 'jest-environment-puppeteer/setup',
	globalTeardown: 'jest-environment-puppeteer/teardown',
	testEnvironment: 'jest-environment-puppeteer',
	rootDir: '../../',
	testMatch: [ '**/performance/tests/*.test.js' ],
	setupFilesAfterEnv: [
		'<rootDir>.dev/performance/tests/config/setup-performance-test.js',
		'@wordpress/jest-console',
		'@wordpress/jest-puppeteer-axe',
		'expect-puppeteer',
	],
	transformIgnorePatterns: [
		'/node_modules/',
	],
	reporters: [ 'default', '<rootDir>.dev/performance/tests/config/performance-reporter.js' ],
};
