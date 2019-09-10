/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { omit } from 'lodash';
import { registerBlockType, unregisterBlockType, createBlock, serialize, parse } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

describe( 'coblocks/hero deprecation 1', () => {
	// Make variables accessible for all tests.
	let v1Block;

	// Mapping of each attribute and value variation.
	const variations = {
		contentAlign: [ undefined, 'left', 'center', 'right' ],
		textColor: [ undefined, 'primary' ],
		customTextColor: [ undefined, '#123456' ],
		maxWidth: [ 750 ],
	};

	beforeEach( () => {
		unregisterBlockType( name );

		// Register the v1 block.
		const v1Settings = Object.assign(
			{}, omit( settings, [ 'attributes', 'save', 'deprecated' ] ),
			{
				attributes: settings.deprecated[ 0 ].attributes,
				save: settings.deprecated[ 0 ].save,
			}
		);
		registerBlockType( name, { category: 'common', ...v1Settings } );

		// Create the block with the minimum attributes.
		v1Block = createBlock( name );
	} );

	it( 'should deprecate old version', () => {
		const v1Serialized = serialize( v1Block );

		// Unregister the v1 block version.
		unregisterBlockType( name );

		// Register the current block version.
		registerBlockType( name, { category: 'common', ...settings } );

		const blocks = parse( v1Serialized );

		for ( let i = 0; i < blocks.length; i++ ) {
			expect( blocks[ i ].isValid ).toBe( true );
		}
	} );

	Object.entries( variations ).map( ( [ attribute, variations ] ) => {
		variations.map( variation => {
			it( `should support attribute.${ attribute } set to '${ variation }'`, () => {
				v1Block.attributes[ attribute ] = variation;
				const v1Serialized = serialize( v1Block );

				// Unregister the v1 block version.
				unregisterBlockType( name );

				// Register the current block version.
				registerBlockType( name, { category: 'common', ...settings } );

				const blocks = parse( v1Serialized );

				for ( let i = 0; i < blocks.length; i++ ) {
					expect( blocks[ i ].isValid ).toBe( true );
				}
			} );
		} );
	} );
} );
