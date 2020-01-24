/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Events Block', function() {
	// Setup events data.
	const eventsData = {
		ical: 'https://calendar.google.com/calendar/ical/8hohgb8qv19fgvjbbkcehe0ce0%40group.calendar.google.com/public/basic.ics',
		color: {
			textColor: '#ffffff',
			textColorRGB: 'rgb(255, 255, 255)',
		},
	};

	/**
	 * Test that we can add a events block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	*/
	it( 'Test events block saves without content.', function() {
		helpers.addCoBlocksBlockToPage( true, 'events' );

		cy.get( '.wp-block-coblocks-events' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'events' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-events' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a events block to the content, and
	 * import a calendar from a public ICS Google calendar
	*/
	it( 'Test events block saves with imported ICS calendar.', function() {
		const { ical } = eventsData;
		helpers.addCoBlocksBlockToPage( true, 'events' );

		cy.get( '.wp-block-coblocks-events' ).click( { force: true } ).should( 'exist' );

		helpers.toggleSettingCheckbox( /link a calendar/i );

		cy.get( 'input[placeholder="Enter URL here…"]' ).click().type( ical );
		cy.get( 'button' ).contains( 'Use URL' ).click();

		cy.get( '.wp-block-coblocks-event-item', { timeout: 10000 } ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'events' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-event-item' ).should( 'be.visible' );

		helpers.editPage();
	} );

	/**
	* Test the events block saves with custom classes
	*/
	it( 'Test events block saves with custom classes.', function() {
		helpers.addCoBlocksBlockToPage( true, 'events' );

		cy.get( '.wp-block-coblocks-events' ).click( { force: true } );

		helpers.addCustomBlockClass( 'my-custom-class', 'events' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'events' );

		cy.get( '.wp-block-coblocks-events' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-events' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );
