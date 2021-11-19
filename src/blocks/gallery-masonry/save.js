/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';
import { store as blockEditorStore, InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import saveWithoutInnerBlocks from './v1/save';

export default function saveWithInnerBlocks( { attributes } ) {
	// This logic is used to infer version information based on existed of getBlock and getSettings selectors.
	const getBlock = select( blockEditorStore )?.getBlock ?? undefined;
	const getSettings = select( blockEditorStore )?.getSettings ?? undefined;

	const supportsInnerBlockGalleries = !! getBlock && !! getSettings;

	if ( ! supportsInnerBlockGalleries ) {
		return saveWithoutInnerBlocks( { attributes } );
	}

	const { caption, lightbox, imageCrop, radius } = attributes;

	const className = classnames( 'masonry-grid', {
		'has-lightbox': lightbox,
		'is-cropped': imageCrop,
		[ `has-border-radius-${ radius }` ]: radius > 0,
	} );

	return (
		<>
			<GutterWrapper { ...attributes }>
				<figure { ...useBlockProps.save( { className } ) }>
					<InnerBlocks.Content />
				</figure>
			</GutterWrapper>
			{ ! RichText.isEmpty( caption ) && (
				<RichText.Content
					className="blocks-gallery-caption"
					tagName="figcaption"
					value={ caption }
				/>
			) }
		</>
	);
}
