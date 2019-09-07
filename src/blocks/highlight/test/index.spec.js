/**
 * External dependencies
 */
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

describe( 'coblocks/highlight', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	it( 'should render with content', () => {
		const block = createBlock( name, { content: 'highlighted content' } );
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'highlighted content' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		const block = createBlock( name );

		expect( serialize( block ) ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should center align text with inline css', () => {
		const block = createBlock( name, {
			content: 'highlighted content',
			align: 'center',
		} );
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toMatch( /<p.*style=".*text-align:center/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply has-background class if any background color is selected', () => {
		const block = createBlock( name, { content: 'highlighted content' } );
		let serializedBlock = '';

		block.attributes.customBackgroundColor = '#000000';
		serializedBlock = serialize( block );
		expect( serializedBlock ).toMatch( /<mark.*class=".*has-background/ );
		expect( serializedBlock ).toMatchSnapshot();

		block.attributes.customBackgroundColor = undefined;
		block.attributes.backgroundColor = 'primary';
		serializedBlock = serialize( block );
		expect( serializedBlock ).toMatch( /<mark.*class=".*has-background/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply has-primary-background-color class if the primary color is selected from the color palette', () => {
		const block = createBlock( name, {
			content: 'highlighted content',
			backgroundColor: 'primary',
		} );
		const serializedBlock = serialize( block );

		expect( serialize( block ) ).toMatch( /<mark.*class=".*has-primary-background-color/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply custom background color with inline css', () => {
		const block = createBlock( name, {
			content: 'highlighted content',
			customBackgroundColor: '#000000',
		} );
		const serializedBlock = serialize( block );

		expect( serialize( block ) ).toMatch( /<mark.*style=".*background-color:#000000/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply has-small-font-size class if the small font size is selected', () => {
		const block = createBlock( name, {
			content: 'highlighted content',
			fontSize: 'small',
		} );
		const serializedBlock = serialize( block );

		expect( serialize( block ) ).toMatch( /<p.*class=".*has-small-font-size/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should apply custom font size with inline css', () => {
		const block = createBlock( name, {
			content: 'highlighted content',
			customFontSize: 50,
		} );
		const serializedBlock = serialize( block );

		expect( serialize( block ) ).toMatch( /<mark.*style=".*font-size:50px/ );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
