module.exports = {
	rootDir: '../../../',
	testMatch: ['**/__tests__/**/*.spec.js', '**/?(*.)(spec|test).js', '**/test/*.spec.js'],
	testPathIgnorePatterns: ['/.git/', '/node_modules/', '<rootDir>/build/'],
	setupFiles: [ '<rootDir>/.dev/tests/jest/setup-globals.js' ],
	moduleNameMapper: {
		'\\.(scss|css|less)$': '<rootDir>/.dev/tests/jest/styleMock.js',
	},
	reporters: [ 'default' ],
};
