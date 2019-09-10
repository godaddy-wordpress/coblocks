/**
 * External dependencies
 */
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize, parse } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let blockDOM;
let serializedBlock;

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
		serializedBlock = '';
	} );

	it( 'should render with content', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'highlighted content' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should center align text with inline css', () => {
		block.attributes.align = 'center';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight' )
		).toHaveStyle( 'text-align: center' );
	} );

	it( 'should apply has-background class if any background color is selected', () => {
		block.attributes.customBackgroundColor = '#000000';
		block.attributes.backgroundColor = undefined;
		serializedBlock = serialize( block );

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
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveClass( `has-${ block.attributes.backgroundColor }-background-color` );
	} );

	it( 'should apply custom background color with inline css', () => {
		block.attributes.customBackgroundColor = '#123456';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveStyle( `background-color: ${ block.attributes.customBackgroundColor }` );
	} );

	it( 'should apply has-small-font-size class if the small font size is selected', () => {
		block.attributes.fontSize = 'small';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveClass( `has-${ block.attributes.fontSize }-font-size` );
	} );

	it( 'should apply custom font size with inline css', () => {
		block.attributes.customFontSize = 50;
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-highlight__content' )
		).toHaveStyle( `font-size: ${ block.attributes.customFontSize }px` );
	} );

	it( 'should deprecate v1', () => {
		const postContent = `
			<!-- wp:coblocks/highlight -->
			<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"align":"left"} -->
			<p style="text-align:left" class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"align":"center"} -->
			<p style="text-align:center" class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"align":"right"} -->
			<p style="text-align:right" class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"fontSize":"small"} -->
			<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content has-small-font-size">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"fontSize":"large"} -->
			<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content has-large-font-size">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"fontSize":"huge"} -->
			<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content has-huge-font-size">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"customFontSize":100} -->
			<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content" style="font-size:100px">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"backgroundColor":"primary"} -->
			<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content has-background has-primary-background-color">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"customBackgroundColor":"#87dbff"} -->
			<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content has-background" style="background-color:#87dbff">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"textColor":"primary"} -->
			<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content has-text-color has-primary-color">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->

			<!-- wp:coblocks/highlight {"customTextColor":"#87dbff"} -->
			<p class="wp-block-coblocks-highlight"><mark class="wp-block-coblocks-highlight__content has-text-color" style="color:#87dbff">highlighted content</mark></p>
			<!-- /wp:coblocks/highlight -->
		`.trim();

		const blocks = parse( postContent );

		for ( let i = 0; i < blocks.length; i++ ) {
			expect( blocks[ i ].isValid ).toBe( true );
		}
	} );
} );
