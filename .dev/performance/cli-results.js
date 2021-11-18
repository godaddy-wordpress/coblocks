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
const { getPerformanceTestResults } = require( './results.js' );

program
	.action( catchException( getPerformanceTestResults ) );

program.parse( process.argv );
