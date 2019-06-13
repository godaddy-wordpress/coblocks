/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../utils/block-helpers';

/**
 * WordPress dependencies.
 */
const { RichText } = wp.editor;

export default function save( { attributes } ) {
	return hasEmptyAttributes( attributes ) ? null : (
		<div className={ attributes.className }>
			{ attributes.showImage && attributes.itemImage && (
				<figure>
					<img src={ attributes.itemImage } alt={ '' } />
				</figure>
			) }
			<RichText.Content tagName="h4" value={ attributes.itemName } />
			<RichText.Content tagName="p" value={ attributes.itemDescription } />
			<RichText.Content tagName="p" className="wp-block-coblocks-menu__price" value={ attributes.itemCost } />
		</div>
	);
}
