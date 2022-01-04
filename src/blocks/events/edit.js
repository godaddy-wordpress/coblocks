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
import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

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
import { usePrevious } from '@wordpress/compose';
import { isEmpty } from 'lodash';

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
		isSelected,
		selected,
		...restProps
	} = props;

	const { selectBlock, insertBlock } = useDispatch( 'core/block-editor' );

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

	const prevIsSelected = usePrevious( isSelected );

	let observer = useRef( null );
	// let elementRef = useRef( null );
	let slickTarget = useRef( null );
	let blockContainerRef = useRef( null );

	const externalCalendarUrl = attributes.externalCalendarUrl;
	const [ isEditing, setIsEditing ] = useState( false );
	const [ showExternalCalendarControls, setShowExternalCalendarControls ] = useState( !! externalCalendarUrl || false );
	const [ stateExternalCalendarUrl, setStateExternalCalendarUrl ] = useState( externalCalendarUrl );

	const closeEditing = () => setIsEditing( false );

	useEffect(() => {
			const innerBlockSelected = innerBlocks.some(({ clientId }) => clientId === selected?.clientId);
			if ( prevIsSelected !== isSelected && isSelected === false && !innerBlockSelected ) {
				setIsEditing( false );
			}
	}, [ prevIsSelected, isSelected, innerBlocks, selected ]);

	// useEffect(() => {
	// 	console.log('blockContainerRef', blockContainerRef);
	// 	blockContainerRef?.current?.addEventListener('')
	// },[]);

	// useEffect( () => {
	// 	observer = new MutationObserver( mutationObserverCallback );
	// 	observer.observe( elementRef, { childList: true } );
	// }, [] );

	// useEffect( () => {
	// 	return () => {
	// 		if ( !! externalCalendarUrl ) {
	// 			jQuery( slickTarget ).slick( 'unslick' );
	// 		}

	// 		observer.disconnect();
	// 	};
	// }, [ externalCalendarUrl, observer ] );

	/**
	 * The callback for our MutationObserver.
	 *
	 * A React Ref is used to track changes to our ServerSideRender component
	 * in order to initialize Slick Carousel for the rendered content.
	 *
	 * @param {Array} mutationsList List of objects describing each change that occurred.
	 */
	// const mutationObserverCallback = ( mutationsList ) => {
	// 	for ( const mutation of mutationsList ) {
	// 		if ( mutation.type === 'childList' && mutation.addedNodes.length > 0 ) {
	// 			if ( mutation.addedNodes[ 0 ].outerHTML.match( 'wp-block-coblocks-events' ) ) {
	// 				slickTarget = mutation.addedNodes[ 0 ].children[ 0 ];

	// 				jQuery( slickTarget ).slick( {
	// 					// Slick settings to disable within the Block Editor to prevent conflicts.
	// 					accessibility: false, // Disable tabbing and arrow key navigation.
	// 					draggable: false, // Disable mouse dragging slides.
	// 					infinite: false,
	// 					rows: slickTarget.dataset.perPage,
	// 					swipe: false, // Disable swiping slides.
	// 					touchMove: false, // Disable touch swiping slides.
	// 				} );
	// 			}
	// 		}
	// 	}
	// };

	const handleSelectBlock = () => {
		if ( !isSelected ) {
			selectBlock( clientId );
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
			onClick: () => {
				setIsEditing( ! isEditing )
			},
			title: __( !! externalCalendarUrl ? 'Edit calendar URL' : 'Edit Events', 'coblocks' ),
		},
	];

	// if ( isEditing === true ) {
	// 	return (
	// 		<EditMode insertNewItem={insertNewItem} showExternalCalendarControls={ showExternalCalendarControls } innerBlocks={innerBlocks} {...props} />
	// 	); 
	// }

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

			{ isSelected &&
				<BlockControls>
					<ToolbarGroup controls={ toolbarControls } />
				</BlockControls>
			}

			{isEditing ? (
					<EditMode 
						insertNewItem={insertNewItem} 
						showExternalCalendarControls={ showExternalCalendarControls } 
						innerBlocks={innerBlocks} 
						isEditing={isEditing}
						closeEditing={closeEditing}
						saveExternalCalendarUrl={saveExternalCalendarUrl}
						{...props} 
					/>
			) : (
				<div onClick={ handleSelectBlock }>
							<EventsCarousel />
				</div>
			)}
		</>
	);
};

const EditMode = ( props ) => {
	const { closeEditing, isEditing, insertNewItem, className, attributes, showExternalCalendarControls } = props;
	const {
		externalCalendarUrl
	} = attributes;

	const editContentContainerRef = useRef( null );

	const handleClickOutside = ( e ) => {
		const toolbarNode = document.querySelector('.components-popover__content');
		if ( !editContentContainerRef.current.contains( e.target ) && !toolbarNode?.contains( e.target) ) {
			closeEditing();
		}
	};

	useEffect(() => {
		document.body.addEventListener('click', handleClickOutside);

		return () => {
			document.body.removeEventListener('click', handleClickOutside);
		}
	}, []);

	const renderContent = () => {
		if ( ! props.externalCalendarUrl && ! props.showExternalCalendarControls ) {
			return (
				<div className={ classnames( props.className, 'coblocks-custom-event' ) }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						renderAppender={ () => <CustomAppender onClick={ props.insertNewItem } /> }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
					/>
				</div>
			);
		} else if ( props.showExternalCalendarControls && ( ! props.externalCalendarUrl || props.isEditing ) ) {
			// using external calendar
			return (
				<Placeholder
					icon="rss"
					instructions={ __(
						'Enter a URL that loads an iCal formatted calendar.',
						'coblocks'
					) }
					label={ __( 'Calendar URL', 'coblocks' ) }
				>
					<form onSubmit={ props.saveExternalCalendarUrl }>
						<TextControl
							className={ 'components-placeholder__input' }
							onChange={ ( newExternalCalendarUrl ) => props.setStateExternalCalendarUrl( newExternalCalendarUrl ) }
							placeholder={ __( 'Enter URL here…', 'coblocks' ) }
							value={ props.stateExternalCalendarUrl }
						/>
						<Button
							disabled={ ! props.stateExternalCalendarUrl }
							isPrimary
							type="submit"
						>
							{ __( 'Use URL', 'coblocks' ) }
						</Button>
					</form>
				</Placeholder>
			);
		}
	}

	return (
		<div ref={editContentContainerRef}>
			{renderContent()}
		</div>
	)
};

const EventsCarousel = (props) => {
	const { className, externalCalendarUrl, showExternalCalendarControls } = props;

	useEffect(() => {
		const innerBlocksContainer = document.querySelector('.coblocks-events-swiper-container > .block-editor-inner-blocks > .block-editor-block-list__layout');

		if ( !innerBlocksContainer ) {
			return;
		}

		const swiperContainer = document.createElement('div');
		swiperContainer.setAttribute('class', 'swiper-container');

		innerBlocksContainer.appendChild( swiperContainer );

		const swiperWrapper = document.createElement('div');
		swiperWrapper.setAttribute('class', 'swiper-wrapper');

		swiperContainer.appendChild( swiperWrapper );

		const eventItemBlocks = document.querySelectorAll('[data-type="coblocks/event-item"]');

		for ( let i = 0; i < eventItemBlocks.length; i++ ) {
			const eventItem = eventItemBlocks[i];

			const swiperSlideWrapper = document.createElement('div');
			swiperSlideWrapper.setAttribute('class', 'swiper-slide');

			swiperSlideWrapper.appendChild( eventItem );

			swiperWrapper.appendChild( swiperSlideWrapper );
		}

		const swiperBackButton = document.getElementById( `coblocks-event-swiper-prev` );
		const swiperNextButton = document.getElementById( `coblocks-event-swiper-next` );

		new TinySwiper(swiperContainer, {
			touchable: false,
			plugins: [
				TinySwiperPluginNavigation,
			],
			navigation: {
				prevEl: swiperBackButton,
				nextEl: swiperNextButton,
			},
		})
	}, []);

	return (
		<>
		 { ! externalCalendarUrl && ! showExternalCalendarControls &&
				<div className={ classnames( className, 'coblocks-custom-event' ) }>
						<div className="coblocks-events-swiper-container">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateInsertUpdatesSelection={ false }
							/>
						</div>
				</div>
			}

			<div >
				{ !! externalCalendarUrl &&
					<ServerSideRender
						attributes={ attributes }
						block="coblocks/events"
					/>
				}
			</div>

			<button className={ `coblocks-events-nav-button__prev` } id={ `coblocks-event-swiper-prev` } />
			<button className={ `coblocks-events-nav-button__next` } id={ `coblocks-event-swiper-next` } />
		</>
	)
}

export default EventsEdit;
