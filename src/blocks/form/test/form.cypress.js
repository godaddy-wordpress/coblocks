/* eslint-disable jest/valid-expect-in-promise */
// Disable reason: Cypress chained functions are not true promises and do not require a return.
// https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Commands-Are-Not-Promises
/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Form Block', function() {
	//setup From block color data.
	const formData = {
		textColor: '#ffffff',
		textColorRGB: 'rgb(255, 255, 255)',
	};

	/**
	 * Test the coblock contact template.
	 */
	it( 'Test the form block contact template.', function() {
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( '[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
			if ( placeholder.prop( 'outerHTML' ).includes( 'block-editor-block-variation-picker' ) ) {
				cy.get( placeholder )
					.find( '.block-editor-block-variation-picker__variations li:first-child' )
					.find( 'button' ).click( { force: true } );
			} else {
				cy.get( '.block-editor-inner-blocks__template-picker-options li:first-child' )
					.click( { force: true } );

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

		cy.get( '[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
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

		cy.get( '[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
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
	 * Test the coblock google recaptcha panel is closed on initial block add.
	 */
	it( 'Test the form block Google Recaptcha panel is closed on initial block add.', function() {
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( '[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
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

		cy.get( '.coblocks-form' )
			.should( 'exist' );

		// Check for Google Recaptcha panel visibility here
		cy.get( '.wp-block-coblocks-form.coblocks-form' )
			.click( 'bottomRight', { force: true } );

		cy.get( '.components-panel__body-title' ).contains( 'Google reCAPTCHA' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			cy.get( $parentPanel ).should( 'not.have.class', 'is-opened' );
		} );
	} );

	/**
	 * Test the coblock contact template.
	 */
	it( 'Test the form block email is sent and received.', function() {
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( '[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
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
			.type( 'Name', { force: true } );

		cy.get( 'input[name="field-email[value]"]' )
			.type( 'email@example.com', { force: true } );

		cy.get( 'textarea[name="field-message[value]"]' )
			.type( 'My message for you.', { force: true } );

		cy.get( '.coblocks-form__submit button' )
			.click();

		if ( helpers.testsNotExecutedInLocal() ) {
			cy.get( '.coblocks-form__submitted' ).contains( 'Your message was sent:' );

			cy.get( '.coblocks-form__submitted ul li:first-child' ).contains( 'Name: Name' );
			cy.get( '.coblocks-form__submitted ul li:nth-child(2)' ).contains( 'Email: email@example.com' );
			cy.get( '.coblocks-form__submitted ul li:last-child' ).contains( 'Message: My message for you.' );

			cy.exec( 'curl http://127.0.0.1:8025/api/v2/messages' )
				.its( 'stdout' )
				.should( 'contain', 'Name: Name' )
				.should( 'contain', 'Email: email@example.com' )
				.should( 'contain', 'Message: My message for you.' );
		}

		helpers.editPage();
	} );

	/**
	 * Test the [email] and [name] links work and that the custom subject line field is used in the email.
	 */
	it( 'Test the form block custom subject line sends as intended.', function() {
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( '[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
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

		cy.get( '[data-type="coblocks/form"]' )
			.click( { force: true } );

		cy.get( 'div.edit-post-sidebar' )
			.contains( /Subject/i )
			.next( 'input' )
			.then( ( $inputElem ) => {
				cy.get( $inputElem ).invoke( 'val' ).then( () => {
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
			.type( 'Name', { force: true } );

		cy.get( 'input[name="field-email[value]"]' )
			.type( 'email@example.com', { force: true } );

		cy.get( 'textarea[name="field-message[value]"]' )
			.type( 'My message for you.', { force: true } );

		cy.get( '.coblocks-form__submit button' )
			.click();

		if ( helpers.testsNotExecutedInLocal() ) {
			cy.get( '.coblocks-form__submitted' ).contains( 'Your message was sent:' );

			cy.exec( 'curl http://127.0.0.1:8025/api/v2/messages' )
				.its( 'stdout' )
				.should( 'contain', 'Custom Subject Line: Email From email@example.com - Name' );
		}

		helpers.editPage();
	} );

	/**
	 * Test the custom success message displays as intended.
	 */
	it( 'Test the custom success message displays as intended.', function() {
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( '[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
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

		cy.get( '[data-type="coblocks/form"]' )
			.click( { force: true } );

		cy.get( 'div.edit-post-sidebar' )
			.contains( /Success Message/i )
			.next( 'textarea' )
			.then( ( $inputElem ) => {
				cy.get( $inputElem ).invoke( 'val' ).then( ( ) => {
					cy.get( $inputElem )
						.clear()
						.type( 'Thank you for submitting this form!', { force: true } );
				} );
			} );

		helpers.savePage();
		helpers.viewPage();

		cy.get( '.coblocks-form' )
			.should( 'exist' );

		cy.get( 'input[name="field-name[value]"]' )
			.type( 'Name', { force: true } );

		cy.get( 'input[name="field-email[value]"]' )
			.type( 'email@example.com', { force: true } );

		cy.get( 'textarea[name="field-message[value]"]' )
			.type( 'My message for you.', { force: true } );

		cy.get( '.coblocks-form__submit button' )
			.click();

		if ( helpers.testsNotExecutedInLocal() ) {
			cy.get( '.coblocks-form__submitted' ).contains( 'Thank you for submitting this form!' );
		}

		helpers.editPage();
	} );

	/**
	 * Test that we can add a Form block to the content, adjust colors
	 * and are able to successfully save the block without errors.
	 */
	it( 'Test that color values are able to set and save.', function() {
		const { textColor, textColorRGB } = formData;
		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( '[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
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

		helpers.addFormChild( 'text' );

		helpers.addFormChild( 'radio' );
		cy.get( '.coblocks-option__input' ).type( 'text', { force: true } );

		helpers.addFormChild( 'phone' );

		helpers.addFormChild( 'checkbox' );
		cy.get( '.coblocks-option__input' ).type( 'text', { force: true } );

		helpers.addFormChild( 'select' );
		cy.get( '.coblocks-option__input' ).type( 'text', { force: true } );

		helpers.addFormChild( 'website' );

		cy.get( '[data-type="coblocks/form"]' ).click( { force: true } );

		helpers.setColorSettingsFoldableSetting( 'label color', textColor );

		helpers.savePage();

		helpers.checkForBlockErrors( 'coblocks/form' );

		helpers.viewPage();

		cy.get( '.coblocks-form' )
			.should( 'exist' );

		/**
		 * Checkbox === select
		 * Select   === select
		 * Radio    === choose-one
		 * Textarea === message.
		 */
		[ 'text', 'email', 'website', 'select', 'phone', 'choose-one', 'message', 'name' ].forEach( ( field ) => {
			cy.get( `label[for="${ field }"]` )
				.should( 'have.css', 'color', textColorRGB );
		} );
	} );
} );
