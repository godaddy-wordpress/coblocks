module.exports = {
	testRunner: 'jest-circus/runner',
	preset: '@wordpress/jest-preset-default',
	rootDir: '../../../',
	testMatch: [ '<rootDir>/src/**/test/*.spec.js' ],
	setupFilesAfterEnv: [ '<rootDir>/.dev/tests/jest/setup-globals.js' ],
	reporters: [ 'default' ],
	moduleNameMapper: {
		'@godaddy-wordpress/coblocks-icons': '<rootDir>/.dev/tests/jest/empty-class.js',
	},
	collectCoverageFrom: [
		'<rootDir>/src/**/*.js',
		'!<rootDir>/src/**/test/*.js',
	],
};
