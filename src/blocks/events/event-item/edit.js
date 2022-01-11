/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import applyWithColors from './colors';
import InspectorControls from './inspector';
import { withEventsState, EventsContext } from '../context';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { useEffect, useContext } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

const EventItemEdit = ( props ) => {
	const {
		className,
		attributes,
		setAttributes,
		setTextColor,
		textColor,
		clientId,
		isSelected
	} = props;

	const { isEditing } = useContext( EventsContext );

	const { selectBlock } = useDispatch( 'core/block-editor' );

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
		pointerEvents: isEditing === false && 'none' 
	};

	useEffect( () => {
		if ( ( attributes.externalChange ) ) {
			setAttributes( { textColor: attributes.textColor } );
			setTextColor( attributes.textColor );
		}
	}, [ attributes ] );

	const handleSelectBlock = () => {
		if ( !isSelected && isEditing === true ) {
			selectBlock( clientId );
		}
	}

	return (
		<>
			<InspectorControls { ...props }
			/>
			<div
				className={ classnames( className,
					{
						'has-text-color': textColor.color,
						[ textColor.class ]: textColor.class,
					}
				) }
				style={ textStyles }
				onClick={ handleSelectBlock }
			>
				<div className="wp-block-coblocks-events__date">
					<RichText
						value={ eventDay }
						tagName="span"
						className="wp-block-coblocks-events__day"
						placeholder={ __( 'Day…', 'coblocks' ) }
						onChange={ ( newEventDay ) => setAttributes( { eventDay: newEventDay } ) }
					/>
					<div>
						<RichText
							value={ eventMonth }
							tagName="span"
							className="wp-block-coblocks-events__month"
							placeholder={ __( 'Month…', 'coblocks' ) }
							onChange={ ( newEventMonth ) => setAttributes( { eventMonth: newEventMonth } ) }
						/>
						<RichText
							value={ eventYear }
							tagName="span"
							className="wp-block-coblocks-events__year"
							placeholder={ __( 'Year…', 'coblocks' ) }
							onChange={ ( newEventYear ) => setAttributes( { eventYear: newEventYear } ) }
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
					/>
					<RichText
						value={ description }
						tagName="span"
						className="wp-block-coblocks-events__description"
						placeholder={ __( 'Write event description…', 'coblocks' ) }
						onChange={ ( newDescription ) => setAttributes( { description: newDescription } ) }
					/>
				</div>
				<div className="wp-block-coblocks-events__details">
					<RichText
						value={ eventTime }
						tagName="span"
						className="wp-block-coblocks-events__time"
						placeholder={ __( 'Time…', 'coblocks' ) }
						onChange={ ( newEventTime ) => setAttributes( { eventTime: newEventTime } ) }
					/>
					<RichText
						value={ eventLocation }
						tagName="span"
						className="wp-block-coblocks-events__location"
						placeholder={ __( 'Location…', 'coblocks' ) }
						onChange={ ( newEventLocation ) => setAttributes( { eventLocation: newEventLocation } ) }
					/>
				</div>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( EventItemEdit );
