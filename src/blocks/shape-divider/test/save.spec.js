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

	afterEach( () => {
		// Make a snapshot for each save function test to better detect deprecation needs.
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render', () => {
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
	} );

	it( 'should have \'min-height\' property within the \'style\' attribute with the shapeHeight attribute set.', () => {
		block.attributes = { ...block.attributes, shapeHeight: 200 };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.getElementsByClassName( 'wp-block-coblocks-shape-divider__svg-wrapper' )[ 0 ]
		).toHaveStyle( 'min-height: 200px' );
	} );

	it( 'should have \'min-height\' property within the \'style\' attribute with the backgroundHeight attribute set.', () => {
		block.attributes = { ...block.attributes, backgroundHeight: 200 };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.getElementsByClassName( 'wp-block-coblocks-shape-divider__alt-wrapper' )[ 0 ]
		).toHaveStyle( 'min-height: 200px' );
	} );

	it( 'should have className \'is-vertically-flipped\' with verticalFlip enabled.', () => {
		block.attributes = { ...block.attributes, verticalFlip: false };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.getElementsByClassName( 'wp-block-coblocks-shape-divider' )[ 0 ]
		).not.toHaveClass( 'is-vertically-flipped' );

		block.attributes = { ...block.attributes, verticalFlip: true };
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.getElementsByClassName( 'wp-block-coblocks-shape-divider' )[ 0 ]
		).toHaveClass( 'is-vertically-flipped' );
	} );

	it( 'should have className \'is-horizontally-flipped\' with horizontalFlip enabled.', () => {
		block.attributes = { ...block.attributes, horizontalFlip: false };
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.getElementsByClassName( 'wp-block-coblocks-shape-divider' )[ 0 ]
		).not.toHaveClass( 'is-horizontally-flipped' );

		block.attributes = { ...block.attributes, horizontalFlip: true };
		serializedBlock = serialize( block );

		blockDOM = new JSDOM( serializedBlock );
		expect(
			blockDOM.window.document.getElementsByClassName( 'wp-block-coblocks-shape-divider' )[ 0 ]
		).toHaveClass( 'is-horizontally-flipped' );
	} );
} );
