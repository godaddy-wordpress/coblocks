/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import fromEntries from '../../../js/coblocks-fromEntries';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'url', 'title', 'description', 'price' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

export default function save( { attributes, className } ) {
	const {
		alt,
		description,
		glutenFree,
		pescatarian,
		popular,
		price,
		showImage,
		showPrice,
		spicier,
		spicy,
		title,
		url,
		vegan,
		vegetarian,
		focalPoint,
	} = attributes;

	return isEmpty( attributes ) ? null : (
		<div
			className={ className }
			itemScope
			itemType="http://schema.org/MenuItem"
		>
			{ !! showImage && url && (
				<figure className="wp-block-coblocks-food-item__figure">
					<img
						src={ url }
						alt={ alt }
						itemProp="image"
						style={ {
							objectPosition: focalPoint
								? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`
								: undefined,
						} }
					/>
				</figure>
			) }
			<div className="wp-block-coblocks-food-item__content">
				<div className="wp-block-coblocks-food-item__heading-wrapper">
					<RichText.Content
						tagName={ `h${ attributes.headingLevel }` }
						className="wp-block-coblocks-food-item__heading"
						value={ title }
						itemprop="name"
					/>
					{ ( !! spicy ||
						!! vegetarian ||
						!! glutenFree ||
						!! pescatarian ||
						!! popular ||
						!! vegan ) && (
						<div className="wp-block-coblocks-food-item__attributes">
							{ !! popular && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--popular',
										'hint--top' ) }
									aria-label={ __( 'Popular', 'coblocks' ) }
									role="img"
								>
									<span
										className="wp-block-coblocks-food-item__icon"
									/>
								</span>
							) }
							{ !! spicy && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--spicy',
										'hint--top' ) }
									aria-label={ __( 'Spicy', 'coblocks' ) }
									role="img"
								>
									<span
										className="wp-block-coblocks-food-item__icon"
									/>
								</span>
							) }
							{ !! spicier && !! spicy && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--spicy',
										'wp-block-coblocks-food-item__attribute--spicier',
										'hint--top' ) }
									aria-label={ __( 'Spicier', 'coblocks' ) }
									role="img"
								>
									<span
										className="wp-block-coblocks-food-item__icon"
									/>
								</span>
							) }
							{ !! vegetarian && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--vegetarian',
										'hint--top' ) }
									aria-label={ __( 'Vegetarian', 'coblocks' ) }
									role="img"
								>
									<span
										className="wp-block-coblocks-food-item__icon"
									/>
								</span>
							) }
							{ !! glutenFree && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--gluten-free',
										'hint--top' ) }
									aria-label={ __( 'Gluten free', 'coblocks' ) }
									role="img"
								>
									<span
										className="wp-block-coblocks-food-item__icon"
									/>
								</span>
							) }
							{ !! pescatarian && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--pescatarian',
										'hint--top' ) }
									aria-label={ __( 'Pescatarian', 'coblocks' ) }
									role="img"
								>
									<span
										className="wp-block-coblocks-food-item__icon"
									/>
								</span>
							) }
							{ !! vegan && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--vegan',
										'hint--top' ) }
									aria-label={ __( 'Vegan', 'coblocks' ) }
									role="img"
								>
									<span
										className="wp-block-coblocks-food-item__icon"
									/>
								</span>
							) }
						</div>
					) }
				</div>
				<RichText.Content
					tagName="p"
					className="wp-block-coblocks-food-item__description"
					value={ description }
					itemprop="description"
				/>
				{ !! showPrice && price && (
					<p
						className="wp-block-coblocks-food-item__price"
						itemProp="offers"
						itemScope
						itemType="http://schema.org/Offer"
					>
						<RichText.Content
							tagName="span"
							value={ price }
							itemprop="price"
						/>
					</p>
				) }
			</div>
		</div>
	);
}
