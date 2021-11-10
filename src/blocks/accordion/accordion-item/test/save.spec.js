/**
 * External dependencies
 */
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let blockDOM;

describe( name, () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );
	} );

	it( 'should render with content', () => {
		block.attributes.title = 'Accordion title';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Accordion title' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with text color', () => {
		block.attributes.textColor = 'primary';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"textColor":"primary"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with background color', () => {
		block.attributes.backgroundColor = '#111111';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"backgroundColor":"#111111"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with border color', () => {
		block.attributes.borderColor = '#111111';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"borderColor":"#111111"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply has-background class if any background color is selected', () => {
		block.attributes.title = 'Accordion Item title';
		block.attributes.customBackgroundColor = '#111111';
		block.attributes.backgroundColor = undefined;
		let serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-accordion-item__title' )
		).toHaveClass( 'has-background' );

		block.attributes.customBackgroundColor = undefined;
		block.attributes.backgroundColor = 'primary';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-accordion-item__title' )
		).toHaveClass( 'has-background' );
	} );

	it( 'should apply has-primary-background-color class if selected from the color palette', () => {
		block.attributes.title = 'Accordion Item title';
		block.attributes.backgroundColor = 'primary';
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-accordion-item__title' )
		).toHaveClass( `has-${ block.attributes.backgroundColor }-background-color` );
	} );

	it( 'should apply custom background color with inline css', () => {
		block.attributes.title = 'Accordion Item title';
		block.attributes.customBackgroundColor = '#123456';
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-accordion-item__title' )
		).toHaveStyle( `background-color: ${ block.attributes.customBackgroundColor }` );
	} );

	it( 'should render with custom background color', () => {
		block.attributes.title = 'Accordion Item title';
		block.attributes.customBackgroundColor = '#111111';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"customBackgroundColor":"#111111"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
