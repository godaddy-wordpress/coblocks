/**
 * External dependencies
 */
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom/extend-expect';
import { createBlock, registerBlockType, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let blockDOM;
let serializedBlock;

describe( 'coblocks/alert', () => {
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
		block.attributes.title = 'Alert title';
		block.attributes.value = 'Alert description';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Alert title' );
		expect( serializedBlock ).toContain( 'Alert description' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with text color', () => {
		block.attributes.textColor = 'primary';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"textColor":"primary"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with background color', () => {
		block.attributes.backgroundColor = '#111111';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"backgroundColor":"#111111"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply has-background class if any background color is selected', () => {
		block.attributes.customBackgroundColor = '#111111';
		block.attributes.backgroundColor = undefined;
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-alert' )
		).toHaveClass( 'has-background' );

		block.attributes.customBackgroundColor = undefined;
		block.attributes.backgroundColor = 'primary';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-alert' )
		).toHaveClass( 'has-background' );
	} );

	it( 'should apply has-primary-background-color class if selected from the color palette', () => {
		block.attributes.backgroundColor = 'primary';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-alert' )
		).toHaveClass( `has-${ block.attributes.backgroundColor }-background-color` );
	} );

	it( 'should apply custom background color with inline css', () => {
		block.attributes.customBackgroundColor = '#123456';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-alert' )
		).toHaveStyle( `background-color: ${ block.attributes.customBackgroundColor }` );
	} );

	it( 'should render with custom background color', () => {
		block.attributes.customBackgroundColor = '#111111';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"customBackgroundColor":"#111111"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with text align', () => {
		[ 'left', 'center', 'right' ].forEach( ( alignment ) => {
			block.attributes.textAlign = alignment;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `"textAlign":"${ alignment }"` );
			expect( serializedBlock ).toMatchSnapshot();

			blockDOM = new JSDOM( serializedBlock );
			expect(
				blockDOM.window.document.querySelector( '.wp-block-coblocks-alert' )
			).toHaveClass( `has-text-align-${ alignment }` );
		} );
	} );

	it( 'should render with custom classes for styles', () => {
		[ 'is-style-info', 'is-style-success', 'is-style-warning', 'is-style-error' ].forEach( ( className ) => {
			block.attributes.className = className;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `"className":"${ className }"` );
			expect( serializedBlock ).toMatchSnapshot();

			blockDOM = new JSDOM( serializedBlock );
			expect(
				blockDOM.window.document.querySelector( '.wp-block-coblocks-alert' )
			).toHaveClass( `${ className }` );
		} );
	} );
} );
