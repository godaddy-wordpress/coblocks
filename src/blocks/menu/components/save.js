/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

export default function save( { className } ) {
	return (
		<div className={ className } itemScope itemType="http://schema.org/Menu">
			<InnerBlocks.Content />
		</div>
	);
}
