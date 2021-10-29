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
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { edit } from '@wordpress/icons';
import ServerSideRender from '@wordpress/server-side-render';
import { BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { Button, Placeholder, TextControl, ToolbarGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef, useState } from '@wordpress/element';

const ALLOWED_BLOCKS = [ 'coblocks/event-item' ];

const TEMPLATE = [
	[ 'coblocks/event-item' ],
];

const EVENTS_RANGE_OPTIONS = [
	{ label: __( '1 week', 'coblocks' ), value: '1 week' },
	{ label: __( '2 weeks', 'coblocks' ), value: '2 weeks' },
	{ label: __( '1 month', 'coblocks' ), value: '1 month' },
	{ label: __( 'Fetch all', 'coblocks' ), value: 'all' },
];

const EventsEdit = ( props ) => {
	const {
		className,
		attributes,
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

	const externalCalendarUrl = attributes.externalCalendarUrl;
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
						// Slick settings to disable within the Block Editor to prevent conflicts.
						accessibility: false, // Disable tabbing and arrow key navigation.
						draggable: false, // Disable mouse dragging slides.
						infinite: false,
						rows: slickTarget.dataset.perPage,
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
			onClick: () => setIsEditing( ! isEditing ),
			title: __( 'Edit calendar URL', 'coblocks' ),
		},
	];

	return (
		<>
			<InspectorControls
				attributes={ attributes }
				eventsRangeOptions={ EVENTS_RANGE_OPTIONS }
				onChangeEventsRange={ ( eventsRange ) => setAttributes( { eventsRange } ) }
				onChangeEventsToShow={ ( eventsToShow ) => setAttributes( { eventsToShow } ) }
				showExternalCalendarControls={ showExternalCalendarControls }
				toggleExternalCalendarControls={ toggleExternalCalendarControls }
			/>

			{ !! externalCalendarUrl &&
				<BlockControls>
					<ToolbarGroup controls={ toolbarControls } />
				</BlockControls>
			}

			{ showExternalCalendarControls && ( ! externalCalendarUrl || isEditing ) &&
				<Placeholder
					icon="rss"
					instructions={ __(
						'Enter a URL that loads an iCal formatted calendar.',
						'coblocks'
					) }
					label={ __( 'Calendar URL', 'coblocks' ) }
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
						renderAppender={ () => <CustomAppender onClick={ insertNewItem } /> }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			}

			<div ref={ ( el ) => elementRef = el }>
				{ !! externalCalendarUrl &&
					<ServerSideRender
						attributes={ attributes }
						block="coblocks/events"
					/>
				}
			</div>
		</>
	);
};

export default EventsEdit;
