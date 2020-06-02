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
let serializedBlock;

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
		serializedBlock = '';
	} );

	it( 'should render', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply hero-center-center-align class if the "Center Center" layout option is selected', () => {
		block.attributes.layout = 'center-center';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-hero__inner' )
		).toHaveClass( `hero-${ block.attributes.layout }-align` );
	} );

	it( 'should apply has-no-padding class if the "none" padding setting is selected', () => {
		block.attributes.paddingSize = 'no';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-hero__inner' )
		).toHaveClass( 'has-no-padding' );
	} );

	it( 'should apply has-padding class if any padding setting is applied', () => {
		block.attributes.paddingSize = 'advanced';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-hero__inner' )
		).toHaveClass( 'has-padding' );
	} );

	it( 'should apply has-small-padding class if the small padding size is selected', () => {
		block.attributes.paddingSize = 'small';
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-hero__inner' )
		).toHaveClass( `has-${ block.attributes.paddingSize }-padding` );
	} );

	it( 'should set content max width with inline css', () => {
		block.attributes.maxWidth = 750;
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.querySelector( '.wp-block-coblocks-hero__content' )
		).toHaveStyle( 'max-width: 750px' );
	} );

	it( 'should render with backgroundColor attribute', () => {
		block.attributes.backgroundColor = 'accent';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"backgroundColor":"accent"' );
		expect( serializedBlock ).toContain( 'has-accent-background' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customBackgroundColor attribute', () => {
		block.attributes.customBackgroundColor = '#5a4a4f';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"customBackgroundColor":"#5a4a4f"' );
		expect( serializedBlock ).toContain( 'has-background' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with textColor attribute', () => {
		block.attributes.textColor = 'accent';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"textColor":"accent"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customTextColor attribute', () => {
		block.attributes.customTextColor = '#5a4a4f';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"customTextColor":"#5a4a4f"' );
		expect( serializedBlock ).toContain( 'has-text-color' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with className attribute', () => {
		block.attributes.className = 'my-custom-class';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '"className":"my-custom-class"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with contentAlign attribute', () => {
		const alignOptions = [ 'left', 'center', 'right' ];
		alignOptions.forEach( ( alignOption ) => {
			block.attributes.contentAlign = alignOption;
			serializedBlock = serialize( block );

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
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( '"fullscreen":"true"' );
			expect( serializedBlock ).toContain( 'is-fullscreen' );
			expect( serializedBlock ).toContain( `hero-${ layoutOption }-align` );

			if ( layoutOption !== 'center-left' ) { // center-left === default layout
				expect( serializedBlock ).toContain( `"layout":"${ layoutOption }"` );
			}
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );
