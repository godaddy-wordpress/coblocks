/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import applyWithColors from './colors';
import { EventsContext } from '../context';
import InspectorControls from './inspector';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { RichText } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { useContext, useEffect } from '@wordpress/element';

const EventItemEdit = ( props ) => {
	const {
		className,
		attributes,
		setAttributes,
		setTextColor,
		textColor,
		clientId,
		isSelected,
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
		pointerEvents: isEditing === false && 'none',
	};

	useEffect( () => {
		if ( ( attributes.externalChange ) ) {
			setAttributes( { textColor: attributes.textColor } );
			setTextColor( attributes.textColor );
		}
	}, [ attributes ] );

	const handleSelectBlock = () => {
		if ( ! isSelected && isEditing === true ) {
			selectBlock( clientId );
		}
	};

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
				onClick={ handleSelectBlock }
				onKeyDown={ handleSelectBlock }
				role="button"
				style={ textStyles }
				tabIndex="0"
			>
				<div className="wp-block-coblocks-events__date">
					<RichText
						className="wp-block-coblocks-events__day"
						onChange={ ( newEventDay ) => setAttributes( { eventDay: newEventDay } ) }
						placeholder={ __( 'Day…', 'coblocks' ) }
						tagName="span"
						value={ eventDay }
					/>
					<div>
						<RichText
							className="wp-block-coblocks-events__month"
							onChange={ ( newEventMonth ) => setAttributes( { eventMonth: newEventMonth } ) }
							placeholder={ __( 'Month…', 'coblocks' ) }
							tagName="span"
							value={ eventMonth }
						/>
						<RichText
							className="wp-block-coblocks-events__year"
							onChange={ ( newEventYear ) => setAttributes( { eventYear: newEventYear } ) }
							placeholder={ __( 'Year…', 'coblocks' ) }
							tagName="span"
							value={ eventYear }
						/>
					</div>
				</div>
				<div className="wp-block-coblocks-events__content">
					<RichText
						className="wp-block-coblocks-events__title"
						onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
						placeholder={ __( 'Write event title…', 'coblocks' ) }
						tagName="span"
						value={ title }
					/>
					<RichText
						className="wp-block-coblocks-events__description"
						onChange={ ( newDescription ) => setAttributes( { description: newDescription } ) }
						placeholder={ __( 'Write event description…', 'coblocks' ) }
						tagName="span"
						value={ description }
					/>
				</div>
				<div className="wp-block-coblocks-events__details">
					<RichText
						className="wp-block-coblocks-events__time"
						onChange={ ( newEventTime ) => setAttributes( { eventTime: newEventTime } ) }
						placeholder={ __( 'Time…', 'coblocks' ) }
						tagName="span"
						value={ eventTime }
					/>
					<RichText
						className="wp-block-coblocks-events__location"
						onChange={ ( newEventLocation ) => setAttributes( { eventLocation: newEventLocation } ) }
						placeholder={ __( 'Location…', 'coblocks' ) }
						tagName="span"
						value={ eventLocation }
					/>
				</div>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( EventItemEdit );
