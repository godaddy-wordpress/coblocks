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
		const { className, attributes, setAttributes, textColor } = this.props;

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
							value={ attributes.eventDay }
							tagName="span"
							className="wp-block-coblocks-events__day"
							placeholder={ __( 'Day…', 'coblocks' ) }
							onChange={ eventDay => setAttributes( { eventDay } ) }
							keepPlaceholderOnFocus
						/>
						<div>
							<RichText
								value={ attributes.eventMonth }
								tagName="span"
								className="wp-block-coblocks-events__month"
								placeholder={ __( 'Month…', 'coblocks' ) }
								onChange={ eventMonth => setAttributes( { eventMonth } ) }
								keepPlaceholderOnFocus
							/>
							<RichText
								value={ attributes.eventYear }
								tagName="span"
								className="wp-block-coblocks-events__year"
								placeholder={ __( 'Year…', 'coblocks' ) }
								onChange={ eventYear => setAttributes( { eventYear } ) }
								keepPlaceholderOnFocus
							/>
						</div>
					</div>
					<div className="wp-block-coblocks-events__content">
						<RichText
							value={ attributes.title }
							tagName="span"
							className="wp-block-coblocks-events__title"
							placeholder={ __( 'Write event title…', 'coblocks' ) }
							onChange={ title => setAttributes( { title } ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ attributes.description }
							tagName="span"
							className="wp-block-coblocks-events__description"
							placeholder={ __( 'Write event description…', 'coblocks' ) }
							onChange={ description => setAttributes( { description } ) }
							keepPlaceholderOnFocus
						/>
					</div>
					<div className="wp-block-coblocks-events__details">
						<RichText
							value={ attributes.eventTime }
							tagName="span"
							className="wp-block-coblocks-events__time"
							placeholder={ __( 'Time…', 'coblocks' ) }
							onChange={ eventTime => setAttributes( { eventTime } ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ attributes.eventLocation }
							tagName="span"
							className="wp-block-coblocks-events__location"
							placeholder={ __( 'Location…', 'coblocks' ) }
							onChange={ eventLocation => setAttributes( { eventLocation } ) }
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
