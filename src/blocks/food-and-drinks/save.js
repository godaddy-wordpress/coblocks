/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

export default function save( { attributes, className } ) {
	return (
		<div className={ className } data-columns={ attributes.columns } itemScope itemType="http://schema.org/Menu">
			<InnerBlocks.Content />
		</div>
	);
}
