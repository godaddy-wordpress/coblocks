/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

export default function saveWithInnerBlocks( { attributes } ) {
	const { caption, lightbox, imageCrop } = attributes;

	const className = classnames( 'masonry-grid', {
		'has-lightbox': lightbox,
		'is-cropped': imageCrop,
	} );

	return (
		<GutterWrapper { ...attributes }>
			<figure { ...useBlockProps.save( { className } ) }>
				<InnerBlocks.Content />
			</figure>
			{ ! RichText.isEmpty( caption ) && (
				<RichText.Content
					className="blocks-gallery-caption"
					tagName="figcaption"
					value={ caption }
				/>
			) }
		</GutterWrapper>

	);
}
