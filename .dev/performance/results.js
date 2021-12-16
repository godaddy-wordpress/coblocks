// Read the test results from master and current branch at ~/project/[branch]-median-results.json files
// combine them into a single results array with structure results[ testSuite ][ branch ] = results.json
const fs = require( 'fs' );
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
	const currentData = fs.readFileSync( branch.replace( '/', '-' ) + '-median-results.json' );
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

		let resultsTable = '';
		let headers = '';
		let iteration = 1;
		let dataKey;
		const dataKeys = Object.keys( results[ testSuite ].master );

		for ( const [ key ] of Object.entries( results[ testSuite ] ) ) {
			if ( iteration === 1 ) {
				headers += 'index';
			}

			headers += ' | ' + key;

			if ( iteration === 3 ) {
				headers += '\\r\\n';
				headers += ':--- | :---: | :---: | :---:';
			}

			iteration++;
		}

		// eslint-disable-next-line
		for ( dataKey in dataKeys ) {
			resultsTable += dataKeys[ dataKey ];
			// eslint-disable-next-line
			resultsTable += ` | ${ results[ testSuite ][ 'master' ][ dataKeys[ dataKey ] ] } | ${ results[ testSuite ][ branch ][ dataKeys[ dataKey ] ] } | ${ results[ testSuite ][ 'change %' ][ dataKeys[ dataKey ] ] }%\\r\\n`;
		}

		resultsTable = headers + '\\r\\n' + resultsTable;

		fs.writeFileSync(
			testSuite + '-performance-results.txt',
			resultsTable
		);
	}
}

module.exports = {
	getPerformanceTestResults,
};
