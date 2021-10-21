/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import metadata from '../block.json';
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/social', () => {
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

	it( 'should not render without icons', () => {
		block.attributes = Object.assign( {}, block.attributes, {
			twitter: false,
			facebook: false,
			pinterest: false,
			linkedin: false,
			tumblr: false,
			reddit: false,
			email: false,
			google: false,
		} );
		serializedBlock = serialize( block );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } ${ JSON.stringify( { twitter: false, facebook: false, pinterest: false } ) } /-->` );
	} );

	it( 'should render with Twitter icon', () => {
		block.attributes.twitter = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should render with Facebook icon', () => {
		block.attributes.facebook = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should render with Pinterest icon', () => {
		block.attributes.pinterest = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should render with LinkedIn link', () => {
		block.attributes.linkedin = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { linkedin: true } ) );
	} );

	it( 'should render with Tumblr link', () => {
		block.attributes.tumblr = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { tumblr: true } ) );
	} );

	it( 'should render with Reddit link', () => {
		block.attributes.reddit = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { reddit: true } ) );
	} );

	it( 'should render with Email link', () => {
		block.attributes.email = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { email: true } ) );
	} );

	it( 'should render with Google link', () => {
		block.attributes.google = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( JSON.stringify( { google: true } ) );
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
