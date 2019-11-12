beforeEach( function() {
  Cypress.Cookies.preserveOnce( 'wordpress_test_cookie' );
  Cypress.Cookies.preserveOnce( 'wporg_locale' );
  Cypress.Cookies.preserveOnce( 'wporg_logged_in' );
  Cypress.Cookies.preserveOnce( 'wporg_sec' );
} );

// Custom uploadFile command
Cypress.Commands.add( 'uploadFile', ( fileName, fileType, selector ) => {
  cy.get( selector ).then( subject => {
    cy.fixture( fileName, 'hex' ).then( ( fileHex ) => {
      const fileBytes = hexStringToByte( fileHex );
      const testFile = new File( [ fileBytes ], fileName, {
          type: fileType
      } );
      const dataTransfer = new DataTransfer()
      const el = subject[0]

      dataTransfer.items.add(testFile)
      el.files = dataTransfer.files
    } );
  } );
} );

// Utilities
function hexStringToByte( str ) {
  if ( ! str ) {
    return new Uint8Array();
  }

  var a = [];
  for ( var i = 0, len = str.length; i < len; i += 2 ) {
    a.push( parseInt( str.substr( i, 2 ), 16 ) );
  }

  return new Uint8Array( a );
}
