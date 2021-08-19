module.exports = {
	preset: 'jest-puppeteer',
	rootDir: '../../',
	testMatch: [ '**/performance/tests/*.test.js' ],
	setupFilesAfterEnv: [
		'<rootDir>.dev/performance/tests/config/setup-performance-test.js',
		// '<rootDir>.dev/performance/tests/config/setup-test-framework.js',
		'@wordpress/jest-console',
		'@wordpress/jest-puppeteer-axe',
		'expect-puppeteer',
		// 'puppeteer-testing-library/extend-expect',
	],
	transformIgnorePatterns: [
		'/node_modules/',
		'scripts/config/puppeteer.config.js',
	],
	reporters: [ 'default', '<rootDir>.dev/performance/tests/config/performance-reporter.js' ],
};
