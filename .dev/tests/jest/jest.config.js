const defaultConfig = require( '@wordpress/scripts/config/jest-unit.config' );

module.exports = {
	...defaultConfig,

	rootDir: '../../../',
	testMatch: [ '<rootDir>/src/**/test/*.spec.js' ],
	setupFilesAfterEnv: [ '<rootDir>/.dev/tests/jest/setup-globals.js' ],
	reporters: [ 'default' ],
};
