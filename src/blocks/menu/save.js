/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

export default function save( { attributes } ) {
	return (
		<div className={ attributes.className }>
			<InnerBlocks.Content />
		</div>
	);
}
