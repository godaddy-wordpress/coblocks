/**
 * Internal dependencies
 */
import { attributes } from './block.json';
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import icons from './deprecated/icons';
import fromEntries from '../../../js/coblocks-fromEntries';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

const isEmpty = attributes => {
	const attributesToCheck = [ 'url', 'title', 'description', 'price' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	if ( ! Object.fromEntries ) {
		return hasEmptyAttributes( fromEntries( newAttributes ) );
	}

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

const deprecatedIcons = ( { attributes } ) => {
	return isEmpty( attributes ) ? null : (
		<div
			className={ attributes.className }
			itemScope
			itemType="http://schema.org/MenuItem"
		>
			{ !! attributes.showImage && attributes.url && (
				<figure className="wp-block-coblocks-food-item__figure">
					<img
						src={ attributes.url }
						alt={ attributes.alt }
						itemProp="image"
						style={ {
							objectPosition: attributes.focalPoint ?
								`${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y *
										100 }%` :
								undefined,
						} }
					/>
				</figure>
			) }
			<div className="wp-block-coblocks-food-item__content">
				<div className="wp-block-coblocks-food-item__heading-wrapper">
					<RichText.Content
						tagName="h4"
						className="wp-block-coblocks-food-item__heading"
						value={ attributes.title }
						itemprop="name"
					/>
					{ ( !! attributes.spicy ||
						!! attributes.vegetarian ||
						!! attributes.glutenFree ||
						!! attributes.pescatarian ||
						!! attributes.popular ||
						!! attributes.vegan ) && (
						<div className="wp-block-coblocks-food-item__attributes">
							{ !! attributes.popular && (
								<span className="hint--top" aria-label={ __( 'Popular', 'coblocks' ) }>
									<Icon
										icon={ icons.popular }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--popular"
									/>
								</span>
							) }
							{ !! attributes.spicy && (
								<span className="hint--top" aria-label={ __( 'Spicy', 'coblocks' ) }>
									<Icon
										icon={ icons.spicy }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--spicy"
									/>
								</span>
							) }
							{ !! attributes.spicier && !! attributes.spicy && (
								<span className="hint--top" aria-label={ __( 'Spicier', 'coblocks' ) }>
									<Icon
										icon={ icons.spicy }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--spicier"
									/>
								</span>
							) }
							{ !! attributes.vegetarian && (
								<span className="hint--top" aria-label={ __( 'Vegetarian', 'coblocks' ) }>
									<Icon
										icon={ icons.vegetarian }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--veg"
									/>
								</span>
							) }
							{ !! attributes.glutenFree && (
								<span className="hint--top" aria-label={ __( 'Gluten Free', 'coblocks' ) }>
									<Icon
										icon={ icons.glutenFree }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--gf"
									/>
								</span>
							) }
							{ !! attributes.pescatarian && (
								<span className="hint--top" aria-label={ __( 'Pescatarian', 'coblocks' ) }>
									<Icon
										icon={ icons.pescatarian }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--pescatarian"
									/>
								</span>
							) }
							{ !! attributes.vegan && (
								<span className="hint--top" aria-label={ __( 'Vegan', 'coblocks' ) }>
									<Icon
										icon={ icons.vegan }
										className="wp-block-coblocks-food-item__attribute wp-block-coblocks-food-item__attribute--vegan"
									/>
								</span>
							) }
						</div>
					) }
				</div>
				<RichText.Content
					tagName="p"
					className="wp-block-coblocks-food-item__description"
					value={ attributes.description }
					itemprop="description"
				/>
				{ !! attributes.showPrice && attributes.price && (
					<p
						className="wp-block-coblocks-food-item__price"
						itemProp="offers"
						itemScope
						itemType="http://schema.org/Offer"
					>
						<RichText.Content
							tagName="span"
							value={ attributes.price }
							itemprop="price"
						/>
					</p>
				) }
			</div>
		</div>
	);
};

const deprecated = [
	{
		attributes,
		save: deprecatedIcons,
	},
];

export default deprecated;
