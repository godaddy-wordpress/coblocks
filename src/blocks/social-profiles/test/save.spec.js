/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import metadata from '../block.json';
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/social-profiles', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings, attributes: metadata.attributes } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );

		// Reset the reused variables.
		serializedBlock = '';
	} );

	it( 'should not render without links', () => {
		serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should render with Facebook link', () => {
		const url = 'https://facebook.com';
		block.attributes.facebook = url;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { facebook: url } ) );
	} );

	it( 'should render with Twitter link', () => {
		const url = 'https://twitter.com';
		block.attributes.twitter = url;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { twitter: url } ) );
	} );

	it( 'should render with Instagram link', () => {
		const url = 'https://instagram.com';
		block.attributes.instagram = url;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { instagram: url } ) );
	} );

	it( 'should render with TikTok link', () => {
		const url = 'https://tiktok.com';
		block.attributes.tiktok = url;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { tiktok: url } ) );
	} );

	it( 'should render with Pinterest link', () => {
		const url = 'https://pinterest.com';
		block.attributes.pinterest = url;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { pinterest: url } ) );
	} );

	it( 'should render with LinkedIn link', () => {
		const url = 'https://linkedin.com';
		block.attributes.linkedin = url;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { linkedin: url } ) );
	} );

	it( 'should render with YouTube link', () => {
		const url = 'https://youtube.com';
		block.attributes.youtube = url;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { youtube: url } ) );
	} );

	it( 'should render with Yelp link', () => {
		const url = 'https://yelp.com';
		block.attributes.yelp = url;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { yelp: url } ) );
	} );

	it( 'should render with Houzz link', () => {
		const url = 'https://houzz.com';
		block.attributes.houzz = url;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { houzz: url } ) );
	} );

	it( 'should render with styles', () => {
		const styleClasses = [
			'is-style-circular',
			'is-style-icon-and-text',
			'is-style-text',
			'is-style-icon',
			'is-style-mask',
		];
		styleClasses.forEach( ( styleClass ) => {
			block.attributes.className = styleClass;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( styleClass );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render with className', () => {
		block.attributes.className = 'my-custom-class';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"className":"my-custom-class"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with hasColors', () => {
		block.attributes.hasColors = false;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"hasColors":false}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with iconSize', () => {
		block.attributes.iconSize = '22';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"iconSize":"22"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with textAlign', () => {
		[ 'left', 'center', 'right' ].forEach( ( alignment ) => {
			block.attributes.textAlign = alignment;
			serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( `{"textAlign":"${ alignment }"}` );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );
