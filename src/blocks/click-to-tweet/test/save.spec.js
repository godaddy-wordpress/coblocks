/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/click-to-tweet', () => {
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

	it( 'should render with content', () => {
		block.attributes.content = 'Quote to tweet';
		block.attributes.buttonText = 'Tweet';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Quote to tweet' );
		expect( serializedBlock ).toContain( 'Tweet' );
		expect( serializedBlock ).toContain( '[post_permalink]' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with textAlign', () => {
		[ 'left', 'center', 'right' ].forEach( ( alignment ) => {
			block.attributes.textAlign = alignment;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `"textAlign":"${ alignment }"` );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render with via', () => {
		block.attributes.via = 'username';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"via":"username"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with buttonColor', () => {
		block.attributes.buttonColor = 'accent';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"buttonColor":"accent"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customButtonColor', () => {
		block.attributes.customButtonColor = '#7b3749';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"customButtonColor":"#7b3749"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with textColor', () => {
		block.attributes.textColor = 'primary';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"textColor":"primary"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customTextColor', () => {
		block.attributes.customTextColor = '#da5d5d';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"customTextColor":"#da5d5d"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with className', () => {
		block.attributes.className = 'my-custom-class';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"className":"my-custom-class"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );
} );
