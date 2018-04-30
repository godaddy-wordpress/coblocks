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
var cleanSrcFiles	  = ['./build/'+project+'/src/'];

/**
 * Load Plugins.
 */
var gulp		= require('gulp');
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

/**
 * Tasks.
 */
gulp.task('clearCache', function(done) {
	cache.clearAll();
	done();
});

gulp.task('clean', function(done) {
	return del( cleanFiles );
	done();
});

gulp.task('cleanSrc', function(done) {

	if ( 'coblocks' == project ) {
		done();
		return;
	}

	return del( cleanSrcFiles );

	done();
});

gulp.task( 'npmStart', run( 'npm run start' ) )

gulp.task( 'npmBuild', run( 'npm run build' ) )

gulp.task( 'npmInstall', run( 'npm install' ) )

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
			match: 'pkg.title',
			replacement: pkg.title
		},
		{
			match: 'pkg.version',
			replacement: pkg.version
		},
		{
			match: 'pkg.author',
			replacement: pkg.author
		},
		{
			match: 'pkg.license',
			replacement: pkg.license
		},
		{
			match: 'pkg.copyright',
			replacement: pkg.copyright
		},
		{
			match: 'textdomain',
			replacement: pkg.name
		},
		{
			match: 'pkg.downloadid',
			replacement: pkg.downloadid
		},
		{
			match: 'pkg.description',
			replacement: pkg.description
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

gulp.task('zip', function(done) {
	return gulp.src( buildDestination + '/**', { base: 'build' } )
	.pipe( zip( project + '.zip' ) )
	.pipe( gulp.dest( buildZipDestination ) );
	done();
});

gulp.task('build-notice', function(done) {
	return gulp.src( './' )
	.pipe( notify( { message: 'Your build of ' + title + ' is complete.', onLast: false } ) );
	done();
});

gulp.task('build-process', gulp.series( 'clearCache', 'clean', 'npmBuild', 'updateVersion', 'copy', 'cleanSrc', 'variables', 'zip',  function(done) {
	done();
} ) );

gulp.task('build', gulp.series( 'build-process', 'build-notice', function(done) {
	done();
} ) );

/**
 * Release Tasks.
 */

gulp.task( 'upload-to-sandbox', function(done) {

	if ( 'coblocks-pro' == project ) {
		done();
		return;
	}

	var sftpFile;

	try {
		var sftpFile = require('./sftp.json');
	} catch (error) {
		done();
	}

	if (sftpFile) {
		return gulp.src( sftpDemoFilesToUpload )
		.pipe( sftp( {
			host: sftpFile.sandboxHost,
			authFile: '.ftppass',
			auth: 'SandboxSFTP',
			remotePath: sftpFile.sandboxRemotePath,
			port: sftpFile.sandboxPort,
		}))
	}
});

gulp.task( 'open-sandbox', function(done){

	if ( 'coblocks-pro' == project ) {
		done();
		return;
	}

	var sftpFile;

	try {
		var sftpFile = require('./sftp.json');
	} catch (error) {
		done();
	}

	if (sftpFile) {
		gulp.src(__filename)
		.pipe( open( { uri: sftpFile.sandboxURL } ) )
		.pipe( notify( { message: 'You may now save the ' + title + ' Sandbox.', onLast: false } ) );
	}

	done();
});

gulp.task( 'sftp-upload-zip', function(done) {

	if ( 'coblocks' == project ) {
		done();
		return;
	}

	var sftpFile;

	try {
		var sftpFile = require('./sftp.json');
	} catch (error) {
		done();
	}

	if (sftpFile) {
		return gulp.src( './build/' + project + '.zip' )
		.pipe( sftp( {
			host: sftpFile.buildHost,
			authFile: '.ftppass',
			auth: 'CoBlocksSFTP',
			remotePath: sftpFile.buildRemotePath,
			port: sftpFile.buildPort,
		}))
		.pipe( notify( { message: 'The ' + title + ' zip has been uploaded.', onLast: false } ) );
	}

	done();
});

gulp.task( 'release-notice', function(done) {

	var sftpFile;

	try {
		var sftpFile = require('./sftp.json');
	} catch (error) {
		done();
	}

	if (sftpFile) {
		return gulp.src( './' )
		.pipe( notify( { message: 'The v' + pkg.version + ' release of ' + title + ' has been uploaded.', onLast: false } ) )
		done();
	} else {
		return gulp.src( './' )
		.pipe( notify( { message: 'The release was built, but not uploaded. You do not have proper permissions to do so.', onLast: true } ) )
		done();
	}

	done();
});

gulp.task(
	'default',
	gulp.series(
		'npmStart', function(done) {
	done();
} ) );

gulp.task(
	'install',
	gulp.series(
		'npmInstall', function(done) {
	done();
} ) );

gulp.task(
	'release',
	gulp.series(
		'build-process',
		'upload-to-sandbox',
		'open-sandbox',
		'sftp-upload-zip',
		'release-notice', function(done) {
	done();
} ) );
