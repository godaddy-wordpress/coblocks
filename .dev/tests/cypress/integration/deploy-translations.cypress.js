const pkg = require( '../../../../package.json' );

describe( 'Deploy .po files from Coblocks to WordPress.org', function() {

  it( 'Login to WordPress.org', function() {

    cy.visit( 'https://login.wordpress.org/' );

    cy.get( 'body' ).then( ( $body ) => {
      if ( ! $body.hasClass( 'login' ) ) {
        return;
      }

      cy.get( '#user_login' )
        .type( Cypress.env( 'WP_ORG_USERNAME' ) );

      cy.get( '#user_pass' )
        .type( Cypress.env( 'WP_ORG_PASSWORD' ) );

      cy.get( '#wp-submit' )
        .click()
        .get( 'body#wordpress-org' );
    } );
  } );

  it( 'Upload .po files to Glotpress', function() {

    for( const locale of Object.keys( pkg.locales ) ) {

      var localeSplit = locale.split( /_(.+)/ )[0];

      // Glotpress URLs for zh_CN/zh_TW are zh-cn/zh-tw
      if ( [ 'zh_CN', 'zh_TW' ].includes( locale ) ) {
        localeSplit = locale.replace( '_', '-' ).toLowerCase();
      }

      cy.visit( `https://translate.wordpress.org/projects/wp-plugins/coblocks/dev/${localeSplit}/default/import-translations/` );

      cy.uploadFile( `coblocks-${locale}.po`, 'text/x-gettext-translation', '#import-file' );

      cy.task( 'log', `Uploading ${locale} translations...` );

      cy.get( '#submit' ).click();

      // Get the legend in the footer of the GlotPress site
      cy.get( '#legend', { timeout: 30000 } );

    }

  } );

} );
