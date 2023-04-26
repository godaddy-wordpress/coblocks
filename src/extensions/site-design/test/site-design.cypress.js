/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Extension: CoBlocks Labs', () => {
	it( 'should disable when Go Site Editor is active', () => {
		// Intercept the request to the page and modify the response body
		cy.intercept( 'http://localhost:8889/wp-admin/post-new.php?post_type=page', ( req ) => {
			req.continue( ( res ) => {
				// Use a regular expression to match the coblocksLabs object
				const regex = /var\s+coblocksLabs\s*=\s*\{[^]*?\};/;

				// Replace the original coblocksLabs object with the new values
				res.body = res.body.replace(
					regex,
					'var coblocksLabs = { isGoSiteEditor: "1", isGoThemeActive: "1", isGoThemeInstalled: "1", goThemeInstallUri: "http://localhost:8889/wp-admin/theme-install.php?theme=go", goThemeDetailsUri: "http://localhost:8889/wp-admin/themes.php?theme=go", launchGuideEligible: "" };'
				);
			} );
		} );

		cy.visit( 'http://localhost:8889/wp-admin/post-new.php?post_type=page' );

		// Open CoBlocks Labs settings
		helpers.openCoBlocksLabsModal();

		const assertions = [
			( element ) => cy.wrap( element ).should( 'not.be.disabled' ), // Assertion for the first checkbox
			( element ) => cy.wrap( element ).should( 'be.disabled' ), // Assertion for the second checkbox
			( element ) => cy.wrap( element ).should( 'not.be.disabled' ), // Assertion for the third checkbox
		];

		cy.get( '.coblocks-labs-modal__section__vertical-group' )
			.find( 'input[type="checkbox"]' )
			.each( ( element, index ) => {
				assertions[ index ]( element );
			} );

		// Intercept the request to the page and modify the response body
		cy.intercept( 'http://localhost:8889/wp-admin/post-new.php?post_type=page', ( req ) => {
			req.continue( ( res ) => {
				// Use a regular expression to match the coblocksLabs object
				const regex = /var\s+coblocksLabs\s*=\s*\{[^]*?\};/;

				// Replace the original coblocksLabs object with the new values
				res.body = res.body.replace(
					regex,
					'var coblocksLabs = { isGoSiteEditor: "", isGoThemeActive: "1", isGoThemeInstalled: "1", goThemeInstallUri: "http://localhost:8889/wp-admin/theme-install.php?theme=go", goThemeDetailsUri: "http://localhost:8889/wp-admin/themes.php?theme=go", launchGuideEligible: "" };'
				);
			} );
		} );

		cy.visit( 'http://localhost:8889/wp-admin/post-new.php?post_type=page' );

		// Open CoBlocks Labs settings
		helpers.openCoBlocksLabsModal();

		const assertions2 = [
			( element ) => cy.wrap( element ).should( 'not.be.disabled' ), // Assertion for the first checkbox
			( element ) => cy.wrap( element ).should( 'not.be.disabled' ), // Assertion for the second checkbox
			( element ) => cy.wrap( element ).should( 'not.be.disabled' ), // Assertion for the third checkbox
		];

		cy.get( '.coblocks-labs-modal__section__vertical-group' )
			.find( 'input[type="checkbox"]' )
			.each( ( element, index ) => {
				assertions2[ index ]( element );
			} );
	} );
} );
