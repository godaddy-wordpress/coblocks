/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import icons from './icons';
import classnames from "classnames";

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { RichText, getColorClassName  } = wp.blockEditor;
const { Icon } = wp.components;

const isEmpty = attributes => {
	const attributesToCheck = [ 'title', 'description', 'eventDay', 'eventMonth', 'eventDate', 'eventTime', 'eventLocation' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

export default function save( { attributes } ) {
	const colorClass = getColorClassName( 'color', attributes.textColor );

	const textClasses = classnames(
		attributes.className, {
			'has-text-color': attributes.textColor || attributes.customTextColor,
			[ colorClass ]: colorClass,
		} );

	const textStyles = {
		color: colorClass ? undefined : attributes.customTextColor,
	};

	return isEmpty( attributes ) ? null : (
		<div data-page={ String( attributes.pageNum ) }
			className={ attributes.className }
		>
			<div className="wp-block-coblocks-event-item__content">
				<div className={ classnames( textClasses, 'wp-block-coblocks-event-item__dates' ) } style={ textStyles }>
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-event-item__day"
						value={ attributes.eventDay }
					/>
					<RichText.Content
						value={ attributes.eventMonth }
						tagName="h4"
						className="wp-block-coblocks-event-item__month"
					/>
					<RichText.Content
						value={ attributes.eventDate }
						tagName="h4"
						className="wp-block-coblocks-event-item__date"
					/>
				</div>
				<div className={ classnames( textClasses, 'wp-block-coblocks-event-item__heading-wrapper' ) } style={ textStyles }>
					<RichText.Content
						value={ attributes.title }
						tagName="h4"
						className="wp-block-coblocks-event-item__heading"
					/>
					<RichText.Content
						value={ attributes.description }
						tagName="p"
						className="wp-block-coblocks-event-item__description"
						itemprop="description"
					/>
				</div>
				<div className={ classnames( textClasses, 'wp-block-coblocks-event-item__time-and-location' ) } style={ textStyles }>
					<RichText.Content
						value={ attributes.eventTime }
						tagName="h5"
						className="wp-block-coblocks-event-item__time"
					/>
					<RichText.Content
						value={ attributes.eventLocation }
						tagName="p"
						className="wp-block-coblocks-event-item__location"
					/>
				</div>
			</div>
		</div>
	);
}
