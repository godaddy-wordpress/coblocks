/* global module, require */

module.exports = function( grunt ) {
	'use strict';

	const pkg = grunt.file.readJSON( 'package.json' );

	grunt.initConfig( {

		pkg: pkg,

		devUpdate: {
			packages: {
				options: {
					packageJson: null,
					packages: {
						devDependencies: true,
						dependencies: false,
					},
					reportOnlyPkgs: [],
					reportUpdated: false,
					semver: true,
					updateType: 'force',
				},
			},
		},

		clean: {
			build: [ 'build/' ],
		},

		copy: {
			build: {
				files: [
					{
						expand: true,
						src: [
							'class-' + pkg.name + '.php',
							'LICENSE',
							'readme.txt',
							'src/**/*.php',
							'src/blocks/post-carousel/*.json',
							'src/blocks/posts/*.json',
							'src/blocks/share/*.json',
							'src/blocks/social-profiles/*.json',
							'dist/**',
							'includes/**',
							'!**/*.{ai,eps,psd}',
						],
						dest: 'build/<%= pkg.name %>',
					},
				],
			},
		},

		eslint: {
			target: [
				'src/**/*.js',
				'!src/js/vendors/**/*.js',
			],
		},

		compress: {
			coblocks: {
				options: {
					archive: 'build/coblocks-v<%= pkg.version %>.zip',
				},
				files: [
					{
						cwd: 'build/<%= pkg.name %>/',
						dest: '<%= pkg.name %>/',
						src: [ '**' ],
					},
				],
			},
		},

		uglify: {
			options: {
				ASCIIOnly: true,
			},
			all: {
				expand: true,
				cwd: 'src/js/',
				src: '**/*.js',
				dest: 'dist/js/',
				ext: '.min.js',
			},
		},

		imagemin: {
			options: {
				optimizationLevel: 3,
			},
			assets: {
				expand: true,
				cwd: 'dist/images/',
				src: [ '**/*.{gif,jpeg,jpg,png,svg}' ],
				dest: 'build/<%= pkg.name %>/dist/images/',
			},
			wp_org_assets: {
				expand: true,
				cwd: '.wordpress-org/',
				src: [ '**/*.{gif,jpeg,jpg,png,svg}' ],
				dest: '.wordpress-org/',
			},
		},

		replace: {
			php: {
				src: [
					'class-' + pkg.name + '.php',
					'includes/**/*.php',
				],
				overwrite: true,
				replacements: [
					{
						from: /Version:(\s*?)[a-zA-Z0-9\.\-\+]+$/m,
						to: 'Version:$1' + pkg.version,
					},
					{
						from: /@since(.*?)NEXT/mg,
						to: '@since$1' + pkg.version,
					},
					{
						from: /Version:(\s*?)[a-zA-Z0-9\.\-\+]+$/m,
						to: 'Version:$1' + pkg.version,
					},
					{
						from: /define\(\s*'COBLOCKS_VERSION',\s*'(.*)'\s*\);/,
						to: 'define( \'COBLOCKS_VERSION\', \'<%= pkg.version %>\' );',
					},
					{
						from: /Tested up to:(\s*?)[a-zA-Z0-9\.\-\+]+$/m,
						to: 'Tested up to:$1' + pkg.tested_up_to,
					},
				],
			},
			readme: {
				src: 'readme.*',
				overwrite: true,
				replacements: [
					{
						from: /^(\*\*|)Stable tag:(\*\*|)(\s*?)[a-zA-Z0-9.-]+(\s*?)$/mi,
						to: '$1Stable tag:$2$3<%= pkg.version %>$4',
					},
					{
						from: /Tested up to:(\s*?)[a-zA-Z0-9\.\-\+]+$/m,
						to: 'Tested up to:$1' + pkg.tested_up_to,
					},
				],
			},
			tests: {
				src: '.dev/tests/phpunit/**/*.php',
				overwrite: true,
				replacements: [
					{
						from: /\'version\'(\s*?)\=\>(\s*?)\'(.*)\'/,
						to: '\'version\' \=\> \'<%= pkg.version %>\'',
					},
				],
			},
			languages: {
				src: 'languages/coblocks.pot',
				overwrite: true,
				replacements: [
					{
						from: /(Project-Id-Version: CoBlocks )[0-9\.]+/,
						to: '$1' + pkg.version,
					},
				],
			},
		},

		shell: {
			cgb_start: [
				'npm run start',
			].join( ' && ' ),
			cgb_build: [
				'npm run build',
			].join( ' && ' ),
			translations: [
				'npm run babel:build',
			].join( ' && ' ),
		},

	} );

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	grunt.registerTask( 'default', [ 'uglify', 'shell:cgb_start' ] );
	grunt.registerTask( 'check', [ 'devUpdate' ] );
	grunt.registerTask( 'build', [ 'shell:cgb_build', 'uglify', 'imagemin', 'update-pot', 'replace', 'clean:build', 'copy:build' ] );
	grunt.registerTask( 'update-pot', [ 'shell:translations' ] );
	grunt.registerTask( 'version', [ 'replace' ] );
};
