/**
 * Internal dependencies.
 */
import fromEntries from '../../../js/coblocks-fromEntries';
import { hasEmptyAttributes } from '../../../utils/block-helpers';

/**
 * WordPress dependencies.
 */
import { RichText } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'url', 'name', 'description' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

export default function save( { attributes, className } ) {
	const {
		alt,
		description,
		focalPoint,
		name,
		showImage,
		showTitle,
		title,
		url,
	} = attributes;

	return isEmpty( attributes ) ? null : (
		<div className={ className }>
			{ !! showImage && url && (
				<figure className="wp-block-coblocks-testimonial__figure">
					<img
						alt={ alt }
						src={ url }
						style={ {
							objectPosition: focalPoint
								? `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`
								: undefined,
						} }
					/>
				</figure>
			) }
			<div className="wp-block-coblocks-testimonial__content">
				<div className="wp-block-coblocks-testimonial__heading-wrapper">
					<RichText.Content
						className="wp-block-coblocks-testimonial__heading"
						tagName="h4"
						value={ name }
					/>
					{ !! showTitle && title && (
						<p className="wp-block-coblocks-testimonial__price">
							<RichText.Content
								tagName="span"
								value={ title }
							/>
						</p>
					) }
				</div>
				<RichText.Content
					className="wp-block-coblocks-testimonial__description"
					itemprop="description"
					tagName="p"
					value={ description }
				/>
			</div>
		</div>
	);
}
