/**
 * WordPress dependencies.
 */
const { RichText } = wp.editor;

export default function save( { attributes } ) {
	return (
		<div className={ attributes.className }>
			{ attributes.showImage && attributes.itemImage && (
				<figure>
					<img src={ attributes.itemImage } alt={ '' } />
				</figure>
			) }
			<RichText.Content tagName="p" value={ attributes.itemName } />
			<RichText.Content tagName="p" value={ attributes.itemDescription } />
			<RichText.Content tagName="p" value={ attributes.itemCost } />
		</div>
	);
}
