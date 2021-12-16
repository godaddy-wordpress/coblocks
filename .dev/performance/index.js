/**
 * External dependencies
 */
const fs = require( 'fs' );
const path = require( 'path' );
const { mapValues } = require( 'lodash' );

/**
 * Internal dependencies
 */
const { formats, log } = require( './logger' );
const {
	runShellScript,
	readJSONFile,
	askForConfirmation,
	getRandomTemporaryPath,
} = require( './utils' );
const git = require( './git' );
const config = require( './config' );

/**
 * @typedef WPPerformanceCommandOptions
 * @property {boolean=} ci          Run on CI.
 * @property {string=}  testsBranch The branch whose performance test files will be used for testing.
 * @property {string=}  wpVersion   The WordPress version to be used as the base install for testing.
 */

/**
 * @typedef WPRawPerformanceResults
 * @property {number[]} load           Load Time.
 * @property {number[]} type           Average type time.
 * @property {number[]} focus          Average block selection time.
 * @property {number[]} inserterOpen   Average time to open global inserter.
 * @property {number[]} inserterSearch Average time to search the inserter.
 * @property {number[]} inserterHover  Average time to move mouse between two block item in the inserter.
 */

/**
 * @typedef WPPerformanceResults
 * @property {number=} load              Load Time.
 * @property {number=} type              Average type time.
 * @property {number=} minType           Minium type time.
 * @property {number=} maxType           Maximum type time.
 * @property {number=} focus             Average block selection time.
 * @property {number=} minFocus          Min block selection time.
 * @property {number=} maxFocus          Max block selection time.
 * @property {number=} inserterOpen      Average time to open global inserter.
 * @property {number=} minInserterOpen   Min time to open global inserter.
 * @property {number=} maxInserterOpen   Max time to open global inserter.
 * @property {number=} inserterSearch    Average time to open global inserter.
 * @property {number=} minInserterSearch Min time to open global inserter.
 * @property {number=} maxInserterSearch Max time to open global inserter.
 * @property {number=} inserterHover     Average time to move mouse between two block item in the inserter.
 * @property {number=} minInserterHover  Min time to move mouse between two block item in the inserter.
 * @property {number=} maxInserterHover  Max time to move mouse between two block item in the inserter.
 */

/**
 * Computes the average number from an array numbers.
 *
 * @param {number[]} array
 * @return {number} Average.
 */
function average( array ) {
	return array.reduce( ( a, b ) => a + b, 0 ) / array.length;
}

/**
 * Computes the median number from an array numbers.
 *
 * @param {number[]} array
 * @return {number} Median.
 */
function median( array ) {
	const mid = Math.floor( array.length / 2 ),
		numbers = [ ...array ].sort( ( a, b ) => a - b );
	return array.length % 2 !== 0
		? numbers[ mid ]
		: ( numbers[ mid - 1 ] + numbers[ mid ] ) / 2;
}

/**
 * Rounds and format a time passed in milliseconds.
 *
 * @param {number} number
 * @return {number} Formatted time.
 */
function formatTime( number ) {
	const factor = Math.pow( 10, 2 );
	return Math.round( number * factor ) / factor;
}

/**
 * Curate the raw performance results.
 *
 * @param {WPRawPerformanceResults} results
 * @return {WPPerformanceResults} Curated Performance results.
 */
function curateResults( results ) {
	return {
		load: average( results.load ),
		type: average( results.type ),
		minType: Math.min( ...results.type ),
		maxType: Math.max( ...results.type ),
		focus: average( results.focus ),
		minFocus: Math.min( ...results.focus ),
		maxFocus: Math.max( ...results.focus ),
		inserterOpen: average( results.inserterOpen ),
		minInserterOpen: Math.min( ...results.inserterOpen ),
		maxInserterOpen: Math.max( ...results.inserterOpen ),
		inserterSearch: average( results.inserterSearch ),
		minInserterSearch: Math.min( ...results.inserterSearch ),
		maxInserterSearch: Math.max( ...results.inserterSearch ),
		inserterHover: average( results.inserterHover ),
		minInserterHover: Math.min( ...results.inserterHover ),
		maxInserterHover: Math.max( ...results.inserterHover ),
	};
}

/**
 * Set up the given branch for testing.
 *
 * @param {string} branch               Branch name.
 * @param {string} environmentDirectory Path to the plugin environment's clone.
 */
async function setUpGitBranch( branch, environmentDirectory ) {
	// Restore clean working directory (e.g. if `package-lock.json` has local
	// changes after install).
	await git.discardLocalChanges( environmentDirectory );

	log( '        >> Fetching the ' + formats.success( branch ) + ' branch' );
	await git.checkoutRemoteBranch( environmentDirectory, branch );

	log( '        >> Building the ' + formats.success( branch ) + ' branch' );
	await runShellScript(
		'yarn && yarn build',
		environmentDirectory
	);
}

/**
 * Runs the performance tests on the current branch.
 *
 * @param {string} testSuite                Name of the tests set.
 * @param {string} performanceTestDirectory Path to the performance tests' clone.
 * @return {Promise<WPPerformanceResults>} Performance results for the branch.
 */
async function runTestSuite( testSuite, performanceTestDirectory ) {
	await runShellScript(
		`npx wp-scripts test-e2e --config .dev/performance/jest.performance.config.js -- .dev/performance/tests/post-editor.test.js`,
		performanceTestDirectory
	);
	const rawResults = await readJSONFile(
		path.join(
			performanceTestDirectory,
			`.dev/performance/tests/${ testSuite }.test.results.json`
		)
	);
	return curateResults( rawResults );
}

/**
 * Runs the performances tests on an array of branches and output the result.
 *
 * @param {string[]}                    branches Branches to compare
 * @param {WPPerformanceCommandOptions} options  Command options.
 */
async function runPerformanceTests( branches, options ) {
	branches = [ ...branches ];

	log(
		formats.title( '\n💃 Performance Tests 🕺\n' ),
		'\nWelcome! This tool runs the performance tests on multiple branches and displays a comparison table.\n' +
			'In order to run the tests, the tool is going to load a WordPress environment on 8889 port.\n'
	);

	if ( ! options.ci ) {
		await askForConfirmation( 'Ready to go? ' );
	}

	// 1- Preparing the environment directories per branch.
	log( '\n>> Preparing an environment directory per branch' );

	// Clone in CoBlocks and prepare repo for use with testing.
	const baseDirectory = await git.clone( config.gitRepositoryURL );
	await runShellScript( `mv ${ baseDirectory } coblocks` );

	const branchDirectories = {}; // Used to store environment directory paths.
	let index = 0; // Used for database naming.
	for ( const branch of branches ) {
		const environmentDirectory = `${ getRandomTemporaryPath() }/wordpress`;

		branchDirectories[ branch ] = environmentDirectory;

		await runShellScript( `mkdir -p ${ environmentDirectory }` );
		await runShellScript( `./vendor/bin/wp core download --path=${ environmentDirectory }` );
		await runShellScript( `./vendor/bin/wp config create --dbhost=127.0.0.1 --dbname=coblocks${ index } --dbuser=root --dbpass='' --path=${ environmentDirectory }` );
		await runShellScript( `./vendor/bin/wp db create --path=${ environmentDirectory }` );
		await runShellScript( `./vendor/bin/wp core install --url="http://localhost:8889" --title=CoBlocks --admin_user=admin --admin_password=password --admin_email=test@admin.com --skip-email --path=${ environmentDirectory }` );
		await runShellScript( `./vendor/bin/wp post generate --count=5 --path=${ environmentDirectory }` );
		await runShellScript( `./vendor/bin/wp theme install go --activate --path=${ environmentDirectory }` );

		// 2- Clone CoBlocks repo into environment directory.
		log( '\n>> Preparing the tests directory' );
		log( '    >> Branch: ' + branch );
		log( '    >> Cloning the repository' );

		await runShellScript( `cp -R coblocks ${ environmentDirectory }/wp-content/plugins` );
		await setUpGitBranch( branch, `${ environmentDirectory }/wp-content/plugins/coblocks` );
		await runShellScript( `./vendor/bin/wp plugin activate coblocks --path=${ environmentDirectory }` );
		index++;
	}

	for ( const branch of branches ) {
		// 3- Printing the used folders.
		log( '\n>> Perf Tests Directory : ' + formats.success( `${ branchDirectories[ branch ] }/wp-content/plugins/coblocks` ) );
		log(
			'>> Environment Directory (' +
				branch +
				') : ' +
				formats.success( branchDirectories[ branch ] )
		);
	}

	// 4- Running the tests.
	log( '\n>> Running the tests' );

	const testSuites = [ 'post-editor' ];

	/** @type {Record<string,Record<string, WPPerformanceResults>>} */
	const results = {};
	for ( const testSuite of testSuites ) {
		results[ testSuite ] = {};
		/** @type {Array<Record<string, WPPerformanceResults>>} */
		const rawResults = [];
		// Run the test two times
		for ( let i = 0; i < 2; i++ ) {
			rawResults[ i ] = {};
			for ( const branch of branches ) {
				const environmentDirectory = branchDirectories[ branch ];
				log( '    >> Branch: ' + branch + ', Suite: ' + testSuite );
				// Start the server on the first iteration
				if ( i === 0 ) {
					log( '        >> Starting the environment.' );
					await runShellScript(
						`./vendor/bin/wp server --host=0.0.0.0 --port=8889 --allow-root --path=${ environmentDirectory } > /dev/null 2>&1 &`
					);
				}

				log( '        >> Running the test.' );
				rawResults[ i ][ branch ] = await runTestSuite(
					testSuite,
					`${ environmentDirectory }/wp-content/plugins/coblocks`
				);

				// Stop the environment on the 2nd iteration
				if ( i === 1 ) {
					log( '        >> Stopping the environment' );
					await runShellScript( 'sudo kill $(ps ax | pgrep -f "server") > /dev/null 2>&1 &' );
				}
			}
		}

		// Computing medians.
		for ( const branch of branches ) {
			const medians = mapValues(
				{
					load: rawResults.map( ( r ) => r[ branch ].load ),
					type: rawResults.map( ( r ) => r[ branch ].type ),
					minType: rawResults.map( ( r ) => r[ branch ].minType ),
					maxType: rawResults.map( ( r ) => r[ branch ].maxType ),
					focus: rawResults.map( ( r ) => r[ branch ].focus ),
					minFocus: rawResults.map( ( r ) => r[ branch ].minFocus ),
					maxFocus: rawResults.map( ( r ) => r[ branch ].maxFocus ),
					inserterOpen: rawResults.map(
						( r ) => r[ branch ].inserterOpen
					),
					minInserterOpen: rawResults.map(
						( r ) => r[ branch ].minInserterOpen
					),
					maxInserterOpen: rawResults.map(
						( r ) => r[ branch ].maxInserterOpen
					),
					inserterSearch: rawResults.map(
						( r ) => r[ branch ].inserterSearch
					),
					minInserterSearch: rawResults.map(
						( r ) => r[ branch ].minInserterSearch
					),
					maxInserterSearch: rawResults.map(
						( r ) => r[ branch ].maxInserterSearch
					),
					inserterHover: rawResults.map(
						( r ) => r[ branch ].inserterHover
					),
					minInserterHover: rawResults.map(
						( r ) => r[ branch ].minInserterHover
					),
					maxInserterHover: rawResults.map(
						( r ) => r[ branch ].maxInserterHover
					),
				},
				median
			);

			// Format results as times.
			results[ testSuite ][ branch ] = mapValues( medians, formatTime );

			// Write the results to a file for use in the aggregator build
			const mediansFilename = branch.replace( '/', '-' ) + '-median-results.json';
			fs.writeFileSync(
				path.resolve( __dirname, '../../../', mediansFilename ),
				JSON.stringify( results, null, 2 )
			);
		}
	}
}

module.exports = {
	runPerformanceTests,
};
