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

describe( 'coblocks/food-item', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );
	} );

	it( 'should render with content', () => {
		block.attributes.title = 'Food item title';
		block.attributes.description = 'Food item description';
		block.attributes.price = '$1.00';
		block.attributes.url = 'https://www.google.com';
		block.attributes.alt = 'Alt Tag';
		block.attributes.focalPoint = { x: 0, y: 100 };
		block.attributes.glutenFree = 1;
		block.attributes.pescatarian = 1;
		block.attributes.popular = 1;
		block.attributes.spicy = 1;
		block.attributes.spicier = 1;
		block.attributes.vegetarian = 1;
		block.attributes.vegan = 1;
		block.attributes.showImage = 1;
		block.attributes.showPrice = 1;
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Food item title' );
		expect( serializedBlock ).toContain( 'Food item description' );
		expect( serializedBlock ).toContain( '<span itemprop="price">$1.00</span>' );
		expect( serializedBlock ).toContain( '<img src="https://www.google.com" alt="Alt Tag" itemprop="image" style="object-position:0% 10000%"/>' );
		expect( serializedBlock ).toContain( 'wp-block-coblocks-food-item__attribute--gluten-free' );
		expect( serializedBlock ).toContain( 'wp-block-coblocks-food-item__attribute--pescatarian' );
		expect( serializedBlock ).toContain( 'wp-block-coblocks-food-item__attribute--popular' );
		expect( serializedBlock ).toContain( 'wp-block-coblocks-food-item__attribute--spicy' );
		expect( serializedBlock ).toContain( 'Spicier' );
		expect( serializedBlock ).toContain( 'wp-block-coblocks-food-item__attribute--vegetarian' );
		expect( serializedBlock ).toContain( 'wp-block-coblocks-food-item__attribute--vegan' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		const serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );

	it( 'should not render object-position style without focal point', () => {
		block.attributes.title = 'Food item title';
		block.attributes.description = 'Food item description';
		block.attributes.price = '$1.00';
		block.attributes.url = 'https://www.google.com';
		block.attributes.alt = 'Alt Tag';
		block.attributes.showImage = 1;
		const serializedBlock = serialize( block );
		expect( serializedBlock ).toContain( '<img src="https://www.google.com" alt="Alt Tag" itemprop="image"/>' );
	} );
} );
