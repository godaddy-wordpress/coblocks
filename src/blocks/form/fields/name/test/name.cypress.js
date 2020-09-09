/*
 * Include our constants
 */
import * as helpers from '../../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Form Block', function() {
	/**
	 * Test the coblocks form name field transforms.
	 */
	it( 'should transform from coblocks/field-name block to coblocks/field-date, coblocks/field-textarea, coblocks/field-phone, coblocks/field-text, coblocks/field-website, coblocks/field-hidden', function() {

		let blocksToTransformTo = [
			'Date',
			'Phone',
			'Textarea',
			'Text',
			'Website',
			'Hidden',
		];

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

		// Remove fields other than the name field.
		cy.get( '[data-type="coblocks/field-email"]' )
			.click( { force: true } )
			.type( '{backspace}' );

		cy.get( '[data-type="coblocks/field-textarea"]' )
			.click( { force: true } )
			.type( '{backspace}' );

		for ( var index = 0; index < blocksToTransformTo.length; index++ ) {

			var textToFind = blocksToTransformTo[ index ];
			var blockName  = blocksToTransformTo[ index ].toLowerCase();

			// Switch the name field to another type.
			cy.get( '[data-type="coblocks/field-name"]' )
				.click( { force: true } );

			cy.get( '.block-editor-block-switcher__toggle' )
				.click()
				.get( `.editor-block-list-item-coblocks-field-${blockName}` )
				.click();

			// Check the name field transformed properly.
			helpers.checkForBlockErrors( 'coblocks/form' );

			cy.get( '.block-editor-block-card__title' )
				.contains( textToFind );

			cy.get( `[data-type="coblocks/field-${blockName}"]` )
				.click( { force: true } );

			// Switch it back to the original state to transform to the next type.
			cy.get( '.block-editor-block-switcher__toggle' )
				.click()
				.get( '.editor-block-list-item-coblocks-field-name' )
				.click();

		}

		helpers.savePage();

	} );
} );
