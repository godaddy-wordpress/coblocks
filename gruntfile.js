module.exports = function( grunt ) {
	'use strict';

	const pkg = grunt.file.readJSON( 'package.json' );

	grunt.initConfig( {

		pkg,

		clean: {
			build: [
				'build/',
				'dist/**/*.map',
			],
		},

		copy: {
			build: {
				files: [
					{
						expand: true,
						src: [
							'!**/*.{ai,eps,psd}',
							'LICENSE',
							'class-' + pkg.name + '.php',
							'assets/**',
							'dist/**',
							'includes/**',
							'readme.txt',
							'src/**/*.php',
							'src/blocks/events/*.json',
							'src/blocks/post-carousel/*.json',
							'src/blocks/posts/*.json',
							'src/blocks/share/*.json',
							'src/blocks/social-profiles/*.json',
						],
						dest: 'build/<%= pkg.name %>',
					},
				],
			},
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
			build: [ 'npm run build' ].join( ' && ' ),
			translations: [ 'npm run makepot' ].join( ' && ' ),
		},

	} );

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	grunt.registerTask( 'build', [ 'shell:build', 'update-pot', 'replace', 'clean:build', 'copy:build' ] );
	grunt.registerTask( 'update-pot', [ 'shell:translations', 'replace:languages' ] );
	grunt.registerTask( 'version', [ 'replace' ] );
};
