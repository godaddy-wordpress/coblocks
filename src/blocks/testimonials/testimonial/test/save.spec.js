/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/testimonial', () => {
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

	it( 'should render empty when Name is missing', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with content', () => {
		block.attributes.name = 'Some name';
		block.attributes.role = 'Some role';
		block.attributes.text = 'Some text';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Some name' );
		expect( serializedBlock ).toContain( 'Some role' );
		expect( serializedBlock ).toContain( 'Some text' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with the "conversation" style', () => {
		block.attributes.name = 'Some name';
		block.attributes.styleName = 'conversation';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Some name' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with the "horizontal" style', () => {
		block.attributes.name = 'Some name';
		block.attributes.styleName = 'horizontal';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Some name' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with image', () => {
		block.attributes.name = 'Some name';
		block.attributes.url = 'http://some.url/someimage.jpg';
		block.attributes.showImage = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'http://some.url/someimage.jpg' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with focal point on image', () => {
		block.attributes.name = 'Some name';
		block.attributes.url = 'http://some.url/someimage.jpg';
		block.attributes.focalPoint = { x: 0.5, y: 1 };
		block.attributes.showImage = true;
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'object-position:50% 100%' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
