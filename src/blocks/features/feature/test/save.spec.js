/* eslint-disable jest/no-conditional-expect */
/**
 * External dependencies
 */
import { createBlock, registerBlockType, serialize } from '@wordpress/blocks';
import '@testing-library/jest-dom';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;

describe( 'coblocks/feature', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );
	} );

	it( 'should render', () => {
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with appropriate id class', () => {
		block.attributes.coblocks = { id: '1234' };
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'coblocks-feature-1234' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render heading levels', () => {
		[ 1, 2, 3, 4, 5, 6 ].forEach( ( headingLevel ) => {
			block.attributes.headingLevel = headingLevel;
			const serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			if ( 4 !== headingLevel ) {
				expect( serializedBlock ).toContain( '{"headingLevel":' + headingLevel + '}' );
			} else {
				expect( serializedBlock ).not.toContain( '{"headingLevel":' + headingLevel + '}' );
			}
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );

	it( 'should render text color', () => {
		block.attributes.textColor = '#333333';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'has-333333-color' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render custom text color', () => {
		block.attributes.customTextColor = '#b4d455';
		const serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'color:#b4d455' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render content align classes', () => {
		[ 'left', 'center', 'right' ].forEach( ( alignment ) => {
			block.attributes.contentAlign = alignment;
			const serializedBlock = serialize( block );
			expect( serializedBlock ).toBeDefined();
			expect( serializedBlock ).toContain( 'has-' + alignment + '-content' );
			expect( serializedBlock ).toMatchSnapshot();
		} );
	} );
} );
