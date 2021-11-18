/**
 * WordPress dependencies
 */
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import * as v1Gallery from '../../blocks/gallery-masonry/v1';
import EditWithInnerBlocks from './edit';
import EditWithoutInnerBlocks from './v1/edit';

/**
 * External dependencies
 */
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';

/*
  * Using a wrapper around the logic to load the edit for v1 of Masonry Gallery block
  * or the refactored version with InnerBlocks. This is to prevent conditional
  * use of hooks lint errors if adding this logic to the top of the edit component.
  */
export default function GalleryEditWrapper( props ) {
	// This logic is used to infer version information based on existed of getBlock and getSettings selectors.
	const { getBlock, getSettings } = useSelect( ( select ) => {
		return {
			getBlock: select( blockEditorStore )?.getBlock ?? undefined,
			getSettings: select( blockEditorStore )?.getSettings ?? undefined,
		};
	}, [] );
	const supportsInnerBlockGalleries = !! getBlock && !! getSettings;

	if ( !! supportsInnerBlockGalleries ) {
		return <EditWithInnerBlocks { ...props } />;
	}

	unregisterBlockType( 'coblocks/gallery-masonry' );
	registerBlockType( 'coblocks/gallery-masonry', {
		...v1Gallery?.settings,
	} );

	return <EditWithoutInnerBlocks { ...props } />;
}
