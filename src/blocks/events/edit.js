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
			isEditing: false,
			showExternalCalendarControls: !! this.props.attributes.externalCalendarUrl || false,
			externalCalendarUrl: this.props.attributes.externalCalendarUrl,
			currentPage: this.props.innerBlocks.length,
		};

		this.toggleExternalCalendarControls = this.toggleExternalCalendarControls.bind( this );
		this.saveExternalCalendarUrl = this.saveExternalCalendarUrl.bind( this );
		this.insertNewItem = this.insertNewItem.bind( this );
	}

	toggleExternalCalendarControls() {
		const { showExternalCalendarControls } = this.state;

		if ( ! showExternalCalendarControls === false ) {
			this.props.setAttributes( { externalCalendarUrl: '' } );
		}

		this.setState( { showExternalCalendarControls: ! showExternalCalendarControls } );
	}

	saveExternalCalendarUrl() {
		this.props.setAttributes( { externalCalendarUrl: this.state.externalCalendarUrl } );
		this.setState( { isEditing: false } );
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
		} = this.props;

		const toolbarControls = [
			{
				icon: 'edit',
				title: __( 'Edit Calendar URL', 'coblocks' ),
				onClick: () => this.setState( { isEditing: ! this.state.isEditing } ),
			},
		];

		return (
			<Fragment>
				<InspectorControls
					{ ...this.props }
					toggleExternalCalendarControls={ this.toggleExternalCalendarControls }
					showExternalCalendarControls={ this.state.showExternalCalendarControls }
				/>

				{ !! attributes.externalCalendarUrl &&
					<BlockControls>
						<Toolbar controls={ toolbarControls } />
					</BlockControls>
				}

				{ this.state.showExternalCalendarControls && ( ! attributes.externalCalendarUrl || this.state.isEditing ) &&
					<Placeholder
						icon="rss"
						label="Calendar URL">

						<TextControl
							placeholder={ __( 'Enter URL here…', 'coblocks' ) }
							value={ this.state.externalCalendarUrl }
							onChange={ externalCalendarUrl => this.setState( { externalCalendarUrl } ) }
							className={ 'components-placeholder__input' }
						/>
						<Button isLarge type="button" onClick={ this.saveExternalCalendarUrl } disabled={ ! this.state.externalCalendarUrl }>
							{ __( 'Use URL', 'coblocks' ) }
						</Button>
					</Placeholder>
				}

				{ ! attributes.externalCalendarUrl &&
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

				{ !! attributes.externalCalendarUrl &&
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
