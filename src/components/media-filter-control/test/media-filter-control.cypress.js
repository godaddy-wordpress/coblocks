/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

const filters = [
	'Original',
	'Grayscale',
	'Sepia',
	'Saturation',
	'Dim',
	'Vintage',
];

describe( 'Test CoBlocks Media Filter Control component', function() {
	/**
	 * Test that we can add a image block to the content add image,
	 * and alter image using the media filter control component
	 */
	it( 'Test core/image block extends with Media Filter Control component.', function() {
		helpers.disableGutenbergFeatures(); // Ensure top toolbar is set for all tests.

		helpers.addBlockToPost( 'core/image', true );

		helpers.upload.imageToBlock( 'core/image' );

		cy.get( '.block-editor-block-toolbar__slot .components-coblocks-media-filter .components-dropdown-menu__toggle' )
			.should( 'be.visible' )
			.click();

		let childIteration = 1;

		// Check the menu contains the expected filters
		for ( let i = 0; i < filters.length; i++ ) {
			cy.get( '.components-dropdown-menu__menu button:nth-child(' + childIteration + ')' )
				.contains( filters[ i ] );
			childIteration++;
		}

		childIteration = 1;

		// Check the classes are applied correctly to the block
		for ( let i = 0; i < filters.length; i++ ) {
			cy.get( '.components-dropdown-menu__menu button:nth-child(' + childIteration + ')' )
				.click();

			// 'Original' filter does not add any class to the element
			if ( 1 === childIteration ) {
				cy.get( '.wp-block-image' )
					.should( 'not.have.class', 'has-filter-original' )
					.and( 'not.have.class', 'has-filter-grayscale' )
					.and( 'not.have.class', 'has-filter-sepia' )
					.and( 'not.have.class', 'has-filter-saturation' )
					.and( 'not.have.class', 'has-filter-dim' )
					.and( 'not.have.class', 'has-filter-vintage' );

				helpers.savePage();
				helpers.checkForBlockErrors( 'core/image' );

				cy.get( '.wp-block-image' )
					.click();

				cy.get( '.block-editor-block-toolbar__slot .components-coblocks-media-filter' )
					.click();

				childIteration++;

				continue;
			}

			const filterSlug = filters[ i ].toLowerCase();

			cy.get( '.wp-block-image' )
				.should( 'have.class', 'has-filter-' + filterSlug );

			helpers.savePage();
			helpers.checkForBlockErrors( 'core/image' );

			cy.get( '.wp-block-image' )
				.click();

			cy.get( '.block-editor-block-toolbar__slot .components-coblocks-media-filter' )
				.click();

			childIteration++;
		}

		cy.reload();
	} );

	/**
	 * Test that we can add a gallery block to the content add image,
	 * and alter image using the Lightbox Controls extension
	 */
	it( 'Test core/gallery block extends with Media Filter Control component.', function() {
		// Remove the fixed toolbar that sometime causes a detached element of the DOM
		helpers.disableGutenbergFeatures(); // Ensure top toolbar is set for all tests.

		helpers.addBlockToPost( 'core/gallery', true );

		helpers.upload.imageToBlock( 'core/gallery' );

		cy.get( '.block-editor-block-toolbar__slot .components-coblocks-media-filter' )
			.should( 'exist' )
			.click();

		let childIteration = 1;

		// Check the menu contains the expected filters
		for ( let i = 0; i < filters.length; i++ ) {
			cy.get( '.components-dropdown-menu__menu button:nth-child(' + childIteration + ')' )
				.contains( filters[ i ] );
			childIteration++;
		}

		childIteration = 1;

		// Check the classes are applied correctly to the block
		for ( let i = 0; i < filters.length; i++ ) {
			cy.get( '.components-popover__content [aria-label="Apply filter"] .components-menu-group' ).should( 'exist' );
			cy.get( '.components-dropdown-menu__menu button:nth-child(' + childIteration + ')' ).click();

			// 'Original' filter does not add any class to the element
			if ( 1 === childIteration ) {
				cy.get( '.wp-block-gallery' )
					.should( 'not.have.class', 'has-filter-original' )
					.and( 'not.have.class', 'has-filter-grayscale' )
					.and( 'not.have.class', 'has-filter-sepia' )
					.and( 'not.have.class', 'has-filter-saturation' )
					.and( 'not.have.class', 'has-filter-dim' )
					.and( 'not.have.class', 'has-filter-vintage' );

				helpers.savePage();
				helpers.checkForBlockErrors( 'core/gallery' );

				cy.get( '.wp-block-gallery' )
					.click();

				cy.get( '.block-editor-block-toolbar__slot .components-coblocks-media-filter' )
					.click();

				childIteration++;

				continue;
			}

			const filterSlug = filters[ i ].toLowerCase();

			cy.get( '[data-type="core/gallery"] figure, [data-type="core/gallery"]' )
				.should( 'have.class', 'has-filter-' + filterSlug );

			helpers.savePage();
			helpers.checkForBlockErrors( 'core/gallery' );

			cy.get( '.wp-block-gallery' )
				.click();

			cy.get( '.block-editor-block-toolbar__slot .components-coblocks-media-filter' )
				.click();

			childIteration++;
		}

		cy.reload();
	} );
} );
