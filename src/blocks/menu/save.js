/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.editor;

export default function save( { attributes } ) {
	return (
		<div className={ attributes.className }>
			<InnerBlocks.Content />
		</div>
	);
}
