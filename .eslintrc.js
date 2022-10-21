/* eslint-disable sort-keys */
module.exports = {
	extends: [ '@godaddy-wordpress/eslint-config' ],

	// CoBlocks config
	env: {
		browser: true,
		'cypress/globals': true,
		jest: true,
	},
	plugins: [
		'cypress',
	],

	// Specific Globals used in CoBlocks
	globals: {
		page: true,
	},

	// Specific Rules for CoBlocks
	// - Before adding a new rule here, see if it could be
	// - added in '@godaddy-wordpress/eslint-config' instead
	rules: {
		// Jest plugin rules
		'jest/expect-expect': [ 'error', {
			assertFunctionNames: [ 'expect', 'cy.get', 'helpers.checkForBlockErrors' ],
		} ],

		// Temp override to slowly change everything
		'sort-imports': [ 'warn', {
			allowSeparatedGroups: true,
			ignoreCase: true,
			memberSyntaxSortOrder: [ 'all', 'single', 'multiple', 'none' ],
		} ],
		'jest/no-conditional-expect': [ 'warn' ],
		'sort-keys': [ 'warn', 'asc', { natural: true } ],
		'react/destructuring-assignment': [ 'warn', 'always' ],
		'react/jsx-sort-props': [ 'warn', { ignoreCase: true } ],
		'jsx-a11y/img-redundant-alt': [ 'warn' ],
	},
	overrides: [
		{
			files: [ 'deprecated.js', 'save.js' ],
			rules: { 'sort-keys': 'warn' },
		},
	],
};
