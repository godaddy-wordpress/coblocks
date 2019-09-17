/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../../utils/block-helpers';
import icons from './icons';

/**
 * External dependencies.
 */
import classnames from 'classnames';
import InspectorControls from './inspector';
import applyWithColors from '.././colors';
import {get, isEqual, isUndefined} from 'lodash';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { dispatch, select } = wp.data;
const { RichText } = wp.blockEditor;

/**
 * Handle creation and removal of placeholder elements so that we always have one available to use.
 *
 * @param {Integer} childClientId The child block's ClientId.
 * @param {String} blockName The block to insert.
 * @param {Object} blockAttributes The attributes for the placeholder block.
 */
const handlePlaceholderPlacement = (
	childClientId,
	blockName,
	blockAttributes = {}
) => {
	const itemClientId = select( 'core/block-editor' ).getBlockRootClientId(
		childClientId
	);

	const eventItems = select( 'core/block-editor' ).getBlocksByClientId( itemClientId )[ 0 ]
		.innerBlocks;

	const placeholders = eventItems.filter(
		item => item.name === blockName && isEmpty( item.attributes )
	);

	// Remove trailing placholders if there are more than one.
	dispatch( 'core/block-editor' ).removeBlocks(
		placeholders
			.filter( ( item, index ) => item.clientId !== childClientId && index !== 0 )
			.map( item => item.clientId ),
		false
	);

	// Add a placeholder if there are none.
	if ( placeholders.length === 0 ) {
		const newEventItem = wp.blocks.createBlock( blockName, blockAttributes );
		dispatch( 'core/editor' ).insertBlocks(
			newEventItem,
			eventItems.length,
			itemClientId,
			false
		);
	}
};

const isEmpty = attributes => {
	const attributesToCheck = [ 'title', 'description', 'eventDay', 'eventMonth', 'eventDate', 'eventTime', 'eventLocation' ];
	const newAttributes = Object.entries( attributes ).filter( ( [ key ] ) =>
		attributesToCheck.includes( key )
	);

	return hasEmptyAttributes( Object.fromEntries( newAttributes ) );
};

class EventsEdit extends Component {
	componentDidUpdate( prevProps ) {
		if ( ( this.props.attributes.externalChange ) ) {
			// this.props.attributes.textColor =
			this.props.setAttributes( { textColor: this.props.attributes.textColor, externalChange: false } );
			this.props.setTextColor( this.props.attributes.textColor );
		}
	}

	render() {
		const { className, attributes, setAttributes, textColor } = this.props;

		const richTextAttributes = {
			keepPlaceholderOnFocus: true,
			formattingControls: [ 'bold', 'italic' ],
		};

		const textClasses = classnames(
			{
				'has-text-color': textColor.color,
				[ textColor.class ]: textColor.class,
			}
		);

		const textStyles = {
			color: textColor.color,
		};

		return (
			<Fragment>
				<InspectorControls { ...this.props }
				/>
				<div data-page={ String( attributes.pageNum ) }
					className={ classnames( className, {
						'is-empty': isEmpty( attributes ),
						'page-last-item': attributes.lastItem,
					}, 'coblocks-custom-event-item' ) }
				>
					<div className="wp-block-coblocks-event-item__content">
						<div className={ classnames( textClasses, 'wp-block-coblocks-event-item__dates' ) } style={ textStyles }>
							<RichText
								value={ attributes.eventDay }
								tagName="p"
								wrapperClassName="wp-block-coblocks-event-item__day"
								placeholder={ __( 'Day...' ) }
								onChange={ eventDay => setAttributes( { eventDay } ) }
								{ ...richTextAttributes }
							/>
							<RichText
								value={ attributes.eventMonth }
								tagName="h4"
								wrapperClassName="wp-block-coblocks-event-item__month"
								placeholder={ __( 'Month...' ) }
								onChange={ eventMonth => setAttributes( { eventMonth } ) }
								{ ...richTextAttributes }
							/>
							<RichText
								value={ attributes.eventDate }
								tagName="h4"
								wrapperClassName="wp-block-coblocks-event-item__date"
								placeholder={ __( 'Date...' ) }
								onChange={ eventDate => setAttributes( { eventDate } ) }
								{ ...richTextAttributes }
							/>
						</div>
						<div className={ classnames( textClasses, 'wp-block-coblocks-event-item__heading-wrapper' ) } style={ textStyles }>
							<RichText
								value={ attributes.title }
								tagName="h4"
								wrapperClassName="wp-block-coblocks-event-item__heading"
								placeholder={ __( 'Write event title...' ) }
								onChange={ title => setAttributes( { title } ) }
								{ ...richTextAttributes }
							/>
							<RichText
								value={ attributes.description }
								tagName="p"
								wrapperClassName="wp-block-coblocks-event-item__description"
								placeholder={ __( 'Write event description...' ) }
								onChange={ description => setAttributes( { description } ) }
								{ ...richTextAttributes }
							/>
						</div>
						<div className={ classnames( textClasses, 'wp-block-coblocks-event-item__time-and-location' ) } style={ textStyles }>
							<RichText
								value={ attributes.eventTime }
								tagName="h5"
								wrapperClassName="wp-block-coblocks-event-item__time"
								placeholder={ __( '10:00pm - 1:00am' ) }
								onChange={ eventTime => setAttributes( { eventTime } ) }
								{ ...richTextAttributes }
							/>
							<RichText
								value={ attributes.eventLocation }
								tagName="p"
								wrapperClassName="wp-block-coblocks-event-item__location"
								placeholder={ __( 'Write location...' ) }
								onChange={ eventLocation => setAttributes( { eventLocation } ) }
								{ ...richTextAttributes }
							/>
						</div>
					</div>
					{ attributes.lastItem &&
					<div className="event-item-last" style={ textStyles }>
						<div><span>PAGE BREAK</span></div>
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
