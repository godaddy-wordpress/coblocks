/**
 * Start
 *
 * The create-guten-block CLI starts here.
 *
 * TODO:
 *  - checkRequiredFiles
 *  - printBuildError
 */
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on( 'unhandledRejection', err => {
	throw err;
} );

const ora = require( 'ora' );
const chalk = require( 'chalk' );
const webpack = require( 'webpack' );
const config = require( '../config/webpack.config.dev' );
const resolvePkg = require( 'resolve-pkg' );
const cgbDevUtilsPath = resolvePkg( 'cgb-dev-utils', { cwd: __dirname } );
const clearConsole = require( cgbDevUtilsPath + '/clearConsole' );
const formatWebpackMessages = require( cgbDevUtilsPath +
	'/formatWebpackMessages' );

// Don't run below node 8.
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split( '.' );
const major = semver[ 0 ];

// If below Node 8.
if ( major < 8 ) {
	console.error(
		chalk.red(
			'You are running Node ' +
				currentNodeVersion +
				'.\n' +
				'Create Guten Block requires Node 8 or higher. \n' +
				'Kindly, update your version of Node.'
		)
	);
	process.exit( 1 );
}

clearConsole();

// Init the spinner.
const spinner = new ora( { text: '' } );

// Create the production build and print the deployment instructions.
async function build( webpackConfig ) {
	// Compiler Instance.
	const compiler = await webpack( webpackConfig );

	// Run the compiler.
	compiler.watch( {}, ( err, stats ) => {
		clearConsole();

		if ( err ) {
			return console.log( err );
		}

		// Get the messages formatted.
		const messages = formatWebpackMessages( stats.toJson( {}, true ) );

		// If there are errors just show the errors.
		if ( messages.errors.length ) {
			// Only keep the first error. Others are often indicative
			// of the same problem, but confuse the reader with noise.
			if ( messages.errors.length > 1 ) {
				messages.errors.length = 1;
			}

			// Clear success messages.
			clearConsole();

			// Formatted errors.
			console.log( '\n❌ ', chalk.black.bgRed( ' Failed to compile. \n' ) );
			const logErrors = console.log( '\n👉 ', messages.errors.join( '\n\n' ) );
			console.log( '\n' );
			spinner.start(
				chalk.dim(
					'Watching for changes... let\'s fix this... (Press CTRL + C to stop).'
				)
			);
			return logErrors;
		}

		// CI.
		if (
			process.env.CI &&
			( typeof process.env.CI !== 'string' ||
				process.env.CI.toLowerCase() !== 'false' ) &&
			messages.warnings.length
		) {
			console.log(
				chalk.yellow(
					'\nTreating warnings as errors because process.env.CI = true.\n' +
						'Most CI servers set it automatically.\n'
				)
			);
			return console.log( messages.warnings.join( '\n\n' ) );
		}

		// Start the build.
		console.log( `\n${ chalk.dim( 'Let\'s build and compile the files...' ) }` );
		console.log( '\n✅ ', chalk.black.bgGreen( ' Compiled successfully! \n' ) );
		console.log(
			chalk.dim( '   Note that the development build is not optimized. \n' ),
			chalk.dim( '  To create a production build, use' ),
			chalk.green( 'npm' ),
			chalk.white( 'run build\n' )
		);
		return spinner.start(
			`${ chalk.dim( 'Watching for changes... (Press CTRL + C to stop).' ) }`
		);
	} );
}

build( config );
