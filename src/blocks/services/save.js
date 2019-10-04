/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { className, attributes } ) {
	return (
		<div className={ className } data-columns={ attributes.columns }>
			<InnerBlocks.Content />
		</div>
	);
}
