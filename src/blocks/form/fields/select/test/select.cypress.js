/*
 * Include our constants
 */
import * as helpers from '../../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Form Block', function() {
	/**
	 * Test the coblocks form select field transforms.
	 */
	it( 'should transform from coblocks/field-select block to coblocks/field-checkbox, coblocks/field-radio', function() {

		let blocksToTransformTo = [
			'Checkbox',
			'Radio',
		];

		let blocksToRemove = [
			'name',
			'email',
			'textarea',
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

		// Add the select field to the
		cy.get( '[data-type="coblocks/field-email"]' )
			.click( { force: true } );

		cy.get( '.edit-post-header-toolbar .edit-post-header-toolbar__inserter-toggle' )
			.click()
			.get( '.editor-block-list-item-coblocks-field-select' )
			.click();

		// Remove all unnecessary fields.
		for ( var x = 0; x < blocksToRemove.length; x++ ) {

			cy.get( `[data-type="coblocks/field-${blocksToRemove[ x ]}"]` )
				.click( { force: true } )
				.type( '{backspace}' );

		}

		cy.get( '[data-type="coblocks/field-select"]' )
			.click( { force: true } );

		cy.get( '.coblocks-field-multiple__list li:first-child' )
			.type( 'Select 1' );

		// Test the transforms work as intended.
		for ( var index = 0; index < blocksToTransformTo.length; index++ ) {

			var textToFind = blocksToTransformTo[ index ];
			var blockName  = blocksToTransformTo[ index ].toLowerCase();

			// Switch the select field to another type.
			cy.get( '[data-type="coblocks/field-select"]' )
				.click( { force: true } );

			cy.get( '.block-editor-block-switcher__toggle' )
				.click()
				.get( `.editor-block-list-item-coblocks-field-${blockName}` )
				.click();

			// Check the select field transformed properly.
			helpers.checkForBlockErrors( 'coblocks/form' );

			cy.get( '.block-editor-block-card__title' )
				.contains( textToFind );

			cy.get( `[data-type="coblocks/field-${blockName}"]` )
				.click( { force: true } );

			// Switch it back to the original state to transform to the next type.
			cy.get( '.block-editor-block-switcher__toggle' )
				.click()
				.get( '.editor-block-list-item-coblocks-field-select' )
				.click();

		}

		helpers.savePage();

	} );
} );
