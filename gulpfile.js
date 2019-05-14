// General.
var pkg				= require('./package.json');
var project 			= pkg.name;
var title			= pkg.title;

// Build.
var buildZipDestination	  = './build/';
var buildFiles            = ['./**', '!build', '!build/**', '!node_modules/**', '!*.json', '!*.map', '!*.xml', '!gulpfile.js', '!*.sublime-project', '!*.sublime-workspace', '!*.sublime-gulp.cache', '!*.log', '!*.DS_Store', '!*.gitignore', '!TODO', '!*.git', '!*.ftppass', '!*.DS_Store', '!sftp.json', '!yarn.lock', '!*.md', '!package.lock'];
var cleanFiles		  = ['./build/'+project+'/', './build/'+project+' 2/', './build/'+project+'.zip' ];
var buildDestination	  = './build/'+project+'/';
var buildDestinationFiles = './build/'+project+'/**/*';

// Release.
var sftpDemoFilesToUpload = ['./build/' + project + '/**/*', '!/build/' + project + '/src/', '!build/' + project + '/src/**/*'];
var cleanSrcFiles	  = [ './build/' + project + '/src/**/*.js', './build/' + project + '/src/**/*.scss', '!build/' + project + '/src/blocks/**/*.php' ];
var srcDirectory	  = './build/' + project + '/src/';

// JS.
var scriptDestination 		= './dist/js/';
var scriptGoogleMaps	  	= 'coblocks-accordion-polyfill';
var scriptAccordionPolyfill   	= 'coblocks-google-maps';
var scriptModal   		= 'coblocks-modal';

// Styles.
var styleDestination = './dist/css/';
var styleAdmin    = './src/styles/admin.scss';
var styleGettingStarted    = './src/styles/getting-started.scss';
var styleWatchFiles  = [ styleAdmin, styleGettingStarted, './src/styles/admin/*.scss' ];

// Translation.
var text_domain             	= '@@textdomain';
var destFile                	= project+'.pot';
var packageName             	= title;
var bugReport               	= 'plugins@godaddy.com';
var lastTranslator          	= pkg.author;
var team                    	= pkg.author;
var translatePath           	= './languages';
var translatableFiles       	= ['./**/*.php'];
var jsPotFile 			= [ './languages/'+project+'-js.pot', './build/languages/'+project+'-js.pot' ];

// Browsers you care about for autoprefixing. https://github.com/ai/browserslist
const AUTOPREFIXER_BROWSERS = [
	'last 2 version',
	'> 1%',
	'ie >= 9',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4',
	'bb >= 10'
];

// Build contents.
var filesToUpload	= [ './build/coblocks/**/*' ] ;

/**
 * Load Plugins.
 */
var gulp		= require('gulp');
var sass		= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');
var minifycss		= require('gulp-uglifycss');
var del                 = require('del');
var notify	   	= require('gulp-notify');
var replace	  	= require('gulp-replace-task');
var zip		  	= require('gulp-zip');
var copy		= require('gulp-copy');
var cache               = require('gulp-cache');
var run                 = require('gulp-run-command').default;
var sftp                = require("gulp-sftp");
var open                = require("gulp-open");
var gulpif              = require('gulp-if');
var wpPot 		= require('gulp-wp-pot');
var deleteEmpty 	= require('delete-empty');
var uglify      	= require('gulp-uglify');
var lineec       	= require('gulp-line-ending-corrector');
var rename       	= require('gulp-rename');

/**
 * Tasks.
 */
gulp.task( 'scripts', function(done) {
	gulp.src( './src/js/' + scriptGoogleMaps +'.js' )
	.pipe( rename( {
		basename: scriptGoogleMaps,
		suffix: '.min'
	}))
	.pipe( uglify() )
	.pipe( lineec() )
	.pipe( gulp.dest( scriptDestination ) );

	gulp.src( './src/js/' + scriptAccordionPolyfill +'.js' )
	.pipe( rename( {
		basename: scriptAccordionPolyfill,
		suffix: '.min'
	}))
	.pipe( uglify() )
	.pipe( lineec() )
	.pipe( gulp.dest( scriptDestination ) );

	gulp.src( './src/js/' + scriptModal +'.js', { allowEmpty: true } )
	.pipe( rename( {
		basename: scriptModal,
		suffix: '.min'
	}))
	.pipe( uglify() )
	.pipe( lineec() )
	.pipe( gulp.dest( scriptDestination ) );

	done();
});

gulp.task( 'gettingStartedStyles', function (done) {
	gulp.src( styleGettingStarted, { allowEmpty: true } )

	.pipe( sass( {
		errLogToConsole: true,
		outputStyle: 'expanded',
		precision: 10
	} ) )

	.on( 'error', console.error.bind( console ) )

	.pipe( autoprefixer( AUTOPREFIXER_BROWSERS ) )

	.pipe( rename( {
		basename: 'coblocks-getting-started',
		suffix: '.min',
	} ) )

	.pipe( minifycss() )

	.pipe( gulp.dest( styleDestination ) )

	done();
});

gulp.task('clearCache', function(done) {
	cache.clearAll();
	done();
});

gulp.task('clean', function(done) {
	return del( cleanFiles );
	done();
});

gulp.task( 'removeJSPotFile', function(done) {
	return del( jsPotFile );
	done();
});

gulp.task( 'cleanSrc', function(done) {
	return del( cleanSrcFiles );
	done();
});

gulp.task( 'deleteEmptyDirectories', function(done) {
	deleteEmpty.sync( srcDirectory );
	console.log(deleteEmpty.sync(srcDirectory));
	done();
});

gulp.task( 'npmStart', run( 'npm run start' ) )

gulp.task( 'npmBuild', run( 'npm run build' ) )

gulp.task( 'npmInstall', run( 'npm install' ) )

gulp.task( 'npmMakeBabel', run( 'npm run babel' ) )

gulp.task( 'npmMakePot', run( 'npm run makepot' ) )

gulp.task( 'npmMakePotPHP', run( 'npm run makepot:php' ) )

gulp.task('copy', function(done) {
	return gulp.src( buildFiles )
	.pipe( copy( buildDestination ) );
	done();
});

gulp.task( 'updateVersion', function(done) {
	return gulp.src( './*.php' )

	.pipe( replace( {
		patterns: [
			{
				match: /(\d+\.+\d+\.+\d)/,
				replacement: pkg.version
			},
		],
		usePrefix: false
	} ) )
	.pipe( gulp.dest( './' ) );
	done();
});

gulp.task('variables', function(done) {
	return gulp.src( buildDestinationFiles )
	.pipe(replace({
		patterns: [
		{
			match: 'pkg.name',
			replacement: project
		},
		{
			match: 'pkg.version',
			replacement: pkg.version
		},
		{
			match: 'pkg.license',
			replacement: pkg.license
		},
		{
			match: 'textdomain',
			replacement: pkg.name
		},
		{
			match: 'pkg.tested_up_to',
			replacement: pkg.tested_up_to
		}
		]
	}))
	.pipe(gulp.dest( buildDestination ));
	done();
});

gulp.task( 'translate', function(done) {

	gulp.src( translatableFiles )

	.pipe( wpPot( {
		domain        : text_domain,
		destFile      : destFile,
		package       : project,
		bugReport     : bugReport,
		lastTranslator: lastTranslator,
		team          : team
	} ))
	.pipe( gulp.dest( translatePath ) )
	done();

});

// Ensures SLUG_DEBUG is set to false for all build files.
gulp.task( 'debug_mode_off', function (done) {
	return gulp.src( ['build/'+project+'/class-coblocks.php'] )

	.pipe( replace( {
		patterns: [
		{
			match: '_DEBUG\', true );',
			replacement: '_DEBUG\', false );'
		}
		],
		usePrefix: false
	} ) )
	.pipe( gulp.dest( buildDestination ) );
	done();
});

gulp.task('zip', function(done) {
	return gulp.src( buildDestination + '/**', { base: 'build' } )
	.pipe( zip( project + '.zip' ) )
	.pipe( gulp.dest( buildZipDestination ) );
	done();
});

gulp.task( 'sftp-upload-to-testing-sandbox', function(done) {


	var sandbox;

	try {
		var sandbox = require('./sandbox.json');
	} catch (error) {
		done();
	}

	if ( sandbox ) {
		return gulp.src( filesToUpload )
		.pipe( sftp( {
			host: sandbox.host,
			authFile: '.ftppass',
			auth: 'testingSandboxSFTP',
			remotePath: sandbox.remotePath,
			port: sandbox.port,
		}))
	}

	done();
});

// Open the sandbox.
gulp.task( 'open-sandbox', function(done){

	var sandbox;

	try {
		var sandbox = require('./sandbox.json');
	} catch (error) {
		done();
	}

	if ( sandbox ) {
		gulp.src(__filename)
		.pipe( open( { uri: sandbox.uri } ) );
	}

	done();
});

/**
 * Build & Release Tasks.
 */

gulp.task('build-process', gulp.series( 'clearCache', 'clean', 'scripts', 'npmMakeBabel', 'npmBuild', 'npmMakePot', 'removeJSPotFile', 'removeJSPotFile', 'updateVersion', 'copy', 'cleanSrc', 'deleteEmptyDirectories', 'variables', 'debug_mode_off', 'zip' , 'sftp-upload-to-testing-sandbox', 'open-sandbox',  function(done) {
	done();
} ) );

gulp.task('build-process-wo-translations', gulp.series( 'clearCache', 'clean', 'scripts', 'npmBuild', 'updateVersion', 'copy', 'cleanSrc', 'deleteEmptyDirectories', 'variables', 'debug_mode_off', 'zip', 'sftp-upload-to-testing-sandbox', 'open-sandbox', function(done) {
	done();
} ) );

gulp.task( 'build-notice', function(done) {

	var sandbox;

	try {
		var sandbox = require('./sandbox.json');
	} catch (error) {
		done();
	}

	if ( sandbox ) {
		return gulp.src( './' )
		.pipe( notify( { message: 'The test build of ' + title + ' ' + pkg.version + ' is complete and uploaded to the sandbox for testing.', onLast: false } ) )
		done();
	} else {
		return gulp.src( './' )
		.pipe( notify( { message: 'The ' + pkg.version + ' release was built but not uploaded to the testing sandbox. You do not have proper permissions to do so.', onLast: true } ) )
		done();
	}

	done();
});

gulp.task( 'release-notice', function(done) {

	var sandbox;

	try {
		var sandbox = require('./sandbox.json');
	} catch (error) {
		done();
	}

	if ( sandbox ) {
		return gulp.src( './' )
		.pipe( notify( { message: 'The release build of ' + title + ' ' + pkg.version + ' is complete, uploaded to the sandbox, and ready to be uploaded to WordPress.org.', onLast: false } ) )
		done();
	} else {
		return gulp.src( './' )
		.pipe( notify( { message: 'The ' + pkg.version + ' release was built but not uploaded to the testing sandbox. You do not have proper permissions to do so.', onLast: true } ) )
		done();
	}

	done();
});

gulp.task('build', gulp.series( 'build-process-wo-translations', 'build-notice', function(done) {
	done();
} ) );

gulp.task('release', gulp.series( 'build-process', 'release-notice', function(done) {
	done();
} ) );

gulp.task(
	'default',
	gulp.series(
		'gettingStartedStyles', function(done) {
		gulp.watch( styleWatchFiles, gulp.parallel( 'gettingStartedStyles' ) );
	done();
} ) );

gulp.task(
	'install',
	gulp.series(
		'npmInstall', function(done) {
	done();
} ) );