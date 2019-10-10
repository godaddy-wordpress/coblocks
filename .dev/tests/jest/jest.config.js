module.exports = {
	rootDir: '../../../',
	testMatch: ['**/__tests__/**/*.js', '**/?(*.)(spec|test).js', '**/test/*.js'],
	testPathIgnorePatterns: ['/.git/', '/node_modules/', '<rootDir>/build/'],
	setupFiles: [ '<rootDir>/.dev/tests/jest/setup-globals.js' ],
	moduleNameMapper: {
		'\\.(scss|css|less)$': '<rootDir>/.dev/tests/jest/styleMock.js',
	},
};
