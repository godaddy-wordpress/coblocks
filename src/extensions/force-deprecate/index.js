/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';
import { store } from '@wordpress/block-editor';
// Backward compatibility.
const blockEditorStore = !! store ? store : 'core/block-editor';

const deprecatedFontSizeBlocks = [ 'coblocks/click-to-tweet', 'coblocks/author' ];

const deprecateCoBlocksFontSizeControls = ( blockProps ) => {
	if ( ! deprecatedFontSizeBlocks.includes( blockProps?.name ) ) {
		return blockProps;
	}
	if ( !! Number.isInteger( blockProps?.attributes?.customFontSize ) ) {
		const { attributes, clientId, name } = blockProps;
		const { replaceBlocks } = dispatch( blockEditorStore );
		const migratedAttributes = { ...attributes, style: {
			typography: {
				fontSize: `${ attributes?.customFontSize }px`,
			},
		} };
		delete migratedAttributes.customFontSize;
		const transformedBlock = createBlock( name, { ...migratedAttributes }, [] );
		replaceBlocks( [ clientId ], transformedBlock );
	}
	return blockProps;
};

/**
 * This logic should only fire in the case of block deprecations.
 * Deprecated markup come in with old attributes and the block
 * must be replaced for proper instantiation.
 *
 * @param {Object} props The blockProps to deprecate.
 */
export const deprecateAll = ( props ) => {
	deprecateCoBlocksFontSizeControls( props );
};
