/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import classnames from 'classnames';

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
			<div className="wp-block-coblocks-event-item__content flex justify-between">
				<div className={ classnames( textClasses, 'wp-block-coblocks-event-item__date' ) } style={ textStyles }>
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-event-item__day display-block"
						value={ attributes.eventDay }
					/>
					<RichText.Content
						value={ attributes.eventMonth }
						tagName="h4"
						className="wp-block-coblocks-event-item__month display-block"
					/>
					<RichText.Content
						value={ attributes.eventYear }
						tagName="h4"
						className="wp-block-coblocks-event-item__year display-block"
					/>
				</div>
				<div className={ classnames( textClasses, 'wp-block-coblocks-event-item__heading-wrapper' ) } style={ textStyles }>
					<RichText.Content
						value={ attributes.title }
						tagName="h4"
						className="wp-block-coblocks-event-item__heading display-block"
					/>
					<RichText.Content
						value={ attributes.description }
						tagName="p"
						className="wp-block-coblocks-event-item__description display-block"
						itemprop="description"
					/>
				</div>
				<div className={ classnames( textClasses, 'wp-block-coblocks-event-item__time-and-location' ) } style={ textStyles }>
					<RichText.Content
						value={ attributes.eventTime }
						tagName="h5"
						className="wp-block-coblocks-event-item__time display-block"
					/>
					<RichText.Content
						value={ attributes.eventLocation }
						tagName="p"
						className="wp-block-coblocks-event-item__location display-block"
					/>
				</div>
			</div>
		</div>
	);
}
