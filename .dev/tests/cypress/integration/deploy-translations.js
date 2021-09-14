const pkg = require( '../../../../package.json' );
const wpCreds = require( './wp_creds.json' );

describe( 'Deploy .po files from Coblocks to WordPress.org', function() {
	it( 'Login to WordPress.org', function() {
		cy.visit( 'https://login.wordpress.org/' );

		cy.get( 'body' ).then( ( $body ) => {
			if ( ! $body.hasClass( 'login' ) ) {
				return;
			}

			cy.get( '#user_login' )
				.type( wpCreds.wporg_username );

			cy.get( '#user_pass' )
				.type( wpCreds.wporg_password );

			cy.get( '#wp-submit' )
				.click();
		} );
	} );

	// Disable reason: This rule should be enabled if we ever allow cy.get - cy.get is considered an assertion.
	// eslint-disable-next-line jest/expect-expect
	it( 'Upload .po files to Glotpress', function() {
		for ( const locale of Object.keys( pkg.locales ) ) {
			const localeSplit = locale.split( /_(.+)/ )[ 0 ];

			cy.visit( `https://translate.wordpress.org/projects/wp-plugins/coblocks/dev/${ localeSplit }/default/import-translations/` );

			cy.uploadFile( `coblocks-${ locale }.po`, 'text/x-gettext-translation', '#import-file' );

			cy.task( 'log', `Uploading ${ locale } translations...` );

			cy.wait( 2000 );

			/**
			 * @todo When translation files are ready for deployment, uncomment the lines
			 *       below, and run `npm run deploy-i18n` or `.dev/node_modules/cypress open`
			 */
			// cy.get( '#submit' ).click();

			// Get the legend in the footer of Glotpress
			// cy.get( '#legend', { timeout: 30000 } );
		}
	} );
} );
