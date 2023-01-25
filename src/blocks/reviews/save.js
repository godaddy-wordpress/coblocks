import { InnerBlocks } from '@wordpress/block-editor';

// eslint-disable-next-line no-unused-vars
export default function save( { attributes } ) {
	return (
		<div className="reviews">
			<InnerBlocks.Content />
		</div>
	);
}
