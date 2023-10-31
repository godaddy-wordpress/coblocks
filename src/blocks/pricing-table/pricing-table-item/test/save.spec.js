/**
 * External dependencies
 */
import '@testing-library/jest-dom';
import { registerCoreBlocks } from '@wordpress/block-library';
import { createBlock, registerBlockType, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/pricing-table-item', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
		registerCoreBlocks();
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );

		// Reset the reused variables.
		serializedBlock = '';
	} );

	it( 'should render with content', () => {
		const listItemBlock = createBlock( 'core/list-item', { content: '- Feature 1' }, [] );
		block.innerBlocks = [ createBlock( 'core/list', {}, [ listItemBlock ] ) ];
		block.attributes.title = 'Plan Title';
		block.attributes.features = '- Feature 1';
		block.attributes.currency = '$';
		block.attributes.amount = '49';
		block.attributes.backgroundColor = '#333333';
		block.attributes.textColor = '#123456';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '<span class="wp-block-coblocks-pricing-table-item__title">Plan Title</span>' );
		expect( serializedBlock ).toContain( '- Feature 1' );
		expect( serializedBlock ).toContain( '<span class="wp-block-coblocks-pricing-table-item__currency">$</span>' );
		expect( serializedBlock ).toContain( '<span class="wp-block-coblocks-pricing-table-item__amount">49</span>' );
		expect( serializedBlock ).toContain( 'has-333333-background-color' );
		expect( serializedBlock ).toContain( 'has-123456-color' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with custom colors', () => {
		block.attributes.title = 'Plan Title';
		block.attributes.customBackgroundColor = '#333333';
		block.attributes.customTextColor = '#123456';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'style="background-color:#333333;color:#123456"' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should not render without content', () => {
		serializedBlock = serialize( createBlock( name ) );
		expect( serializedBlock ).toEqual( `<!-- wp:${ name } /-->` );
	} );
} );
