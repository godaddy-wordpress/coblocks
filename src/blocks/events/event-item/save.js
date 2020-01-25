/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';

/**
 * WordPress dependencies.
 */
import { RichText, getColorClassName } from '@wordpress/block-editor';

const isEmpty = attributes => {
	const attributesToCheck = [ 'title', 'description', 'eventDay', 'eventMonth', 'eventYear', 'eventTime', 'eventLocation' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

export default function save( { attributes } ) {
	const colorClass = getColorClassName( 'color', attributes.textColor );

	const classes = classnames( attributes.className, {
		'has-text-color': attributes.textColor || attributes.customTextColor,
		[ colorClass ]: colorClass,
	} );

	return isEmpty( attributes ) ? null : (
		<div
			className={ classes }
			data-page={ String( attributes.pageNum ) }
			style={ { color: colorClass ? undefined : attributes.customTextColor } }
		>
			<div className="wp-block-coblocks-events__date">
				<RichText.Content
					tagName="span"
					className="wp-block-coblocks-events__day"
					value={ attributes.eventDay }
				/>
				<div>
					<RichText.Content
						value={ attributes.eventMonth }
						tagName="span"
						className="wp-block-coblocks-events__month"
					/>
					<RichText.Content
						value={ attributes.eventYear }
						tagName="span"
						className="wp-block-coblocks-events__year"
					/>
				</div>
			</div>
			<div className="wp-block-coblocks-events__content">
				<RichText.Content
					value={ attributes.title }
					tagName="span"
					className="wp-block-coblocks-events__title"
				/>
				<RichText.Content
					value={ attributes.description }
					tagName="span"
					className="wp-block-coblocks-events__description"
					itemprop="description"
				/>
			</div>
			<div className="wp-block-coblocks-events__details">
				<RichText.Content
					value={ attributes.eventTime }
					tagName="span"
					className="wp-block-coblocks-events__time"
				/>
				<RichText.Content
					value={ attributes.eventLocation }
					tagName="span"
					className="wp-block-coblocks-events__location"
				/>
			</div>
		</div>
	);
}
