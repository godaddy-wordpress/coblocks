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
let serializedBlock;

describe( name, () => {
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
		block.attributes.name = 'Author Name';
		block.attributes.biography = 'Author biography';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Author Name' );
		expect( serializedBlock ).toContain( 'Author biography' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render background color', () => {
		block.attributes.textColor = 'primary';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'primary' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render custom background color', () => {
		block.attributes.customBackgroundColor = '#745151';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '#745151' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render text color', () => {
		block.attributes.textColor = 'background';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'background' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render custom text color', () => {
		block.attributes.customTextColor = '#ffda7c';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '#ffda7c' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with imageUrl attribute', () => {
		block.attributes.imgUrl = '150x150.png';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '150x150.png' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with fontSize attribute', () => {
		block.attributes.fontSize = 'large';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'large' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customFontSize attribute', () => {
		block.attributes.customFontSize = '34.25';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '34.25' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with custom class name', () => {
		block.attributes.className = 'my-custom-class';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'my-custom-class' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render with fake attribute', () => {
		block.attributes.fakeAttribute = 'alpha';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );
} );
