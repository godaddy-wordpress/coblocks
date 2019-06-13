/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.editor;

export default function save( { className } ) {
	return (
		<div className={ className }>
			<InnerBlocks.Content />
		</div>
	);
}
