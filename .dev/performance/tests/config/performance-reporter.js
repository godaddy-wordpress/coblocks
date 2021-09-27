/**
 * External dependencies
 */
const { readFileSync, existsSync } = require( 'fs' );
const path = require( 'path' );
const chalk = require( 'chalk' );

function average( array ) {
	return array.reduce( ( a, b ) => a + b ) / array.length;
}

function round( number, decimalPlaces = 2 ) {
	const factor = Math.pow( 10, decimalPlaces );
	return Math.round( number * factor ) / factor;
}

const title = chalk.bold;
const success = chalk.bold.green;

class PerformanceReporter {
	onTestResult( test ) {
		const dirname = path.dirname( test.path );
		const basename = path.basename( test.path, '.js' );
		const filepath = path.join( dirname, basename + '.results.json' );

		if ( ! existsSync( filepath ) ) {
			return;
		}

		const results = readFileSync( filepath, 'utf8' );
		const {
			load,
			type,
			focus,
			inserterOpen,
			inserterHover,
			inserterSearch,
		} = JSON.parse( results );

		if ( load && load.length ) {
			// eslint-disable-next-line no-console
			console.log( `
 ${ title( 'Loading Time:' ) }
 Average time to load: ${ success( round( average( load ) ) + 'ms' ) }` );
		}

		if ( type && type.length ) {
			// eslint-disable-next-line no-console
			console.log( `
 ${ title( 'Typing Performance:' ) }
 Average time to type character: ${ success( round( average( type ) ) + 'ms' ) }
 Slowest time to type character: ${ success(
		round( Math.max( ...type ) ) + 'ms'
	) }
 Fastest time to type character: ${ success(
		round( Math.min( ...type ) ) + 'ms'
	) }` );
		}

		if ( focus && focus.length ) {
			// eslint-disable-next-line no-console
			console.log( `
 ${ title( 'Block Selection Performance:' ) }
 Average time to select a block: ${ success( round( average( focus ) ) + 'ms' ) }
 Slowest time to select a block: ${ success(
		round( Math.max( ...focus ) ) + 'ms'
	) }
 Fastest time to select a block: ${ success(
		round( Math.min( ...focus ) ) + 'ms'
	) }` );
		}

		if ( inserterOpen && inserterOpen.length ) {
			// eslint-disable-next-line no-console
			console.log( `
 ${ title( 'Opening Global Inserter Performance:' ) }
 Average time to open global inserter: ${ success(
		round( average( inserterOpen ) ) + 'ms'
	) }
 Slowest time to open global inserter: ${ success(
		round( Math.max( ...inserterOpen ) ) + 'ms'
	) }
 Fastest time to open global inserter: ${ success(
		round( Math.min( ...inserterOpen ) ) + 'ms'
	) }` );
		}

		if ( inserterSearch && inserterSearch.length ) {
			// eslint-disable-next-line no-console
			console.log( `
 ${ title( 'Inserter Search Performance:' ) }
 Average time to type the inserter search input: ${ success(
		round( average( inserterSearch ) ) + 'ms'
	) }
 Slowest time to type the inserter search input: ${ success(
		round( Math.max( ...inserterSearch ) ) + 'ms'
	) }
 Fastest time to type the inserter search input: ${ success(
		round( Math.min( ...inserterSearch ) ) + 'ms'
	) }` );
		}

		if ( inserterHover && inserterHover.length ) {
			// eslint-disable-next-line no-console
			console.log( `
 ${ title( 'Inserter Block Item Hover Performance:' ) }
 Average time to move mouse between two block item in the inserter: ${ success(
		round( average( inserterHover ) ) + 'ms'
	) }
 Slowest time to move mouse between two block item in the inserter: ${ success(
		round( Math.max( ...inserterHover ) ) + 'ms'
	) }
 Fastest time to move mouse between two block item in the inserter: ${ success(
		round( Math.min( ...inserterHover ) ) + 'ms'
	) }` );
		}

		// eslint-disable-next-line no-console
		console.log( '' );
	}
}

module.exports = PerformanceReporter;
