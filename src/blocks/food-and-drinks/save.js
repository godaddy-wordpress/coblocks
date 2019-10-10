/**
 * WordPress dependencies.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	return (
		<div className={ className } data-columns={ attributes.columns } itemScope itemType="http://schema.org/Menu">
			<InnerBlocks.Content />
		</div>
	);
}
