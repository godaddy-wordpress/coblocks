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
import { Placeholder, Button, TextControl, ToolbarGroup } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { edit } from '@wordpress/icons';

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

const EventsEdit = ( props ) => {
	const {
		className,
		attributes: {
			externalCalendarUrl,
		},
		setAttributes,
		clientId,
	} = props;

	const { insertBlock } = useDispatch( 'core/block-editor' );

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

	let observer = useRef( null );
	let elementRef = useRef( null );
	let slickTarget = useRef( null );

	const [ isEditing, setIsEditing ] = useState( false );
	const [ showExternalCalendarControls, setShowExternalCalendarControls ] = useState( !! externalCalendarUrl || false );
	const [ stateExternalCalendarUrl, setStateExternalCalendarUrl ] = useState( externalCalendarUrl );

	useEffect( () => {
		observer = new MutationObserver( mutationObserverCallback );
		observer.observe( elementRef, { childList: true } );
	}, [] );

	useEffect( () => {
		return () => {
			if ( !! externalCalendarUrl ) {
				jQuery( slickTarget ).slick( 'unslick' );
			}

			observer.disconnect();
		};
	}, [ externalCalendarUrl, observer ] );

	/**
	 * The callback for our MutationObserver.
	 *
	 * A React Ref is used to track changes to our ServerSideRender component
	 * in order to initialize Slick Carousel for the rendered content.
	 *
	 * @param {Array} mutationsList List of objects describing each change that occurred.
	 */
	const mutationObserverCallback = ( mutationsList ) => {
		for ( const mutation of mutationsList ) {
			if ( mutation.type === 'childList' && mutation.addedNodes.length > 0 ) {
				if ( mutation.addedNodes[ 0 ].outerHTML.match( 'wp-block-coblocks-events' ) ) {
					slickTarget = mutation.addedNodes[ 0 ].children[ 0 ];

					jQuery( slickTarget ).slick( {
						infinite: false,
						rows: slickTarget.dataset.perPage,

						// Slick settings to disable within the Block Editor to prevent conflicts.
						accessibility: false, // Disable tabbing and arrow key navigation.
						draggable: false, // Disable mouse dragging slides.
						swipe: false, // Disable swiping slides.
						touchMove: false, // Disable touch swiping slides.
					} );
				}
			}
		}
	};

	const toggleExternalCalendarControls = () => {
		if ( ! showExternalCalendarControls === false ) {
			setAttributes( { externalCalendarUrl: '' } );
		}

		setShowExternalCalendarControls( ! showExternalCalendarControls );
	};

	const saveExternalCalendarUrl = () => {
		setAttributes( { externalCalendarUrl: stateExternalCalendarUrl } );
		setIsEditing( false );
	};

	const insertNewItem = () => {
		const newEvent = createBlock( 'coblocks/event-item' );
		insertBlock( newEvent, innerBlocks.length, clientId );
	};

	const toolbarControls = [
		{
			icon: edit,
			title: __( 'Edit calendar URL', 'coblocks' ),
			onClick: () => setIsEditing( ! isEditing ),
		},
	];

	return (
		<>
			<InspectorControls
				attributes={ props.attributes }
				toggleExternalCalendarControls={ toggleExternalCalendarControls }
				showExternalCalendarControls={ showExternalCalendarControls }
				eventsRangeOptions={ EVENTS_RANGE_OPTIONS }
				onChangeEventsToShow={ ( eventsToShow ) => setAttributes( { eventsToShow } ) }
				onChangeEventsRange={ ( eventsRange ) => setAttributes( { eventsRange } ) }
			/>

			{ !! externalCalendarUrl &&
				<BlockControls>
					<ToolbarGroup controls={ toolbarControls } />
				</BlockControls>
			}

			{ showExternalCalendarControls && ( ! externalCalendarUrl || isEditing ) &&
				<Placeholder
					icon="rss"
					label={ __( 'Calendar URL', 'coblocks' ) }
					instructions={ __(
						'Enter a URL that loads and iCal formatted calendar.',
						'coblocks'
					) }
				>
					<form onSubmit={ saveExternalCalendarUrl }>
						<TextControl
							className={ 'components-placeholder__input' }
							onChange={ ( newExternalCalendarUrl ) => setStateExternalCalendarUrl( newExternalCalendarUrl ) }
							placeholder={ __( 'Enter URL here…', 'coblocks' ) }
							value={ stateExternalCalendarUrl }
						/>
						<Button
							disabled={ ! stateExternalCalendarUrl }
							isPrimary
							type="submit"
						>
							{ __( 'Use URL', 'coblocks' ) }
						</Button>
					</form>
				</Placeholder>
			}

			{ ! externalCalendarUrl && ! showExternalCalendarControls &&
				<div className={ classnames( className, 'coblocks-custom-event' ) }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
						renderAppender={ () => <CustomAppender onClick={ insertNewItem } /> }
					/>
				</div>
			}

			<div ref={ ( el ) => elementRef = el }>
				{ !! externalCalendarUrl &&
					<ServerSideRender
						block="coblocks/events"
						attributes={ props.attributes }
					/>
				}
			</div>
		</>
	);
};

export default EventsEdit;
