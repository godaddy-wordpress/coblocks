/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
import InspectorControls from './inspector';

/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { Toolbar, Placeholder, Button, TextControl, ServerSideRender } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, dispatch } from '@wordpress/data';
import { InnerBlocks, BlockControls } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'coblocks/event-item' ];

const TEMPLATE = [
	[ 'coblocks/event-item' ],
];

class EventItem extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			editing: ! this.props.attributes.externalCalendarUrl && this.props.attributes.linkACalendar,
			currentPage: this.props.innerBlocks.length,
		};

		this.onSubmitURL = this.onSubmitURL.bind( this );
		this.toggleCalendarLink = this.toggleCalendarLink.bind( this );
		this.insertNewItem = this.insertNewItem.bind( this );
	}

	toggleCalendarLink() {
		const { attributes, setAttributes } = this.props;

		const linkACalendar = ! attributes.linkACalendar;
		setAttributes( { linkACalendar } );

		const edit = linkACalendar && attributes.externalCalendarUrl === '';
		this.setState( { editing: edit } );
	}

	onSubmitURL( event ) {
		event.preventDefault();

		const { externalCalendarUrl } = this.props.attributes;

		if ( externalCalendarUrl ) {
			this.setState( { editing: false } );
		}
	}

	insertNewItem() {
		const { clientId, attributes } = this.props;

		const newItemPageNumber = Math.floor( this.props.innerBlocks.length / attributes.eventsToShow );

		const lastItemOnPage = this.props.innerBlocks.length % attributes.eventsToShow === ( attributes.eventsToShow - 1 );

		const newEventBlock = TEMPLATE.map( ( [ blockName, blockAttributes ] ) =>
			wp.blocks.createBlock(
				blockName,
				Object.assign( {}, blockAttributes, {
					pageNum: newItemPageNumber,
					lastItem: lastItemOnPage,
				} )
			)
		);

		this.setState( { currentPage: newItemPageNumber } );

		this.props.innerBlocks.push( newEventBlock[ 0 ] );

		dispatch( 'core/block-editor' ).insertBlock( newEventBlock[ 0 ], this.props.innerBlocks.length, clientId );

		this.props.innerBlocks.map( ( key ) => {
			key.originalContent = '';
			if ( key.attributes.pageNum !== newItemPageNumber ) {
				key.originalContent = key.originalContent.replace( 'wp-block-coblocks-event-item', 'wp-block-coblocks-event-item hide-item' );
			}
		} );
	}

	render() {
		const {
			className,
			attributes,
			isSelected,
			clientId,
			selectedParentClientId,
			setAttributes,
		} = this.props;

		const toolbarControls = [
			{
				icon: 'edit',
				title: __( 'Edit Calendar URL', 'coblocks' ),
				onClick: () => this.setState( { editing: true } ),
			},
		];

		if ( this.state.editing ) {
			return (
				<Fragment>
					<InspectorControls
						{ ...this.props }
						onToggleCalendarLink={ this.toggleCalendarLink }
					/>
					<Placeholder
						icon="rss"
						label="Calendar URL"
					>
						<form onSubmit={ this.onSubmitURL }>
							<TextControl
								placeholder={ __( 'Enter URL here…', 'coblocks' ) }
								value={ attributes.externalCalendarUrl }
								onChange={ ( value ) => setAttributes( { externalCalendarUrl: value } ) }
								className={ 'components-placeholder__input' }
							/>
							<Button isLarge type="submit">
								{ __( 'Use URL', 'coblocks' ) }
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
					onToggleCalendarLink={ this.toggleCalendarLink }
				/>
				{ ! attributes.linkACalendar &&
					<div className={ classnames( className, 'coblocks-custom-event',
						{
							'child-selected': isSelected || clientId === selectedParentClientId,
						}
					) }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateInsertUpdatesSelection={ false }
						/>
						{ ( isSelected || clientId === selectedParentClientId ) && ! attributes.linkACalendar && (
							<CustomAppender onClick={ this.insertNewItem } />
						) }
					</div>
				}
				{ attributes.linkACalendar &&
					<ServerSideRender
						block="coblocks/events"
						attributes={ this.props.attributes }
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

export default compose( [ applyWithSelect ] )( EventItem );
