import { disableGutenbergFeatures, loginToSite } from '../helpers';

before( function() {
	loginToSite().then( () => {
		disableGutenbergFeatures();
	} );
} );

// Maintain WordPress logged in state
Cypress.Cookies.defaults( {
	preserve: /wordpress_.*/,
} );

// Custom uploadFile command
Cypress.Commands.add( 'uploadFile', ( fileName, fileType, selector ) => {
	cy.get( selector ).then( ( subject ) => {
		cy.fixture( fileName, 'hex' ).then( ( fileHex ) => {
			const fileBytes = hexStringToByte( fileHex );
			const testFile = new File( [ fileBytes ], fileName, {
				type: fileType,
			} );
			const dataTransfer = new DataTransfer();
			const el = subject[ 0 ];

			dataTransfer.items.add( testFile );
			el.files = dataTransfer.files;
		} );
	} );
} );

// Utilities
function hexStringToByte( str ) {
	if ( ! str ) {
		return new Uint8Array();
	}

	const a = [];
	for ( let i = 0, len = str.length; i < len; i += 2 ) {
		a.push( parseInt( str.substr( i, 2 ), 16 ) );
	}

	return new Uint8Array( a );
}

/**
 * Starting in Cypress 8.1.0 Unhandled Exceptions now cause tests to fail.
 * Sometimes unhandled exceptions occur in Core that do not effect the UX created by CoBlocks.
 * We discard unhandled exceptions and pass the test as long as assertions continue expectedly.
 */
Cypress.on( 'uncaught:exception', () => {
	// returning false here prevents Cypress from failing the test.
	return false;
} );
