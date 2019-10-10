/**
 * External dependencies
 */
import { omit } from 'lodash';
import { sprintf } from '@wordpress/i18n';
import { registerBlockType, unregisterBlockType, createBlock, getBlockTransforms, serialize, parse } from '@wordpress/blocks';

/**
 * A simplified version of the prefix trigger located in the RichText component.
 * See: https://github.com/WordPress/gutenberg/blob/53857f67563eb97025d75c196afa643994f0bbcc/packages/block-editor/src/components/rich-text/index.js#L254-L284
 *
 * @param {String} blockName The registered block name.
 * @param {String} prefix The prefix to trigger the transform.
 * @param {String} content The content of the block when a prefix is found.
 *
 * @returns {Object} The block object.
 */
export const performPrefixTransformation = ( blockName, prefix, content ) => {
	const prefixTransforms = getBlockTransforms( 'from', blockName )
		.filter( ( { type: transformType, prefix: transformPrefix } ) => transformType === 'prefix' && prefix === transformPrefix );

	// Remove prefix trigger from content before performing the transform.
	const blockContent = content.replace( prefix, '' ).trim();
	const block = prefixTransforms[ 0 ].transform( blockContent );

	return block;
};

/**
 * Generate tests for each defined deprecation of a block.
 *
 * @param {String} blockName The registered block name.
 * @param {Object} blockSettings The registered block settings.
 * @param {Object} blockVariations The used attributes and value varitions.
 */
export const testDeprecatedBlockVariations = ( blockName, blockSettings, blockVariations ) =>
	blockSettings.deprecated.map( ( deprecated, index ) => {
		describe( `${ blockName } deprecation ${ index }`, () => {
			// Make variables accessible for all tests.
			let deprecatedBlock;

			beforeEach( () => {
				unregisterBlockType( blockName );

				// Register the deprecated block.
				const deprecatedSettings = Object.assign(
					{}, omit( blockSettings, [ 'attributes', 'save', 'deprecated' ] ),
					{
						attributes: deprecated.attributes,
						save: deprecated.save,
					}
				);
				registerBlockType( blockName, { category: 'common', ...deprecatedSettings } );

				// Create the block with the minimum attributes.
				deprecatedBlock = createBlock( blockName );
			} );

			it( 'should deprecate old version', () => {
				const deprecatedSerialized = serialize( deprecatedBlock );

				// Unregister the deprecated block version.
				unregisterBlockType( blockName );

				// Register the current block version.
				registerBlockType( blockName, { category: 'common', ...blockSettings } );

				const blocks = parse( deprecatedSerialized );

				expect(
					blocks.filter( block => ! block.isValid ).map( filterBlockObjectResult )
				).toEqual( [ ] );
			} );

			Object.keys( deprecated.attributes ).map( ( attribute ) => {
				// This test helps expose attributes we need variations for.
				it( `should have variations for attribute.${ attribute }`, () => {
					expect( blockVariations.hasOwnProperty( attribute ) ).toBe( true );
				} );

				blockVariations[ attribute ] && blockVariations[ attribute ].map( variation => {
					it( `should support attribute.${ attribute } set to '${ JSON.stringify( variation ) }'`, () => {
						deprecatedBlock.attributes[ attribute ] = variation;
						const deprecatedSerialized = serialize( deprecatedBlock );

						// Unregister the deprecated block version.
						unregisterBlockType( blockName );

						// Register the current block version.
						registerBlockType( blockName, { category: 'common', ...blockSettings } );

						const blocks = parse( deprecatedSerialized );

						expect(
							blocks.filter( block => ! block.isValid ).map( filterBlockObjectResult )
						).toEqual( [ ] );
					} );
				} );
			} );
		} );
	} );

/**
 * Generate tests for each defined deprecation of a block.
 *
 * @param {Object} blockObject The block object returned from parse().
 *
 * @returns {Object} The filtered block object.
 */
const filterBlockObjectResult = ( blockObject ) => {
	const { name, attributes, isValid } = blockObject;
	const validationIssues = blockObject.validationIssues.map( issue => sprintf( ...issue.args ) );
	return { name, attributes, isValid, validationIssues };
};
