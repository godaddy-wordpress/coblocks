/*global jQuery*/

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
import { createBlock } from '@wordpress/blocks';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, dispatch } from '@wordpress/data';
import { InnerBlocks, BlockControls } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'coblocks/event-item' ];

const TEMPLATE = [
	[ 'coblocks/event-item' ],
];

const EVENTS_RANGE_OPTIONS = [
	{ value: '1 week', label: __( '1 week', 'coblocks' ) },
	{ value: '2 weeks', label: __( '2 weeks', 'coblocks' ) },
	{ value: '1 month', label: __( '1 month', 'coblocks' ) },
	{ value: 'all', label: __( 'Fetch all', 'coblocks' ) },
];

class EventsEdit extends Component {
	constructor() {
		super( ...arguments );

		const {
			externalCalendarUrl,
		} = this.props.attributes;

		this.state = {
			isEditing: false,
			showExternalCalendarControls: !! externalCalendarUrl || false,
			externalCalendarUrl,
		};

		this.toggleExternalCalendarControls = this.toggleExternalCalendarControls.bind( this );
		this.saveExternalCalendarUrl = this.saveExternalCalendarUrl.bind( this );
		this.insertNewItem = this.insertNewItem.bind( this );

		this.mutationObserverCallback = this.mutationObserverCallback.bind( this );
	}

	/**
	 * Setup the MutationObserver.
	 */
	componentDidMount() {
		this.observer = new MutationObserver( this.mutationObserverCallback );
		this.observer.observe( this.el, { childList: true } );
	}

	/**
	 * Refresh Slick to prevent display oddities when the block isSelected prop changes.
	 */
	componentDidUpdate() {
		if ( !! this.props.attributes.externalCalendarUrl && this.slickTarget ) {
			jQuery( this.slickTarget ).slick( 'slickSetOption', 'infinite', false, true );
		}
	}

	/**
	 * Disconnect the MutationObserver and remove Slick carousels.
	 */
	componentWillUnmount() {
		if ( !! this.props.attributes.externalCalendarUrl ) {
			jQuery( this.slickTarget ).slick( 'unslick' );
		}

		this.observer.disconnect();
	}

	/**
	 * The callback for our MutationObserver.
	 *
	 * A React Ref is used to track changes to our ServerSideRender component
	 * in order to initialize Slick Carousel for the rendered content.
	 *
	 * @param {Array} mutationsList List of objects describing each change that occurred.
	 */
	mutationObserverCallback( mutationsList ) {
		for ( const mutation of mutationsList ) {
			if ( mutation.type === 'childList' && mutation.addedNodes.length > 0 ) {
				if ( mutation.addedNodes[ 0 ].outerHTML.match( 'wp-block-coblocks-events' ) ) {
					this.slickTarget = mutation.addedNodes[ 0 ].children[ 0 ];

					jQuery( this.slickTarget ).slick( {
						infinite: false,
						rows: this.slickTarget.dataset.perPage,

						// Slick settings to disable within the Block Editor to prevent conflicts.
						accessibility: false, // Disable tabbing and arrow key navigation.
						draggable: false, // Disable mouse dragging slides.
						swipe: false, // Disable swiping slides.
						touchMove: false, // Disable touch swiping slides.
					} );
				}
			}
		}
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
		const { clientId, innerBlocks } = this.props;
		const newEvent = createBlock( 'coblocks/event-item' );
		dispatch( 'core/block-editor' ).insertBlock( newEvent, innerBlocks.length, clientId );
	}

	render() {
		const {
			className,
			attributes,
			setAttributes,
		} = this.props;

		const {
			externalCalendarUrl,
		} = attributes;

		const toolbarControls = [
			{
				icon: 'edit',
				title: __( 'Edit calendar URL', 'coblocks' ),
				onClick: () => this.setState( { isEditing: ! this.state.isEditing } ),
			},
		];

		return (
			<Fragment>
				<InspectorControls
					attributes={ attributes }
					toggleExternalCalendarControls={ this.toggleExternalCalendarControls }
					showExternalCalendarControls={ this.state.showExternalCalendarControls }
					eventsRangeOptions={ EVENTS_RANGE_OPTIONS }
					onChangeEventsToShow={ ( eventsToShow ) => setAttributes( { eventsToShow } ) }
					onChangeEventsRange={ ( eventsRange ) => setAttributes( { eventsRange } ) }
				/>

				{ !! externalCalendarUrl &&
					<BlockControls>
						<Toolbar controls={ toolbarControls } />
					</BlockControls>
				}

				{ this.state.showExternalCalendarControls && ( ! externalCalendarUrl || this.state.isEditing ) &&
					<Placeholder
						icon="rss"
						label={ __( 'Calendar URL', 'coblocks' ) }>

						<TextControl
							placeholder={ __( 'Enter URL here…', 'coblocks' ) }
							value={ this.state.externalCalendarUrl }
							onChange={ ( newExternalCalendarUrl ) => this.setState( { externalCalendarUrl: newExternalCalendarUrl } ) }
							className={ 'components-placeholder__input' }
						/>
						<Button isLarge type="button" onClick={ this.saveExternalCalendarUrl } disabled={ ! this.state.externalCalendarUrl }>
							{ __( 'Use URL', 'coblocks' ) }
						</Button>
					</Placeholder>
				}

				{ ! externalCalendarUrl && ! this.state.showExternalCalendarControls &&
					<div className={ classnames( className, 'coblocks-custom-event' ) }>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateInsertUpdatesSelection={ false }
							renderAppender={ () => <CustomAppender onClick={ this.insertNewItem } /> }
						/>
					</div>
				}

				<div ref={ ( el ) => this.el = el }>
					{ !! externalCalendarUrl &&
						<ServerSideRender
							block="coblocks/events"
							attributes={ this.props.attributes }
						/>
					}
				</div>
			</Fragment>
		);
	}
}

const applyWithSelect = withSelect( ( select, blockData ) => {
	return {
		innerBlocks: select( 'core/block-editor' ).getBlocks( blockData.clientId ),
	};
} );

export default compose( [ applyWithSelect ] )( EventsEdit );
