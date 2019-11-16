import { loginToSite, createNewPost, disableGutenbergFeatures } from '../helpers';

before( function() {
  var specFile  = Cypress.spec['name'],
      fileBase  = ( specFile.split( '/' ).pop().replace( '.js', '' ) ),
      blockName = fileBase.charAt( 0 ).toUpperCase() + fileBase.slice( 1 );

  loginToSite();
  createNewPost( blockName );
  disableGutenbergFeatures();
} );

// Maintain WordPress logged in state
Cypress.Cookies.defaults( {
  whitelist: /wordpress_.*/
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
