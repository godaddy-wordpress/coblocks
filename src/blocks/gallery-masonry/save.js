/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

export default function saveWithInnerBlocks( { attributes } ) {
	const { caption, lightbox, imageCrop } = attributes;

	const className = classnames( 'masonry-grid', {
		'has-lightbox': lightbox,
		'is-cropped': imageCrop,
	} );

	return (
		<figure { ...useBlockProps.save( { className } ) }>
			<InnerBlocks.Content />
			{ ! RichText.isEmpty( caption ) && (
				<RichText.Content
					className="blocks-gallery-caption"
					tagName="figcaption"
					value={ caption }
				/>
			) }
		</figure>
	);
}
