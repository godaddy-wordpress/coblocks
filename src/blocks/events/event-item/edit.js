/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import applyWithColors from './colors';
import InspectorControls from './inspector';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';

const isEmpty = attributes => {
	const attributesToCheck = [ 'title', 'description', 'eventDay', 'eventMonth', 'eventYear', 'eventTime', 'eventLocation' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

class EventsEdit extends Component {
	componentDidUpdate() {
		if ( ( this.props.attributes.externalChange ) ) {
			this.props.setAttributes( { textColor: this.props.attributes.textColor, externalChange: false } );
			this.props.setTextColor( this.props.attributes.textColor );
		}
	}

	render() {
		const { className, attributes, setAttributes, textColor } = this.props;

		const textStyles = {
			color: textColor.color,
		};

		return (
			<Fragment>
				<InspectorControls { ...this.props }
				/>
				<div
					data-page={ String( attributes.pageNum ) }
					className={ classnames( className, 'w-full', 'md:flex', 'mb-2', 'justify-between', {
						'has-text-color': textColor.color,
						[ textColor.class ]: textColor.class,
						'is-empty': isEmpty( attributes ),
						'page-last-item': attributes.lastItem,
					}, )
					}
					style={ textStyles }
				>
					<div className="wp-block-coblocks-events__date md:flex mb-2 md:mb-0 md:display-block">
						<RichText
							value={ attributes.eventDay }
							tagName="span"
							className="wp-block-coblocks-events__day display-block font-bold"
							placeholder={ __( 'Day…', 'coblocks' ) }
							onChange={ eventDay => setAttributes( { eventDay } ) }
							keepPlaceholderOnFocus
						/>
						<div>
							<RichText
								value={ attributes.eventMonth }
								tagName="span"
								className="wp-block-coblocks-events__month md:display-block mb-1"
								placeholder={ __( 'Month…', 'coblocks' ) }
								onChange={ eventMonth => setAttributes( { eventMonth } ) }
								keepPlaceholderOnFocus
							/>
							<RichText
								value={ attributes.eventYear }
								tagName="span"
								className="wp-block-coblocks-events__year md:display-block mb-0"
								placeholder={ __( 'Year…', 'coblocks' ) }
								onChange={ eventYear => setAttributes( { eventYear } ) }
								keepPlaceholderOnFocus
							/>
						</div>
					</div>
					<div className="wp-block-coblocks-events__content mb-2 md:mb-0">
						<RichText
							value={ attributes.title }
							tagName="span"
							className="wp-block-coblocks-events__title display-block font-bold mb-1"
							placeholder={ __( 'Write event title…', 'coblocks' ) }
							onChange={ title => setAttributes( { title } ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ attributes.description }
							tagName="span"
							className="wp-block-coblocks-events__description display-block"
							placeholder={ __( 'Write event description…', 'coblocks' ) }
							onChange={ description => setAttributes( { description } ) }
							keepPlaceholderOnFocus
						/>
					</div>
					<div className="wp-block-coblocks-events__details md:text-right">
						<RichText
							value={ attributes.eventTime }
							tagName="span"
							className="wp-block-coblocks-events__time font-bold display-block mb-1"
							placeholder={ __( 'Time…', 'coblocks' ) }
							onChange={ eventTime => setAttributes( { eventTime } ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ attributes.eventLocation }
							tagName="span"
							className="wp-block-coblocks-events__location display-block"
							placeholder={ __( 'Location…', 'coblocks' ) }
							onChange={ eventLocation => setAttributes( { eventLocation } ) }
							keepPlaceholderOnFocus
						/>
					</div>
					{ attributes.lastItem &&
						<div className="event-item-last">
							<div><span>={ __( 'Page Break', 'coblocks' ) }</span></div>
						</div>
					}
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
] )( EventsEdit );
