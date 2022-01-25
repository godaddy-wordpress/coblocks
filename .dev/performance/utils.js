/**
 * External dependencies
 */
const inquirer = require( 'inquirer' );
const fs = require( 'fs' );
const childProcess = require( 'child_process' );
const { v4: uuid } = require( 'uuid' );
const path = require( 'path' );
const os = require( 'os' );

/**
 * Internal dependencies
 */
const { log, formats } = require( './logger' );

/**
 * Utility to run a child script
 *
 * @typedef {NodeJS.ProcessEnv} Env
 * @param {string}  script Script to run.
 * @param {string=} cwd    Working directory.
 * @param {Env=}    env    Additional environment variables to pass to the script.
 */
function runShellScript( script, cwd, env = {} ) {
	return new Promise( ( resolve, reject ) => {
		childProcess.exec(
			script,
			{
				cwd,
				env: {
					HOME: process.env.HOME,
					NO_CHECKS: 'true',
					PATH: process.env.PATH,
					...env,
				},
			},
			function( error, _, stderr ) {
				if ( error ) {
					// eslint-disable-next-line no-console
					console.log( stderr );
					reject( error );
				} else {
					resolve( true );
				}
			}
		);
	} );
}

function runShellScriptIgnoreFailing( script, cwd, env = {} ) {
	return new Promise( ( resolve ) => {
		childProcess.exec(
			script,
			{
				cwd,
				env: {
					HOME: process.env.HOME,
					NO_CHECKS: 'true',
					PATH: process.env.PATH,
					...env,
				},
			},
			function( error, _, stderr ) {
				if ( error ) {
					// eslint-disable-next-line no-console
					console.log( stderr );
					// We make the promise resolve even if the script fails
					resolve( true );
				} else {
					resolve( true );
				}
			}
		);
	} );
}

/**
 * Small utility used to read an uncached version of a JSON file
 *
 * @param {string} fileName
 */
function readJSONFile( fileName ) {
	const data = fs.readFileSync( fileName, 'utf8' );
	return JSON.parse( data );
}

/**
 * Asks the user for a confirmation to continue or abort otherwise.
 *
 * @param {string}  message      Confirmation message.
 * @param {boolean} isDefault    Default reply.
 * @param {string}  abortMessage Abort message.
 */
async function askForConfirmation(
	message,
	isDefault = true,
	abortMessage = 'Aborting.'
) {
	const { isReady } = await inquirer.prompt( [
		{
			default: isDefault,
			message,
			name: 'isReady',
			type: 'confirm',
		},
	] );

	if ( ! isReady ) {
		log( formats.error( '\n' + abortMessage ) );
		process.exit( 1 );
	}
}

/**
 * Generates a random temporary path in the OS's tmp dir.
 *
 * @return {string} Temporary Path.
 */
function getRandomTemporaryPath() {
	return path.join( os.tmpdir(), uuid() );
}

module.exports = {
	askForConfirmation,
	getRandomTemporaryPath,
	readJSONFile,
	runShellScript,
	runShellScriptIgnoreFailing,
};
