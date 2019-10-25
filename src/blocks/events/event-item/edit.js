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
					className={ classnames( className, 'md:flex', 'justify-between', {
						'has-text-color': textColor.color,
						[ textColor.class ]: textColor.class,
						'is-empty': isEmpty( attributes ),
						'page-last-item': attributes.lastItem,
					}, )
					}
					style={ textStyles }
				>
					<div className="wp-block-coblocks-events__date">
						<RichText
							value={ attributes.eventDay }
							tagName="span"
							className="wp-block-coblocks-events__day display-block"
							placeholder={ __( 'Day…', 'coblocks' ) }
							onChange={ eventDay => setAttributes( { eventDay } ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ attributes.eventMonth }
							tagName="span"
							className="wp-block-coblocks-events__month display-block"
							placeholder={ __( 'Month…', 'coblocks' ) }
							onChange={ eventMonth => setAttributes( { eventMonth } ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ attributes.eventYear }
							tagName="span"
							className="wp-block-coblocks-events__year display-block"
							placeholder={ __( 'Year…', 'coblocks' ) }
							onChange={ eventYear => setAttributes( { eventYear } ) }
							keepPlaceholderOnFocus
						/>
					</div>
					<div className="wp-block-coblocks-events__content">
						<RichText
							value={ attributes.title }
							tagName="span"
							className="wp-block-coblocks-events__title display-block"
							placeholder={ __( 'Write event title…', 'coblocks' ) }
							onChange={ title => setAttributes( { title } ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ attributes.description }
							tagName="span"
							className="wp-block-coblocks-events__description display-block"
							placeholder={ __( 'Write event description…' ) }
							onChange={ description => setAttributes( { description } ) }
							keepPlaceholderOnFocus
						/>
					</div>
					<div className="wp-block-coblocks-events__details">
						<RichText
							value={ attributes.eventTime }
							tagName="span"
							className="wp-block-coblocks-events__time display-block"
							placeholder={ __( 'Time…' ) }
							onChange={ eventTime => setAttributes( { eventTime } ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ attributes.eventLocation }
							tagName="span"
							className="wp-block-coblocks-events__location display-block"
							placeholder={ __( 'Location…' ) }
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
