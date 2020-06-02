/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Form Block', function() {
	/**
	 * Test the coblock contact template.
	 */
	it( 'Test the form block contact template.', function() {
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( 'div.wp-block[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
			if ( placeholder.prop( 'outerHTML' ).includes( 'block-editor-block-variation-picker' ) ) {
				cy.get( placeholder )
					.find( '.block-editor-block-variation-picker__variations li:first-child' )
					.find( 'button' ).click( { force: true } );
			} else {
				cy.get( '.block-editor-inner-blocks__template-picker-options li:first-child' )
					.click();

				cy.get( '.block-editor-inner-blocks__template-picker-options' )
					.should( 'not.exist' );
			}
		} );

		cy.get( 'div[data-type="coblocks/field-name"]' )
			.should( 'exist' );

		cy.get( 'div[data-type="coblocks/field-email"]' )
			.should( 'exist' );

		cy.get( 'div[data-type="coblocks/field-textarea"]' )
			.should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/form' );

		helpers.viewPage();

		cy.get( '.coblocks-form' )
			.should( 'exist' );

		// Check labels
		cy.get( '.coblocks-label' ).each( ( $element, $index ) => {
			switch ( $index ) {
				case 0:
					cy.get( $element ).contains( 'Name' );
					break;

				case 1:
					cy.get( $element ).contains( 'Email' );
					break;

				case 2:
					cy.get( $element ).contains( 'Message' );
					break;
			}
		} );

		cy.get( 'input[name="field-name[value]"]' )
			.should( 'exist' );

		cy.get( 'input[name="field-email[value]"]' )
			.should( 'exist' );

		cy.get( 'textarea[name="field-message[value]"]' )
			.should( 'exist' );

		cy.get( '.coblocks-form__submit button' )
			.contains( 'Contact Us' );

		helpers.editPage();
	} );

	/**
	 * Test the coblock RSVP template.
	 */
	it( 'Test the form block RSVP template.', function() {
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( 'div.wp-block[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
			if ( placeholder.prop( 'outerHTML' ).includes( 'block-editor-block-variation-picker' ) ) {
				cy.get( placeholder )
					.find( '.block-editor-block-variation-picker__variations li:nth-child(2)' )
					.find( 'button' ).click( { force: true } );
			} else {
				cy.get( '.block-editor-inner-blocks__template-picker-options li:nth-child(2)' )
					.click();

				cy.get( '.block-editor-inner-blocks__template-picker-options' )
					.should( 'not.exist' );
			}
		} );

		cy.get( '.coblocks-field--name' )
			.its( 'length' )
			.should( 'equal', 2 );

		cy.get( 'div[data-type="coblocks/field-email"]' )
			.should( 'exist' );

		cy.get( 'div[data-type="coblocks/field-radio"]' )
			.should( 'exist' );

		cy.get( 'div[data-type="coblocks/field-textarea"]' )
			.should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/form' );

		helpers.viewPage();

		cy.get( '.coblocks-form' )
			.should( 'exist' );

		// Check labels
		cy.get( '.coblocks-label' ).each( ( $element, $index ) => {
			switch ( $index ) {
				case 0:
					cy.get( $element ).contains( 'Name' );
					break;

				case 1:
					cy.get( $element ).contains( 'Plus one' );
					break;

				case 2:
					cy.get( $element ).contains( 'Email' );
					break;

				case 3:
					cy.get( $element ).contains( 'Will you be attending?' );
					break;

				case 4:
					cy.get( $element ).contains( 'Notes?' );
					break;
			}
		} );

		cy.get( 'input[name="field-name[value][first-name]"]' )
			.should( 'exist' );

		cy.get( 'input[name="field-name[value][last-name]"]' )
			.should( 'exist' );

		cy.get( 'input[name="field-plus-one-2[value][first-name]"]' )
			.should( 'exist' );

		cy.get( 'input[name="field-plus-one-2[value][last-name]"]' )
			.should( 'exist' );

		cy.get( 'input[name="field-email[value]"]' )
			.should( 'exist' );

		cy.get( 'input[name="field-will-you-be-attending[value]"]' )
			.should( 'exist' );

		cy.get( 'textarea[name="field-notes[value]"]' )
			.should( 'exist' );

		cy.get( '.coblocks-form__submit button' )
			.contains( 'RSVP' );

		helpers.editPage();
	} );

	/**
	 * Test the coblock appointment template.
	 */
	it( 'Test the form block appointment template.', function() {
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( 'div.wp-block[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
			if ( placeholder.prop( 'outerHTML' ).includes( 'block-editor-block-variation-picker' ) ) {
				cy.get( placeholder )
					.find( '.block-editor-block-variation-picker__variations li:nth-child(3)' )
					.find( 'button' ).click( { force: true } );
			} else {
				cy.get( '.block-editor-inner-blocks__template-picker-options li:nth-child(3)' )
					.click();

				cy.get( '.block-editor-inner-blocks__template-picker-options' )
					.should( 'not.exist' );
			}
		} );

		cy.get( '.coblocks-field--name' )
			.should( 'exist' );

		cy.get( 'div[data-type="coblocks/field-phone"]' )
			.should( 'exist' );

		cy.get( 'div[data-type="coblocks/field-email"]' )
			.should( 'exist' );

		cy.get( 'div[data-type="coblocks/field-textarea"]' )
			.should( 'exist' );

		cy.get( 'div[data-type="coblocks/field-date"]' )
			.should( 'exist' );

		cy.get( 'div[data-type="coblocks/field-radio"]' )
			.should( 'exist' );

		cy.get( 'div[data-type="coblocks/field-textarea"]' )
			.should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/form' );

		helpers.viewPage();

		cy.get( '.coblocks-form' )
			.should( 'exist' );

		// Check labels
		cy.get( '.coblocks-label' ).each( ( $element, $index ) => {
			switch ( $index ) {
				case 0:
					cy.get( $element ).contains( 'Name' );
					break;

				case 1:
					cy.get( $element ).contains( 'Phone' );
					break;

				case 2:
					cy.get( $element ).contains( 'Email' );
					break;

				case 3:
					cy.get( $element ).contains( 'Date' );
					break;

				case 4:
					cy.get( $element ).contains( 'Time' );
					break;

				case 5:
					cy.get( $element ).contains( 'Special notes' );
					break;
			}
		} );

		cy.get( 'input[name="field-name[value][first-name]"]' )
			.should( 'exist' );

		cy.get( 'input[name="field-name[value][last-name]"]' )
			.should( 'exist' );

		cy.get( 'input[name="field-phone[value]"]' )
			.should( 'exist' );

		cy.get( 'input[name="field-email[value]"]' )
			.should( 'exist' );

		cy.get( 'input[name="field-date[value]' )
			.should( 'exist' );

		cy.get( 'input[name="field-time[value]"]' )
			.its( 'length' )
			.should( 'equal', 2 );

		cy.get( 'textarea[name="field-special-notes[value]"]' )
			.should( 'exist' );

		cy.get( '.coblocks-form__submit button' )
			.contains( 'Book Appointment' );

		helpers.editPage();
	} );

	/**
	 * Test the coblock contact template.
	 */
	it( 'Test the form block email is sent and received.', function() {
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( 'div.wp-block[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
			if ( placeholder.prop( 'outerHTML' ).includes( 'block-editor-block-variation-picker' ) ) {
				cy.get( placeholder )
					.find( '.block-editor-block-variation-picker__variations li:first-child' )
					.find( 'button' ).click( { force: true } );
			} else {
				cy.get( '.block-editor-inner-blocks__template-picker-options li:first-child' )
					.click();

				cy.get( '.block-editor-inner-blocks__template-picker-options' )
					.should( 'not.exist' );
			}
		} );

		helpers.savePage();
		helpers.viewPage();

		cy.get( '.coblocks-form' )
			.should( 'exist' );

		cy.get( 'input[name="field-name[value]"]' )
			.type( 'Name' );

		cy.get( 'input[name="field-email[value]"]' )
			.type( 'email@example.com' );

		cy.get( 'textarea[name="field-message[value]"]' )
			.type( 'My message for you.' );

		cy.get( '.coblocks-form__submit button' )
			.click();

		cy.get( '.coblocks-form__submitted' ).contains( 'Your message was sent:' );

		cy.get( '.coblocks-form__submitted ul li:first-child' ).contains( 'Name: Name' );
		cy.get( '.coblocks-form__submitted ul li:nth-child(2)' ).contains( 'Email: email@example.com' );
		cy.get( '.coblocks-form__submitted ul li:last-child' ).contains( 'Message: My message for you.' );

		cy.exec( 'curl http://127.0.0.1:8025/api/v2/messages' )
			.its( 'stdout' )
			.should( 'contain', 'Name: Name' )
			.should( 'contain', 'Email: email@example.com' )
			.should( 'contain', 'Message: My message for you.' );

		helpers.editPage();
	} );

	/**
	 * Test the [email] and [name] links work and that the custom subject line field is used in the email.
	 */
	it( 'Test the form block custom subject line sends as intended.', function() {
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( 'div.wp-block[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
			if ( placeholder.prop( 'outerHTML' ).includes( 'block-editor-block-variation-picker' ) ) {
				cy.get( placeholder )
					.find( '.block-editor-block-variation-picker__variations li:first-child' )
					.find( 'button' ).click( { force: true } );
			} else {
				cy.get( '.block-editor-inner-blocks__template-picker-options li:first-child' )
					.click();

				cy.get( '.block-editor-inner-blocks__template-picker-options' )
					.should( 'not.exist' );
			}
		} );

		cy.get( '.wp-block[data-type="coblocks/form"]' )
			.click( { force: true } );

			cy.get( 'div.edit-post-sidebar' )
				.contains( /Subject/i )
				.next( 'input' )
				.then( ( $inputElem ) => {
					cy.get( $inputElem ).invoke( 'val' ).then( ( val ) => {
						cy.get( $inputElem )
							.clear()
							.type( 'Custom Subject Line: Email From ' );

						cy.get( 'button.components-button' )
							.contains( '[email]' )
							.click();

						cy.get( $inputElem ).type( ' - ' );

						cy.get( 'button.components-button' )
							.contains( '[name]' )
							.click();

						cy.get( $inputElem ).invoke( 'val' ).then( ( val ) => {
							cy.expect( val ).to.equal( 'Custom Subject Line: Email From [email] - [name]' );
						} );
					} );
				} );

		helpers.savePage();
		helpers.viewPage();

		cy.get( '.coblocks-form' )
			.should( 'exist' );

		cy.get( 'input[name="field-name[value]"]' )
			.type( 'Name' );

		cy.get( 'input[name="field-email[value]"]' )
			.type( 'email@example.com' );

		cy.get( 'textarea[name="field-message[value]"]' )
			.type( 'My message for you.' );

		cy.get( '.coblocks-form__submit button' )
			.click();

		cy.get( '.coblocks-form__submitted' ).contains( 'Your message was sent:' );

		cy.exec( 'curl http://127.0.0.1:8025/api/v2/messages' )
			.its( 'stdout' )
			.should( 'contain', 'Custom Subject Line: Email From email@example.com - Name' );

		helpers.editPage();
	} );
} );
