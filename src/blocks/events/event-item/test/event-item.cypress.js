/**
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Block: Event Item', () => {
	// Setup event-item data.
	const eventItemData = {
		date: {
			day: '21st',
			month: 'July',
			year: '2020',
		},
		event: {
			title: 'Family reunion',
			description: 'The whole family is driving down for a big gathering.',
		},
		time: 1600,
		location: 'North 1st Street',
		color: {
			textColor: '#ffffff',
			textColorRGB: 'rgb(255, 255, 255)',
		},
	};

	beforeEach( () => {
		helpers.addBlockToPost( 'coblocks/events', true );
	} );

	/**
	 * Test that we can add a event-item block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	 */
	it( 'can be inserted without errors', () => {
		cy.get( '.wp-block-coblocks-event-item' ).should( 'exist' );
		helpers.checkForBlockErrors( 'coblocks/event-item' );
	} );

	/**
	 * Test that we can add a event-item block to the content, add
	 * custom content and save block without errors.
	 */
	it( 'can save with custom content without errors', () => {
		const { date, event, time, location } = eventItemData;

		cy.get( '[data-type="coblocks/events"]' ).first().within( () => {
			cy.get( '.wp-block-coblocks-events__day' ).type( date.day );
			cy.get( '.wp-block-coblocks-events__month' ).type( date.month );
			cy.get( '.wp-block-coblocks-events__year' ).type( date.year );
			cy.get( '.wp-block-coblocks-events__title' ).type( event.title );
			cy.get( '.wp-block-coblocks-events__description' ).type( event.description );
			cy.get( '.wp-block-coblocks-events__time' ).type( time );
			cy.get( '.wp-block-coblocks-events__location' ).type( location );
		} );

		helpers.savePage();
		helpers.checkForBlockErrors( 'coblocks/events' );
	} );

	/**
	 * Test that we can add a event-item block to the content, adjust colors
	 * and are able to successfully save the block without errors.
	 */
	it( 'can set a custom text color', () => {
		const { textColor, textColorRGB } = eventItemData.color;
		const { date } = eventItemData;

		cy.get( '.wp-block-coblocks-event-item' ).click();

		cy.get( '.wp-block-coblocks-events__day' ).type( date.day );

		helpers.setColorSettingsFoldableSetting( 'text color', textColor );
		cy.get( '.wp-block-coblocks-event-item' ).should( 'have.css', 'color', textColorRGB );

		helpers.checkForBlockErrors( 'coblocks/event-item' );
	} );

	/**
	 * Test the event-item block saves with custom classes
	 */
	it( 'Test event-item block saves with custom classes.', () => {
		const { date } = eventItemData;

		cy.get( '.wp-block-coblocks-event-item' ).click();
		cy.get( '.wp-block-coblocks-events__day' ).type( date.day );

		helpers.addCustomBlockClass( 'my-custom-class', 'event-item' );
		cy.get( '.wp-block-coblocks-event-item' ).should( 'have.class', 'my-custom-class' );

		helpers.checkForBlockErrors( 'coblocks/event-item' );
	} );
} );

