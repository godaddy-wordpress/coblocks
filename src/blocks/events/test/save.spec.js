/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import metadata from '../block.json';
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;

describe( 'coblocks/events', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings, attributes: metadata.attributes } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );
	} );

	it( 'should render without content', () => {
		const serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with className', () => {
		block.attributes.className = 'my-custom-class';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"className":"my-custom-class"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with externalCalendarUrl', () => {
		block.attributes.externalCalendarUrl = 'wordpress.org';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"externalCalendarUrl":"wordpress.org"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with eventsRange', () => {
		block.attributes.eventsRange = '1 month';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"eventsRange":"1 month"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with eventsToShow', () => {
		block.attributes.eventsToShow = '8';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"eventsToShow":"8"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
