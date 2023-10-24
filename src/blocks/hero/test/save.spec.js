/**
 * External dependencies
 */
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom';
import { createBlock, registerBlockType, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let blockDOM;

describe( 'coblocks/hero', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );

		// Reset the reused variables.
		blockDOM = undefined;
	} );

	it( 'should render', () => {
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply hero-center-center-align class if the "Center Center" layout option is selected', () => {
		block.attributes.layout = 'center-center';
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-hero__inner' )
		).toHaveClass( `hero-${ block.attributes.layout }-align` );
	} );

	it( 'should apply has-no-padding class if the "none" padding setting is selected', () => {
		block.attributes.paddingSize = 'no';
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-hero__inner' )
		).toHaveClass( 'has-no-padding' );
	} );

	it( 'should apply has-padding class if any padding setting is applied', () => {
		block.attributes.paddingSize = 'advanced';
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-hero__inner' )
		).toHaveClass( 'has-padding' );
	} );

	it( 'should apply has-small-padding class if the small padding size is selected', () => {
		block.attributes.paddingSize = 'small';
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-hero__inner' )
		).toHaveClass( `has-${ block.attributes.paddingSize }-padding` );
	} );

	it( 'should set content max width with inline css', () => {
		block.attributes.maxWidth = 750;
		const serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-hero__content' )
		).toHaveStyle( 'max-width: 750px' );
	} );

	it( 'should not set content max width when not defined', () => {
		block.attributes.maxWidth = null;
		const serializedBlock = serialize( block );

		expect( serializedBlock ).not.toContain( 'max-width' );
	} );

	it( 'should render with backgroundColor attribute', () => {
		block.attributes.backgroundColor = 'accent';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"backgroundColor":"accent"' );
		expect( serializedBlock ).toContain( 'has-accent-background' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customBackgroundColor attribute', () => {
		block.attributes.customBackgroundColor = '#5a4a4f';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"customBackgroundColor":"#5a4a4f"' );
		expect( serializedBlock ).toContain( 'has-background' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with textColor attribute', () => {
		block.attributes.textColor = 'accent';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"textColor":"accent"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customTextColor attribute', () => {
		block.attributes.customTextColor = '#5a4a4f';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"customTextColor":"#5a4a4f"' );
		expect( serializedBlock ).toContain( 'has-text-color' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with className attribute', () => {
		block.attributes.className = 'my-custom-class';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"className":"my-custom-class"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with contentAlign attribute', () => {
		const alignOptions = [ 'left', 'center', 'right' ];
		alignOptions.forEach( ( alignOption ) => {
			block.attributes.contentAlign = alignOption;
			const serializedBlock = serialize( block );

			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `"contentAlign":"${ alignOption }"` );
			expect( serializedBlock ).toContain( `has-${ alignOption }-content` );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render with fullscreen & layout attributes', () => {
		const layoutOptions = [
			'top-left', 'top-center', 'top-right',
			'center-left', 'center-center', 'center-right',
			'bottom-left', 'bottom-center', 'bottom-right',
		];
		layoutOptions.forEach( ( layoutOption ) => {
			block.attributes.fullscreen = 'true';
			block.attributes.layout = layoutOption;
			const serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( '"fullscreen":"true"' );
			expect( serializedBlock ).toContain( 'is-fullscreen' );
			expect( serializedBlock ).toContain( `hero-${ layoutOption }-align` );

			if ( layoutOption !== 'center-left' ) { // center-left === default layout
				// eslint-disable-next-line jest/no-conditional-expect
				expect( serializedBlock ).toContain( `"layout":"${ layoutOption }"` );
			}
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );
