/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
import InspectorControls from './inspector';
import applyWithColors from './colors';
import icons from './icons';
import { cloneDeep } from 'lodash';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { Toolbar, Placeholder, Button, TextControl, ServerSideRender } = wp.components;
const { compose } = wp.compose;
const { withSelect, dispatch, select } = wp.data;
const { InnerBlocks, BlockControls } = wp.blockEditor;

const ALLOWED_BLOCKS = [ 'coblocks/event-item' ];

const TEMPLATE = [
	[ 'coblocks/event-item' ],
];

class EventItem extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			editing: ! this.props.attributes.externalCalendarUrl && this.props.attributes.linkACalendar,
		};

		this.onSubmitURL = this.onSubmitURL.bind( this );
	}

	componentDidUpdate( prevProps ) {
		// Here we are checking whether the ordering of items has been changed, in order to put proper item on its page
		const prevInnerBlocksSorted = cloneDeep( prevProps.innerBlocks );
		const currentInnerBlockSorted = cloneDeep( this.props.innerBlocks );
		prevInnerBlocksSorted.sort( function( a, b ) {
			return a.clientId.localeCompare( b.clientId );
		} );
		currentInnerBlockSorted.sort( function( a, b ) {
			return a.clientId.localeCompare( b.clientId );
		} );
		// The purpose of sameSorted check is that we check if content of the items has been changed
		const sameSorted = JSON.stringify( prevInnerBlocksSorted ) === JSON.stringify( currentInnerBlockSorted );
		const sameUnsorted = JSON.stringify( prevProps.innerBlocks ) === JSON.stringify( this.props.innerBlocks );
		// Only if the content of the events is the same, and the ordering is different, then we can go through each item
		// to find its place on the page.
		if ( sameSorted && ! sameUnsorted ) {
			const { attributes } = this.props;

			this.props.innerBlocks.map( ( item, key ) => {
				const lastItemOnPage = key % attributes.eventsToShow === ( attributes.eventsToShow - 1 );

				dispatch( 'core/block-editor' ).updateBlockAttributes(
					item.clientId,
					{ pageNum: Math.floor( key / attributes.eventsToShow ), lastItem: lastItemOnPage }
				);
			} );
		}
	}

	updateInnerAttributes = ( blockName, newAttributes ) => {
		const innerItems = this.props.innerBlocks;

		innerItems.map( item => {
			if ( item.name === blockName ) {
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					item.clientId,
					newAttributes
				);
			}
		} );
	};

	updateTextColor = ( value ) => {
		const { attributes, setAttributes, setTextColor, textColor } = this.props;

		setTextColor( value );

		this.updateInnerAttributes( 'coblocks/event-item', { textColor: value, externalChange: true } );
	};

	toggleCalendarLink = ( ) => {
		const { attributes, setAttributes } = this.props;

		const linkACalendar = ! attributes.linkACalendar;
		setAttributes( { linkACalendar } );

		const edit = linkACalendar && attributes.externalCalendarUrl === '';
		this.setState( { editing: edit } );
	};

	onSubmitURL( event ) {
		event.preventDefault();

		const { externalCalendarUrl } = this.props.attributes;
		if ( externalCalendarUrl ) {
			this.setState( { editing: false } );
		}
	}

	changeVisibleEvents = ( value ) => {
		const { attributes, setAttributes } = this.props;

		setAttributes( { eventsToShow: value } );

		this.props.innerBlocks.map( ( item, key ) => {
			const lastItemOnPage = key % value === ( value - 1 );

			dispatch( 'core/block-editor' ).updateBlockAttributes(
				item.clientId,
				{ pageNum: Math.floor( key / value ), lastItem: lastItemOnPage }
			);
		});
	};

	insertNewItem = () => {
		const { clientId, attributes } = this.props;

		const newItemPageNumber = Math.floor( this.props.innerBlocks.length / attributes.eventsToShow );

		const lastItemOnPage = this.props.innerBlocks.length % attributes.eventsToShow === ( attributes.eventsToShow - 1 );

		const newEventBlock = TEMPLATE.map( ( [ blockName, blockAttributes ] ) =>
			wp.blocks.createBlock(
				blockName,
				Object.assign( {}, blockAttributes, {
					textColor: attributes.textColor,
					pageNum: newItemPageNumber,
					lastItem: lastItemOnPage,
				} )
			)
		);

		attributes.currentPage = newItemPageNumber;

		this.props.innerBlocks.push( newEventBlock[0] );

		dispatch( 'core/editor' ).insertBlock( newEventBlock[0], this.props.innerBlocks.length, clientId );

		this.props.block.innerBlocks.map( ( key, value ) => {
			key.originalContent = '';
			if ( key.attributes.pageNum !== newItemPageNumber ) {
				key.originalContent = key.originalContent.replace( 'wp-block-coblocks-event-item', 'wp-block-coblocks-event-item hide-item' );
			}
		});
	};

	render() {
		const {
			className,
			attributes,
			isSelected,
			clientId,
			selectedParentClientId,
			textColor,
			setAttributes,
		} = this.props;

		attributes.childrenLength = select( 'core/block-editor' ).getBlock( clientId ).innerBlocks.length;

		const { editing } = this.state;

		const textClasses = classnames(
			{
				'has-text-color': textColor.color,
				[ textColor.class ]: textColor.class,
			}
		);

		const textStyles = {
			color: textColor.color,
		};

		const toolbarControls = [
			{
				icon: 'edit',
				title: __( 'Edit Calendar URL' ),
				onClick: () => this.setState( { editing: true } ),
			},
		];

		if ( this.state.editing ) {
			return (
				<Fragment>
					<InspectorControls
						{ ...this.props }
						onUpdateTextColor={ this.updateTextColor }
						onToggleCalendarLink={ this.toggleCalendarLink }
					/>
					<Placeholder
						icon="rss"
						label="Calendar URL"
					>
						<form onSubmit={ this.onSubmitURL }>
							<TextControl
								placeholder={ __( 'Enter URL here…' ) }
								value={ attributes.externalCalendarUrl }
								onChange={ ( value ) => setAttributes( { externalCalendarUrl: value } ) }
								className={ 'components-placeholder__input' }
							/>
							<Button isLarge type="submit">
								{ __( 'Use URL' ) }
							</Button>
						</form>
					</Placeholder>
				</Fragment>
			);
		}

		return (
			<Fragment>
				{ attributes.linkACalendar &&
				<BlockControls>
					<Toolbar controls={ toolbarControls } />
				</BlockControls>
				}
				<InspectorControls
					{ ...this.props }
					onUpdateTextColor={ this.updateTextColor }
					onToggleCalendarLink={ this.toggleCalendarLink }
					onChangeVisibleEvents={ this.changeVisibleEvents }
				/>
				{ ! attributes.linkACalendar &&
				<div data-current-page-num={ String( attributes.currentPage ) }
					className={ classnames( className, {
						'child-selected': isSelected || clientId === selectedParentClientId,
					}, 'coblocks-custom-event' ) }
				>
					{ ! attributes.linkACalendar &&
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
					/>
					}
					{ ( isSelected || clientId === selectedParentClientId ) && ! attributes.linkACalendar && (
						<CustomAppender onClick={ this.insertNewItem } />
					) }
				</div>
				}
				{ attributes.linkACalendar &&
				<ServerSideRender
					block="coblocks/events"
					attributes={ this.props.attributes }
					className="coblocks-ical-events"
				/>
				}
			</Fragment>
		);
	}
}

const applyWithSelect = withSelect( ( select, blockData ) => {
	const selectedClientId = select( 'core/block-editor' ).getBlockSelectionStart();
	const parentClientId = select( 'core/block-editor' ).getBlockRootClientId(
		selectedClientId
	);

	return {
		selectedParentClientId: parentClientId,
		innerBlocks: select( 'core/block-editor' ).getBlocks( blockData.clientId ),
	};
} );

export default compose( [ applyWithSelect, applyWithColors ] )( EventItem );
