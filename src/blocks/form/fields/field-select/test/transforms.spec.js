/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { registerBlockType, createBlock, switchToBlockType } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import { registerFormBlocks } from '../../../../../../.dev/tests/jest/helpers';
import { name, settings } from '../index';

describe( 'coblocks/field-select transforms', () => {
	// Shared attributes
	const attributes = {
		required: false,
		options: [
			'Option 1',
			'Option 2',
		],
	};

	beforeAll( () => {
		// Register the form blocks.
		registerFormBlocks();
	} );

	it( 'should transform from coblocks/field-checkbox block', () => {
		const coBlocksDateBlock = createBlock( 'coblocks/field-checkbox', attributes );
		const transformed = switchToBlockType( coBlocksDateBlock, 'coblocks/field-select' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.required ).toBe( attributes.required );
		expect( transformed[ 0 ].attributes.options ).toBe( attributes.options );
	} );

	it( 'should transform from coblocks/field-radio block', () => {
		const coBlocksTextareaBlock = createBlock( 'coblocks/field-radio', attributes );
		const transformed = switchToBlockType( coBlocksTextareaBlock, 'coblocks/field-select' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.required ).toBe( attributes.required );
		expect( transformed[ 0 ].attributes.options ).toBe( attributes.options );
	} );
} );
