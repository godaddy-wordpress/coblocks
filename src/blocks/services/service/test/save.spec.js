/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { createBlock, registerBlockType, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;

describe( 'coblocks/service', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );
	} );

	it( 'should render', () => {
		block.attributes.imageUrl = 'https://website.com/wp-content/uploads/1234/56/image.jpg';
		block.attributes.imageAlt = 'alt text';
		block.attributes.focalPoint = { x: 100, y: 0 };
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( `src="${ block.attributes.imageUrl }"` );
		expect( serializedBlock ).toContain( `alt="${ block.attributes.imageAlt }"` );
		expect( serializedBlock ).toContain( 'style="object-position:10000% 0%"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with href', () => {
		block.attributes.href = 'https://www.godaddy.com';
		block.attributes.imageUrl = 'https://website.com/wp-content/uploads/1234/56/image.jpg';
		block.attributes.imageAlt = 'alt text';
		block.attributes.showCta = 1;
		block.attributes.linkTarget = '_blank';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( `href="${ block.attributes.href }"` );
		expect( serializedBlock ).toContain( `target="${ block.attributes.linkTarget }"` );
		expect( serializedBlock ).not.toContain( 'style' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
