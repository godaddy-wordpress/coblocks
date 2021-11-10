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

describe( 'coblocks/highlight', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name, { content: 'highlighted content' } );

		// Reset the reused variables.
		blockDOM = undefined;
	} );

	it( 'should render with content', () => {
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'highlighted content' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		const serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should center align text with inline css', () => {
		block.attributes.align = 'center';
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight' )
		).toHaveStyle( 'text-align: center' );
	} );

	it( 'should apply has-background class if any background color is selected', () => {
		block.attributes.customBackgroundColor = '#000000';
		block.attributes.backgroundColor = undefined;
		let serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveClass( 'has-background' );

		block.attributes.customBackgroundColor = undefined;
		block.attributes.backgroundColor = 'primary';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveClass( 'has-background' );
	} );

	it( 'should apply has-primary-background-color class if the primary color is selected from the color palette', () => {
		block.attributes.backgroundColor = 'primary';
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveClass( `has-${ block.attributes.backgroundColor }-background-color` );
	} );

	it( 'should apply custom background color with inline css', () => {
		block.attributes.customBackgroundColor = '#123456';
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveStyle( `background-color: ${ block.attributes.customBackgroundColor }` );
	} );

	it( 'should apply has-small-font-size class if the small font size is selected', () => {
		block.attributes.fontSize = 'small';
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveClass( `has-${ block.attributes.fontSize }-font-size` );
	} );

	it( 'should apply custom font size with inline css', () => {
		block.attributes.customFontSize = 50;
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveStyle( `font-size: ${ block.attributes.customFontSize }px` );
	} );

	it( 'should apply custom text color with inline css', () => {
		block.attributes.textColor = '#123456';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toContain( 'has-text-color' );
	} );
} );
