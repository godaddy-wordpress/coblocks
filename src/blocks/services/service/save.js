/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

export default function save( { className, attributes } ) {
	return (
		<div className={ className }>
			{ attributes.imageUrl && (
				<figure>
					<img src={ attributes.imageUrl } alt={ attributes.imageAlt } />
				</figure>
			) }
			<InnerBlocks.Content />
		</div>
	);
}
