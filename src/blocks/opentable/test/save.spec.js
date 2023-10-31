/**
 * External dependencies
 */
import { replaceActiveStyle } from '@wordpress/block-editor/build/components/block-styles/utils';
import { createBlock, registerBlockType, serialize } from '@wordpress/blocks';
import '@testing-library/jest-dom';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/opentable', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );

		// Reset the reused variables.
		serializedBlock = '';
	} );

	it( 'should not render when no rid defined', () => {
		block.attributes.restaurantIDs = [ { name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)' } ];
		block.attributes.language = 'en-US';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).not.toContain( 'wp-block-coblocks-opentable' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with preassigned restaurants', () => {
		block.attributes.restaurantIDs = [
			{ name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)', rid: '123456' },
		];
		block.attributes.language = 'en-US';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'iframe__overflow-wrapper' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with style "Tall"', () => {
		block.attributes.restaurantIDs = [
			{ name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)', rid: '123456' },
		];
		block.attributes.language = 'en-US';

		const activeStyle = undefined;
		const newStyle = { name: 'tall' };
		block.attributes.className = replaceActiveStyle( block.attributes.className, activeStyle, newStyle );

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'is-style-tall' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with style "Tall" with multiple', () => {
		block.attributes.restaurantIDs = [
			{ name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)', rid: '123456' },
			{ name: 'Jines Restaurant (Test Restaurant added by CoBlocks)', rid: '246847' },
		];
		block.attributes.language = 'en-US';

		const activeStyle = undefined;
		const newStyle = { name: 'tall' };
		block.attributes.className = replaceActiveStyle( block.attributes.className, activeStyle, newStyle );

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'is-style-tall' );
		expect( serializedBlock ).toContain( 'height:551px' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with style "Button"', () => {
		block.attributes.restaurantIDs = [
			{ name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)', rid: '123456' },
		];
		block.attributes.language = 'en-US';

		const activeStyle = undefined;
		const newStyle = { name: 'button' };
		block.attributes.className = replaceActiveStyle( block.attributes.className, activeStyle, newStyle );

		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'is-style-button' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with multiple restaurants selected', () => {
		block.attributes.restaurantIDs = [
			{ name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)', rid: '123456' },
			{ name: 'Jines Restaurant (Test Restaurant added by CoBlocks)', rid: '246847' },
		];
		block.attributes.language = 'en-US';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'type=multi' );

		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with no language selected', () => {
		block.attributes.restaurantIDs = [
			{ name: 'Nuno-Restaurant (Test Restaurant added by CoBlocks)', rid: '123456' },
		];
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'type=standard' );

		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
