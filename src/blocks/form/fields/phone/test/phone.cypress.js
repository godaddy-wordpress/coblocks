/*
 * Include our constants
 */
import * as helpers from '../../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Form Block', function() {
	/**
	 * Test the coblocks form phone field transforms.
	 */
	it( 'should transform from coblocks/field-phone block to coblocks/field-date, coblocks/field-name, coblocks/field-textarea, coblocks/field-text, coblocks/field-website, coblocks/field-hidden', function() {

		let blocksToTransformTo = [
			'Name',
			'Textarea',
			'Date',
			'Text',
			'Website',
			'Hidden',
		];

		let blocksToRemove = [
			'name',
			'textarea',
			'email',
			'radio',
			'date',
		];

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

		// Remove all fields and add a date field.
		for ( var x = 0; x < blocksToRemove.length; x++ ) {

			cy.get( `[data-type="coblocks/field-${blocksToRemove[ x ]}"]` )
				.click( { force: true } )
				.type( '{backspace}' );

		}

		// Test the transforms work as intended.
		for ( var index = 0; index < blocksToTransformTo.length; index++ ) {

			var textToFind = blocksToTransformTo[ index ];
			var blockName  = blocksToTransformTo[ index ].toLowerCase();

			// Switch the phone field to another type.
			cy.get( '[data-type="coblocks/field-phone"]' )
				.click( { force: true } );

			cy.get( '.block-editor-block-switcher__toggle' )
				.click()
				.get( `.editor-block-list-item-coblocks-field-${blockName}` )
				.click();

			// Check the phone field transformed properly.
			helpers.checkForBlockErrors( 'coblocks/form' );

			cy.get( '.block-editor-block-card__title' )
				.contains( textToFind );

			cy.get( `[data-type="coblocks/field-${blockName}"]` )
				.click( { force: true } );

			// Switch it back to the original state to transform to the next type.
			cy.get( '.block-editor-block-switcher__toggle' )
				.click()
				.get( '.editor-block-list-item-coblocks-field-phone' )
				.click();

		}

		helpers.savePage();

	} );
} );
