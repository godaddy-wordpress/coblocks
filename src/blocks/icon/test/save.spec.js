/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;

describe( 'coblocks/icon', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );
	} );

	it( 'should render', () => {
		block.attributes.icon = 'coblocks';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"icon":"coblocks"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with height and width', () => {
		block.attributes.height = '200';
		block.attributes.width = '200';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"height":"200"' );
		expect( serializedBlock ).toContain( '"width":"200"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with borderRadius and padding', () => {
		block.attributes.borderRadius = '200';
		block.attributes.padding = '30';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"borderRadius":"200"' );
		expect( serializedBlock ).toContain( '"padding":"30"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with href, rel, and linkTarget', () => {
		block.attributes.href = 'https://wordpress.org';
		block.attributes.rel = 'rel';
		block.attributes.linkTarget = '_blank';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'href="https://wordpress.org"' );
		expect( serializedBlock ).toContain( 'rel="rel"' );
		expect( serializedBlock ).toContain( 'target="_blank"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with iconColor', () => {
		block.attributes.iconColor = 'primary';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"iconColor":"primary"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customIconColor', () => {
		block.attributes.customIconColor = '#da5d5d';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"customIconColor":"#da5d5d"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with backgroundColor', () => {
		block.attributes.backgroundColor = 'primary';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"backgroundColor":"primary"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customBackgroundColor', () => {
		block.attributes.customBackgroundColor = '#da5d5d';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"customBackgroundColor":"#da5d5d"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with className', () => {
		block.attributes.className = 'my-custom-class is-style-filled';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"className":"my-custom-class is-style-filled"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with an icon', () => {
		block.attributes.icon = 'coblocks';
		block.attributes.href = "https://www.godaddy.com";
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'wp-block-coblocks-icon' );
		expect( serializedBlock ).toContain( 'https://www.godaddy.com' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
