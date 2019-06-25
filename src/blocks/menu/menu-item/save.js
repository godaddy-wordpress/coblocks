/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import icons from './icons';

/**
 * WordPress dependencies.
 */
const { RichText } = wp.blockEditor;
const { Icon } = wp.components;

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
			{ !! attributes.showImage && attributes.imageUrl && (
				<figure className="wp-block-coblocks-menu-item__figure">
					<img
						src={ attributes.imageUrl }
						alt={ attributes.imageAlt }
						itemProp="image"
					/>
				</figure>
			) }
			<div className="wp-block-coblocks-menu-item__content">
				<div className="wp-block-coblocks-menu-item__heading-wrapper">
					<RichText.Content
						tagName="h4"
						className="wp-block-coblocks-menu-item__heading"
						value={ attributes.title }
						itemprop="name"
					/>
					{ ( !! attributes.spicy || !! attributes.vegetarian || !! attributes.glutenFree || !! attributes.pescatarian || !! attributes.vegan ) && (
						<div className="wp-block-coblocks-menu-item__attributes">
							{ !! attributes.spicy &&
								<Icon icon={ icons.spicy } className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--spicy" />
							}
							{ !! attributes.spicier && !! attributes.spicy &&
								<Icon icon={ icons.spicy } className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--spicier" />
							}
							{ !! attributes.vegetarian &&
								<Icon icon={ icons.vegetarian } className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--veg" />
							}
							{ !! attributes.glutenFree &&
								<Icon icon={ icons.glutenFree } className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--gf" />
							}
							{ !! attributes.pescatarian &&
								<Icon icon={ icons.pescatarian } className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--pescatarian" />
							}
							{ !! attributes.vegan &&
								<Icon icon={ icons.vegan } className="wp-block-coblocks-menu-item__attribute wp-block-coblocks-menu-item__attribute--vegan" />
							}
						</div>
					) }
				</div>
				<RichText.Content
					tagName="p"
					className="wp-block-coblocks-menu-item__description"
					value={ attributes.description }
					itemprop="description"
				/>
				{ !! attributes.showPrice && attributes.itemPrice && (
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
