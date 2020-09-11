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

describe( 'coblocks/field-hidden transforms', () => {
	// Shared attributes
	const attributes = {};

	beforeAll( () => {
		// Register the form blocks.
		registerFormBlocks();
	} );

	it( 'should transform from coblocks/field-name block', () => {
		const coBlocksDateBlock = createBlock( 'coblocks/field-name', attributes );
		const transformed = switchToBlockType( coBlocksDateBlock, 'coblocks/field-hidden' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
	} );

	it( 'should transform from coblocks/field-date block', () => {
		const coBlocksTextareaBlock = createBlock( 'coblocks/field-date', attributes );
		const transformed = switchToBlockType( coBlocksTextareaBlock, 'coblocks/field-hidden' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
	} );

	it( 'should transform from coblocks/field-textarea block', () => {
		const coBlocksPhoneBlock = createBlock( 'coblocks/field-textarea', attributes );
		const transformed = switchToBlockType( coBlocksPhoneBlock, 'coblocks/field-hidden' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
	} );

	it( 'should transform from coblocks/field-phone block', () => {
		const coBlocksTextBlock = createBlock( 'coblocks/field-phone', attributes );
		const transformed = switchToBlockType( coBlocksTextBlock, 'coblocks/field-hidden' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
	} );

	it( 'should transform from coblocks/field-text block', () => {
		const coBlocksWebsiteBlock = createBlock( 'coblocks/field-text', attributes );
		const transformed = switchToBlockType( coBlocksWebsiteBlock, 'coblocks/field-hidden' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
	} );

	it( 'should transform from coblocks/field-website block', () => {
		const coBlocksHiddenBlock = createBlock( 'coblocks/field-website', attributes );
		const transformed = switchToBlockType( coBlocksHiddenBlock, 'coblocks/field-hidden' );

		expect( transformed[ 0 ].isValid ).toBe( true );
		expect( transformed[ 0 ].name ).toBe( name );
	} );
} );
