// Read the test results from master and current branch at ~/project/[branch]-median-results.json files
// combine them into a single results array with structure results[ testSuite ][ branch ] = results.json
const fs = require( 'fs' );
const path = require( 'path' );
const { mapValues, merge } = require( 'lodash' );

/**
 * Internal dependencies
 */
const { log } = require( './logger' );

/**
 * Get the performance test results and output it a table
 *
 * @param {string} branch The Branch name
 */
async function getPerformanceTestResults( branch ) {
	const testSuites = [ 'post-editor' ];
	const masterData = fs.readFileSync( 'master-median-results.json' );
	const currentData = fs.readFileSync( branch + '-median-results.json' );
	const results = merge( JSON.parse( masterData ), JSON.parse( currentData ) );

	for ( const testSuite of testSuites ) {
		const getDifference = ( key ) => {
			const valueArray = Object.keys( results[ testSuite ] );

			const x = results[ testSuite ][ valueArray[ 0 ] ][ key ],
				y = results[ testSuite ][ valueArray[ 1 ] ][ key ];

			return parseFloat( ( ( ( y - x ) / x ) * 100 ).toFixed( 2 ) );
		};

		// Computing difference.
		const difference = mapValues(
			{
				load: getDifference( 'load' ),
				type: getDifference( 'type' ),
				minType: getDifference( 'minType' ),
				maxType: getDifference( 'maxType' ),
				focus: getDifference( 'focus' ),
				minFocus: getDifference( 'minFocus' ),
				maxFocus: getDifference( 'maxFocus' ),
				inserterOpen: getDifference( 'inserterOpen' ),
				minInserterOpen: getDifference( 'minInserterOpen' ),
				maxInserterOpen: getDifference( 'maxInserterOpen' ),
				inserterSearch: getDifference( 'inserterSearch' ),
				minInserterSearch: getDifference( 'minInserterSearch' ),
				maxInserterSearch: getDifference( 'maxInserterSearch' ),
				inserterHover: getDifference( 'inserterHover' ),
				minInserterHover: getDifference( 'minInserterHover' ),
				maxInserterHover: getDifference( 'maxInserterHover' ),
			}
		);

		results[ testSuite ][ 'change %' ] = difference;
	}

	// 5- Formatting the results.
	log( '\n>> 🎉 Results.\n' );
	for ( const testSuite of testSuites ) {
		/** @type {Record<string, Record<string, string>>} */
		const invertedResult = {};
		Object.entries( results[ testSuite ] ).reduce(
			( acc, [ key, val ] ) => {
				for ( const entry of Object.keys( val ) ) {
					const suffix = key === 'change %' ? ' %' : ' ms';
					if ( ! acc[ entry ] && isFinite( val[ entry ] ) ) {
						acc[ entry ] = {};
					}
					if ( isFinite( val[ entry ] ) ) {
						acc[ entry ][ key ] = val[ entry ] + suffix;
					}
				}
				return acc;
			},
			invertedResult
		);
		// eslint-disable-next-line no-console
		console.table( invertedResult );

		const resultsFilename = testSuite + '-performance-results.json';
		fs.writeFileSync(
			path.resolve( __dirname, '../../../', resultsFilename ),
			invertedResult
		);
	}
}

module.exports = {
	getPerformanceTestResults,
};
