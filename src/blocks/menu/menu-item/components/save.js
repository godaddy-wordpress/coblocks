/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../../utils/block-helpers';

/**
 * WordPress dependencies.
 */
const { RichText } = wp.blockEditor;

const isEmpty = attributes => {
	const attributesToCheck = [ 'imageUrl', 'title', 'description', 'itemPrice' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

export default function save( { attributes } ) {
	return isEmpty( attributes ) ? null : (
		<div
			className={ attributes.className }
			itemScope
			itemType="http://schema.org/MenuItem"
		>
			{ attributes.showImage && attributes.imageUrl && (
				<figure className="wp-block-coblocks-menu-item__image">
					<img
						src={ attributes.imageUrl }
						alt={ attributes.imageAlt }
						itemProp="image"
					/>
				</figure>
			) }
			<div className="wp-block-coblocks-menu-item__content">
				<RichText.Content
					tagName="h4"
					className="wp-block-coblocks-menu-item__heading"
					value={ attributes.title }
					itemprop="name"
				/>
				<RichText.Content
					tagName="p"
					className="wp-block-coblocks-menu-item__description"
					value={ attributes.description }
					itemprop="description"
				/>
				{ attributes.showPrice && (
					<p
						className="wp-block-coblocks-menu-item__price"
						itemProp="offers"
						itemScope
						itemType="http://schema.org/Offer"
					>
						<RichText.Content
							tagName="span"
							value={ attributes.itemPrice }
							itemprop="price"
						/>
					</p>
				) }
			</div>
		</div>
	);
}
