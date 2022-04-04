import {
	openComplementaryArea,
	openSettingsPanel,
} from '../../../../.dev/tests/cypress/helpers.js';

before( () => {
	cy.intercept( 'GET', '**rest_route=/wp/v2/pages**' ).as( 'getPages' );
	cy.intercept( 'GET', '**rest_route=/wp/v2/posts**' ).as( 'getPosts' );

	openComplementaryArea( 'Site contents' );

	// Make sure our data has loaded.
	cy.wait( '@getPages' ).its( 'response.statusCode' ).should( 'eq', 200 );
	cy.wait( '@getPosts' ).its( 'response.statusCode' ).should( 'eq', 200 );
} );

const newPageName = 'Site Content New Page';
const newPostName = 'Site Content New Post';

describe( 'CoBlocks Site Content Component', () => {
	beforeEach( () => {
		cy.intercept( 'GET', '**rest_route=/wp/v2/pages**' ).as( 'getPages' );
		cy.intercept( 'POST', '**%2Fwp%2Fv2%2Fpages**' ).as( 'postPages' );
		cy.intercept( 'GET', '**rest_route=%2Fwp%2Fv2%2Fposts**' ).as( 'getPosts' );
		cy.intercept( 'POST', '**%2Fwp%2Fv2%2Fposts**' ).as( 'postPosts' );

		cy.get( '.interface-interface-skeleton__sidebar .content-management' )
			.find( '.components-panel__body-title' )
			.contains( 'Pages' )
			.closest( '.content-management__panel' )
			.as( 'panelPages' );

		cy.get( '.interface-interface-skeleton__sidebar .content-management' )
			.find( '.components-panel__body-title' )
			.contains( 'Posts' )
			.closest( '.content-management__panel' )
			.as( 'panelPosts' );
	} );

	it( 'loads the site content sidebar', () => {
		cy.get( '@panelPages' ).should( 'exist' );
		cy.get( '@panelPosts' ).should( 'exist' );
	} );

	it( 'can create a new page', () => {
		openSettingsPanel( 'Pages' );

		cy.get( '@panelPages' ).find( '.content-management__add-new-button' ).click();
		cy.wait( '@postPages' ).its( 'response.statusCode' ).should( 'eq', 201 );
		cy.wait( '@getPages' ).its( 'response.statusCode' ).should( 'eq', 200 );
		cy.waitUntil( () => cy.get( '@panelPages' ).contains( '.content-management__panel__row', '(no title)' ) );
		cy.get( '@panelPages' ).contains( '.content-management__panel__row', '(no title)' ).should( 'exist' );

		// Edit and save page.
		cy.get( '.editor-post-title__input' ).type( newPageName );
		cy.get( '.editor-post-publish-button' ).click();
		cy.wait( '@getPages' ).its( 'response.statusCode' ).should( 'eq', 200 );
		cy.get( '@panelPages' ).contains( '.content-management__panel__row', newPageName ).should( 'exist' );
	} );

	it( 'can create a new post', () => {
		openSettingsPanel( 'Posts' );

		cy.get( '@panelPosts' ).find( '.content-management__add-new-button' ).click();

		cy.wait( '@postPosts' ).its( 'response.statusCode' ).should( 'eq', 201 );
		cy.waitUntil( () => cy.get( '@panelPosts' ).contains( '.content-management__panel__row', '(no title)' ) );
		cy.get( '@panelPosts' ).contains( '.content-management__panel__row', '(no title)' ).should( 'exist' );

		// Edit and save post.
		cy.get( '.editor-post-title__input' ).type( newPostName );
		cy.get( '.editor-post-publish-button' ).click();
		cy.get( '@panelPosts' ).contains( '.content-management__panel__row', newPostName ).should( 'exist' );
	} );

	it( 'can load the page created in previous test', () => {
		openSettingsPanel( 'Pages' );
		cy.get( '@panelPages' ).contains( '.content-management__panel__row', newPageName ).click();
		cy.get( '.editor-post-title__input' ).should( 'have.value', newPageName );
	} );
} );
