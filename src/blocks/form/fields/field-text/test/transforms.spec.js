/**
 * External dependencies
 */
import { registerCoreBlocks } from '@wordpress/block-library';
import { createBlock, switchToBlockType } from '@wordpress/blocks';

registerCoreBlocks();

/**
 * Internal dependencies.
 */
import { registerFormBlocks } from '../../../../../../.dev/tests/jest/helpers';
import { name } from '../index';

describe( 'coblocks/field-text transforms', () => {
	// Shared attributes
	const attributes = {
		required: false,
	};

	beforeAll( () => {
		// Register the form blocks.
		registerFormBlocks();
	} );

	it( 'should transform from coblocks/field-text block', () => {
		const coBlocksDateBlock = createBlock( 'coblocks/field-name', attributes );
		const transformed = switchToBlockType( coBlocksDateBlock, 'coblocks/field-text' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.required ).toBe( attributes.required );
	} );

	it( 'should transform from coblocks/field-date block', () => {
		const coBlocksTextareaBlock = createBlock( 'coblocks/field-date', attributes );
		const transformed = switchToBlockType( coBlocksTextareaBlock, 'coblocks/field-text' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.required ).toBe( attributes.required );
	} );

	it( 'should transform from coblocks/field-textarea block', () => {
		const coBlocksPhoneBlock = createBlock( 'coblocks/field-textarea', attributes );
		const transformed = switchToBlockType( coBlocksPhoneBlock, 'coblocks/field-text' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.required ).toBe( attributes.required );
	} );

	it( 'should transform from coblocks/field-phone block', () => {
		const coBlocksTextBlock = createBlock( 'coblocks/field-phone', attributes );
		const transformed = switchToBlockType( coBlocksTextBlock, 'coblocks/field-text' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.required ).toBe( attributes.required );
	} );

	it( 'should transform from coblocks/field-website block', () => {
		const coBlocksWebsiteBlock = createBlock( 'coblocks/field-website', attributes );
		const transformed = switchToBlockType( coBlocksWebsiteBlock, 'coblocks/field-text' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.required ).toBe( attributes.required );
	} );

	it( 'should transform from coblocks/field-hidden block', () => {
		const coBlocksHiddenBlock = createBlock( 'coblocks/field-hidden', attributes );
		const transformed = switchToBlockType( coBlocksHiddenBlock, 'coblocks/field-text' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );

		expect( transformed[ 0 ].attributes.required ).toBe( attributes.required );
	} );
} );
