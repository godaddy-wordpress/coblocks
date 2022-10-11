/**
 * Internal dependencies
 */
import { hasEmptyAttributes } from '../../../../utils/block-helpers';
import fromEntries from '../../../../js/coblocks-fromEntries';

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

	if ( ! Object.fromEntries ) {
		return hasEmptyAttributes( fromEntries( newAttributes ) );
	}

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

export default function migrateHeadingLevel( { attributes } ) {
	alert( 'test?' );
	return (
		<p>Testing:)</p>
	);
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
							objectPosition: attributes.focalPoint
								? `${ attributes.focalPoint.x * 100 }% ${ attributes.focalPoint.y *
                                    100 }%`
								: undefined,
						} }
					/>
				</figure>
			) }
			<div className="wp-block-coblocks-food-item__content">
				<div className="wp-block-coblocks-food-item__heading-wrapper">
					<RichText.Content
						tagName={ `h${attributes.headingLevel}` }
						className="wp-block-coblocks-food-item__heading"
						value={ attributes.title }
						itemprop="name"
					/>
					{ (
						!! attributes.spicy ||
						!! attributes.vegetarian ||
						!! attributes.glutenFree ||
						!! attributes.pescatarian ||
						!! attributes.popular ||
						!! attributes.vegan
					) && (
						<div className="wp-block-coblocks-food-item__attributes">
							{ !! attributes.popular && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--popular',
										'hint--top',
									) }
									aria-label={ __( 'Popular', 'coblocks' ) }
								>
									<span className="wp-block-coblocks-food-item__icon" />
								</span>
							) }
							{ !! attributes.spicy && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--spicy',
										'hint--top',
									) }
									aria-label={ __( 'Spicy', 'coblocks' ) }
								>
									<span className="wp-block-coblocks-food-item__icon" />
								</span>
							) }
							{ !! attributes.spicier && !! attributes.spicy && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--spicy',
										'wp-block-coblocks-food-item__attribute--spicier',
										'hint--top',
									) }
									aria-label={ __( 'Spicier', 'coblocks' ) }
								>
									<span className="wp-block-coblocks-food-item__icon" />
								</span>
							) }
							{ !! attributes.vegetarian && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--vegetarian',
										'hint--top'
									) }
									aria-label={ __( 'Vegetarian', 'coblocks' ) }
								>
									<span className="wp-block-coblocks-food-item__icon" />
								</span>
							) }
							{ !! attributes.glutenFree && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--gluten-free',
										'hint--top' ) }
									aria-label={ __( 'Gluten free', 'coblocks' ) }

								>
									<span className="wp-block-coblocks-food-item__icon" />
								</span>
							) }
							{ !! attributes.pescatarian && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--pescatarian',
										'hint--top'
									) }
									aria-label={ __( 'Pescatarian', 'coblocks' ) }

								>
									<span className="wp-block-coblocks-food-item__icon" />
								</span>
							) }
							{ !! attributes.vegan && (
								<span
									className={ classnames(
										'wp-block-coblocks-food-item__attribute',
										'wp-block-coblocks-food-item__attribute--vegan',
										'hint--top'
									) }
									aria-label={ __( 'Vegan', 'coblocks' ) }

								>
									<span className="wp-block-coblocks-food-item__icon" />
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
}
