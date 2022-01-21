/**
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Block: Events', function() {
	// Setup events data.
	const eventsData = {
		ical: 'https://calendar.google.com/calendar/ical/8hohgb8qv19fgvjbbkcehe0ce0%40group.calendar.google.com/public/basic.ics',
		color: {
			textColor: '#ffffff',
			textColorRGB: 'rgb(255, 255, 255)',
		},
	};

	beforeEach( () => {
		helpers.addBlockToPost( 'coblocks/events', true );
	} );

	/**
	 * Test that we can add a events block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'can be inserted without errors', function() {
		cy.get( '.wp-block-coblocks-events' ).should( 'exist' );
		helpers.checkForBlockErrors( 'coblocks/events' );
	} );

	/**
	 * Test that we can add a events block to the content, and
	 * import a calendar from a public ICS Google calendar
	 */
	it( 'can import an ICS calendar', function() {
		const { ical } = eventsData;

		helpers.toggleSettingCheckbox( /link a calendar/i );

		cy.get( '[data-type="coblocks/events"]' ).first().within( () => {
			cy.get( 'input[placeholder="Enter URL here…"]' ).type( ical, { delay: 0 } );
			cy.get( 'button' ).contains( 'Use URL' ).click();
		} );

		cy.get( '.wp-block-coblocks-event-item', { timeout: 10000 } ).should( 'exist' );

		helpers.checkForBlockErrors( 'coblocks/events' );
	} );

	/**
	 * Test that multiple event items display as expected
	 */
	it( 'can add multiple event item blocks', () => {
		cy.get( '.coblocks-block-appender > button' ).trigger( 'click' );

		cy.get( '[data-type="coblocks/events"]' ).find( '[data-type="coblocks/event-item"]' ).should( 'have.length', 2 );

		helpers.checkForBlockErrors( 'coblocks/events' );
	} );

	/**
	 * Test the events block saves with custom classes
	 */
	it( 'can set custom classes', function() {
		// Workaround for the advanced panel not loading consistently.
		cy.get( '.editor-post-title' ).click();

		helpers.addCustomBlockClass( 'my-custom-class', 'events' );
		cy.get( '.wp-block-coblocks-events' ).last().should( 'have.class', 'my-custom-class' );

		helpers.checkForBlockErrors( 'coblocks/events' );
	} );
} );
