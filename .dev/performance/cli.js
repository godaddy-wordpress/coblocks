#!/usr/bin/env node

/**
 * External dependencies
 */
const program = require( 'commander' );

const catchException = ( command ) => {
	return async ( ...args ) => {
		try {
			await command( ...args );
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( error );
			process.exitCode = 1;
		}
	};
};

/**
 * Internal dependencies
 */
const { runPerformanceTests } = require( './index.js' );

program
	.command( 'performance-tests [branches...]' )
	.alias( 'perf' )
	.option( '-c, --ci', 'Run in CI (non interactive)' )
	.option(
		'--tests-branch <branch>',
		"Use this branch's performance test files"
	)
	.option(
		'--wp-version <version>',
		'Specify a WordPress version on which to test all branches (Not yet implemented in CoBlocks)'
	)
	.description(
		'Runs performance tests on two separate branches and outputs the result'
	)
	.action( catchException( runPerformanceTests ) );

program.parse( process.argv );
