/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import applyWithColors from './colors';
import InspectorControls from './inspector';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';

class EventItemEdit extends Component {
	componentDidUpdate() {
		if ( ( this.props.attributes.externalChange ) ) {
			this.props.setAttributes( { textColor: this.props.attributes.textColor } );
			this.props.setTextColor( this.props.attributes.textColor );
		}
	}

	render() {
		const {
			className,
			attributes,
			setAttributes,
			textColor,
		} = this.props;

		const {
			description,
			eventDay,
			eventLocation,
			eventMonth,
			eventTime,
			eventYear,
			title,
		} = attributes;

		const textStyles = {
			color: textColor.color,
		};

		return (
			<Fragment>
				<InspectorControls { ...this.props }
				/>
				<div
					className={ classnames( className,
						{
							'has-text-color': textColor.color,
							[ textColor.class ]: textColor.class,
						}
					) }
					style={ textStyles }
				>
					<div className="wp-block-coblocks-events__date">
						<RichText
							value={ eventDay }
							tagName="span"
							className="wp-block-coblocks-events__day"
							placeholder={ __( 'Day…', 'coblocks' ) }
							onChange={ ( newEventDay ) => setAttributes( { eventDay: newEventDay } ) }
							keepPlaceholderOnFocus
						/>
						<div>
							<RichText
								value={ eventMonth }
								tagName="span"
								className="wp-block-coblocks-events__month"
								placeholder={ __( 'Month…', 'coblocks' ) }
								onChange={ ( newEventMonth ) => setAttributes( { eventMonth: newEventMonth } ) }
								keepPlaceholderOnFocus
							/>
							<RichText
								value={ eventYear }
								tagName="span"
								className="wp-block-coblocks-events__year"
								placeholder={ __( 'Year…', 'coblocks' ) }
								onChange={ ( newEventYear ) => setAttributes( { eventYear: newEventYear } ) }
								keepPlaceholderOnFocus
							/>
						</div>
					</div>
					<div className="wp-block-coblocks-events__content">
						<RichText
							value={ title }
							tagName="span"
							className="wp-block-coblocks-events__title"
							placeholder={ __( 'Write event title…', 'coblocks' ) }
							onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ description }
							tagName="span"
							className="wp-block-coblocks-events__description"
							placeholder={ __( 'Write event description…', 'coblocks' ) }
							onChange={ ( newDescription ) => setAttributes( { description: newDescription } ) }
							keepPlaceholderOnFocus
						/>
					</div>
					<div className="wp-block-coblocks-events__details">
						<RichText
							value={ eventTime }
							tagName="span"
							className="wp-block-coblocks-events__time"
							placeholder={ __( 'Time…', 'coblocks' ) }
							onChange={ ( newEventTime ) => setAttributes( { eventTime: newEventTime } ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ eventLocation }
							tagName="span"
							className="wp-block-coblocks-events__location"
							placeholder={ __( 'Location…', 'coblocks' ) }
							onChange={ ( newEventLocation ) => setAttributes( { eventLocation: newEventLocation } ) }
							keepPlaceholderOnFocus
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
] )( EventItemEdit );
