
/**
 * External dependencies
 */
const { existsSync } = require( 'fs' );
const path = require( 'path' );
const { realpathSync } = require( 'fs' );
const { sync: readPkgUp } = require( 'read-pkg-up' );

/**
 * Internal dependencies
 */
const getCurrentWorkingDirectory = process.cwd;

const { pkg, path: pkgPath } = readPkgUp( {
	cwd: realpathSync( getCurrentWorkingDirectory() ),
} );

const hasPackageProp = ( prop ) => pkg && pkg.hasOwnProperty( prop );

const getPackagePath = () => pkgPath;

const fromProjectRoot = ( fileName ) =>
	path.join( path.dirname( getPackagePath() ), fileName );

const hasProjectFile = ( fileName ) =>
	existsSync( fromProjectRoot( fileName ) );

const hasBabelConfig = () =>
	hasProjectFile( '.babelrc.js' ) ||
	hasProjectFile( '.babelrc.json' ) ||
	hasProjectFile( 'babel.config.js' ) ||
	hasProjectFile( 'babel.config.json' ) ||
	hasProjectFile( '.babelrc' ) ||
	hasPackageProp( 'babel' );

module.exports = {
	fromProjectRoot,
	hasProjectFile,
	hasBabelConfig,
};
