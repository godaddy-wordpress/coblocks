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

	const classes = classnames( attributes.className, 'w-full', 'md:flex', 'mb-2', 'justify-between', {
		'has-text-color': attributes.textColor || attributes.customTextColor,
		[ colorClass ]: colorClass,
	} );

	return isEmpty( attributes ) ? null : (
		<div
			className={ classes }
			data-page={ String( attributes.pageNum ) }
			style={ { color: colorClass ? undefined : attributes.customTextColor } }
		>
			<div className="wp-block-coblocks-events__date md:flex mb-3 md:mb-0 md:display-block">
				<RichText.Content
					tagName="span"
					className="wp-block-coblocks-events__day display-block font-bold mb-1"
					value={ attributes.eventDay }
				/>
				<div>
					<RichText.Content
						value={ attributes.eventMonth }
						tagName="span"
						className="wp-block-coblocks-events__month md:display-block mb-1"
					/>
					<RichText.Content
						value={ attributes.eventYear }
						tagName="span"
						className="wp-block-coblocks-events__year md:display-block mb-0"
					/>
				</div>
			</div>
			<div className="wp-block-coblocks-events__content mb-3 md:mb-0">
				<RichText.Content
					value={ attributes.title }
					tagName="span"
					className="wp-block-coblocks-events__title display-block font-bold mb-1"
				/>
				<RichText.Content
					value={ attributes.description }
					tagName="span"
					className="wp-block-coblocks-events__description display-block"
					itemprop="description"
				/>
			</div>
			<div className="wp-block-coblocks-events__details md:text-right">
				<RichText.Content
					value={ attributes.eventTime }
					tagName="span"
					className="wp-block-coblocks-events__time display-block mb-1"
				/>
				<RichText.Content
					value={ attributes.eventLocation }
					tagName="span"
					className="wp-block-coblocks-events__location display-block"
				/>
			</div>
		</div>
	);
}
