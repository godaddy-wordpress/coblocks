import { InnerBlocks } from '@wordpress/block-editor';

// eslint-disable-next-line no-unused-vars
export default function save( { attributes } ) {
	// Block body (save state)
	return (
		<>
			<InnerBlocks.Content />
		</>
	);
}
