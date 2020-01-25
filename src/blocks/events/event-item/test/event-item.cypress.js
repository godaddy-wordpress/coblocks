/*
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks event-item Block', function() {
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

	/**
	 * Test that we can add a event-item block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	*/
	it( 'Test event-item block saves without content.', function() {
		helpers.addCoBlocksBlockToPage( true, 'events' );

		cy.get( '.wp-block-coblocks-event-item' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'event-item' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-event-item' ).should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a event-item block to the content, add
     * custom content and save block without errors.
	*/
	it( 'Test event-item block saves with custom content.', function() {
		const { date, event, time, location } = eventItemData;

		helpers.addCoBlocksBlockToPage( true, 'events' );

		cy.get( '.wp-block-coblocks-events' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-events__day' ).click( { force: true } ).type( date.day );
		cy.get( '.wp-block-coblocks-events__month' ).type( date.month );
		cy.get( '.wp-block-coblocks-events__year' ).type( date.year );
		cy.get( '.wp-block-coblocks-events__title' ).type( event.title );
		cy.get( '.wp-block-coblocks-events__description' ).type( event.description );
		cy.get( '.wp-block-coblocks-events__time' ).type( time );
		cy.get( '.wp-block-coblocks-events__location' ).type( location );

		helpers.savePage();

		helpers.checkForBlockErrors( 'events' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-events' ).should( 'exist' );

		cy.get( '.wp-block-coblocks-events' ).then( $eventsBlock => {
			cy.get( $eventsBlock ).find( '.wp-block-coblocks-events__day' ).contains( date.day ).should( 'be.visible' );
			cy.get( $eventsBlock ).find( '.wp-block-coblocks-events__month' ).contains( date.month ).should( 'be.visible' );
			cy.get( $eventsBlock ).find( '.wp-block-coblocks-events__year' ).contains( date.year ).should( 'be.visible' );
			cy.get( $eventsBlock ).find( '.wp-block-coblocks-events__title' ).contains( event.title ).should( 'be.visible' );
			cy.get( $eventsBlock ).find( '.wp-block-coblocks-events__description' ).contains( event.description ).should( 'be.visible' );
			cy.get( $eventsBlock ).find( '.wp-block-coblocks-events__time' ).contains( time ).should( 'be.visible' );
			cy.get( $eventsBlock ).find( '.wp-block-coblocks-events__location' ).contains( location ).should( 'be.visible' );
		} );

		helpers.editPage();
	} );

	/**
	* Test that we can add a event-item block to the content, adjust colors
	* and are able to successfully save the block without errors.
	*/
	it( 'Test event-item block saves with color values set.', function() {
		const { textColor, textColorRGB } = eventItemData.color;
		const { date } = eventItemData;

		helpers.addCoBlocksBlockToPage( true, 'events' );

		cy.get( '.wp-block-coblocks-event-item' ).click( { force: true } );

		cy.get( '.wp-block-coblocks-events__day' ).click( { force: true } ).type( date.day );

		helpers.openSettingsPanel( /advanced/i );
		helpers.setColorSetting( 'text color', textColor );

		helpers.savePage();

		helpers.checkForBlockErrors( 'event-item' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-events' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-event-item' )
			.should( 'have.css', 'color', textColorRGB );

		helpers.editPage();
	} );

	/**
	* Test the event-item block saves with custom classes
	*/
	it( 'Test event-item block saves with custom classes.', function() {
		const { date } = eventItemData;

		helpers.addCoBlocksBlockToPage( true, 'events' );

		cy.get( '.wp-block-coblocks-event-item' ).click( { force: true } );

		cy.get( '.wp-block-coblocks-events__day' ).click( { force: true } ).type( date.day );

		helpers.addCustomBlockClass( 'my-custom-class', 'event-item' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'event-item' );

		cy.get( '.wp-block-coblocks-event-item' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-event-item' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );

