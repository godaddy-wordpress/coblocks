/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import fromEntries from '../../../js/coblocks-fromEntries';
import { hasEmptyAttributes } from '../../../utils/block-helpers';

/**
 * WordPress dependencies.
 */
import { getColorClassName, RichText } from '@wordpress/block-editor';

const isEmpty = ( attributes ) => {
	const attributesToCheck = [ 'title', 'description', 'eventDay', 'eventMonth', 'eventYear', 'eventTime', 'eventLocation' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( fromEntries( newAttributes ) );
};

export default function save( { className, attributes } ) {
	const {
		customTextColor,
		description,
		eventDay,
		eventLocation,
		eventMonth,
		eventTime,
		eventYear,
		pageNum,
		textColor,
		title,
	} = attributes;

	const colorClass = getColorClassName( 'color', textColor );

	const classes = classnames( className, 'swiper-slide', {
		[ colorClass ]: colorClass,
		'has-text-color': textColor || customTextColor,
	} );

	return isEmpty( attributes ) ? null : (
		<div
			className={ classes }
			data-page={ String( pageNum ) }
			style={ { color: colorClass ? undefined : customTextColor } }
		>
			<div className="wp-block-coblocks-events__date">
				<RichText.Content
					className="wp-block-coblocks-events__day"
					tagName="span"
					value={ eventDay }
				/>
				<div>
					<RichText.Content
						className="wp-block-coblocks-events__month"
						tagName="span"
						value={ eventMonth }
					/>
					<RichText.Content
						className="wp-block-coblocks-events__year"
						tagName="span"
						value={ eventYear }
					/>
				</div>
			</div>
			<div className="wp-block-coblocks-events__content">
				<RichText.Content
					className="wp-block-coblocks-events__title"
					tagName="span"
					value={ title }
				/>
				<RichText.Content
					className="wp-block-coblocks-events__description"
					itemprop="description"
					tagName="span"
					value={ description }
				/>
			</div>
			<div className="wp-block-coblocks-events__details">
				<RichText.Content
					className="wp-block-coblocks-events__time"
					tagName="span"
					value={ eventTime }
				/>
				<RichText.Content
					className="wp-block-coblocks-events__location"
					tagName="span"
					value={ eventLocation }
				/>
			</div>
		</div>
	);
}
