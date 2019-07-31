/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

export default function save( { className, attributes } ) {
	return (
		<div className={ className } data-columns={ attributes.columns }>
			<InnerBlocks.Content />
		</div>
	);
}
