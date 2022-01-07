/*global jQuery*/

/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
import InspectorControls from './inspector';

/**
 * External dependencies.
 */
import { v4 as generateUuid } from 'uuid';
import classnames from 'classnames';
import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { edit, handle } from '@wordpress/icons';
import ServerSideRender from '@wordpress/server-side-render';
import { BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { Button, Placeholder, TextControl, ToolbarGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef, useState, useMemo } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';

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
		attributes,
		setAttributes,
		clientId,
		isSelected,
		selected
	} = props;

	const { selectBlock, insertBlock } = useDispatch( 'core/block-editor' );

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

	const prevIsSelected = usePrevious( isSelected );
	const prevInnerBlocksLength = usePrevious( innerBlocks.length );

	const externalCalendarUrl = attributes.externalCalendarUrl;
	const [ isEditing, setIsEditing ] = useState( false );
	const [ showExternalCalendarControls, setShowExternalCalendarControls ] = useState( !! externalCalendarUrl || false );
	const [ stateExternalCalendarUrl, setStateExternalCalendarUrl ] = useState( externalCalendarUrl );

	const [carouselCssText, setCarouselCssText] = useState( null );
	const [swiper, setSwiper] = useState( null );
	const eventsContainerRef = useRef( null );

	const closeEditing = () => setIsEditing( false );

	const carouselUuid = useMemo( () => generateUuid(), [] );

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

	// return (
	// 	<>
	// 		<InspectorControls
	// 			attributes={ attributes }
	// 			eventsRangeOptions={ EVENTS_RANGE_OPTIONS }
	// 			onChangeEventsRange={ ( eventsRange ) => setAttributes( { eventsRange } ) }
	// 			onChangeEventsToShow={ ( eventsToShow ) => setAttributes( { eventsToShow } ) }
	// 			showExternalCalendarControls={ showExternalCalendarControls }
	// 			toggleExternalCalendarControls={ toggleExternalCalendarControls }
	// 		/>

	// 		{ isSelected &&
	// 			<BlockControls>
	// 				<ToolbarGroup controls={ toolbarControls } />
	// 			</BlockControls>
	// 		}

	// 		{isEditing ? (
	// 				<EditMode 
	// 					insertNewItem={insertNewItem} 
	// 					showExternalCalendarControls={ showExternalCalendarControls } 
	// 					innerBlocks={innerBlocks} 
	// 					closeEditing={closeEditing}
	// 					saveExternalCalendarUrl={saveExternalCalendarUrl}
	// 					{...props} 
	// 				/>
	// 		) : (
	// 			<div onClick={ handleSelectBlock } >
	// 				<EventsCarousel innerBlocks={innerBlocks} />
	// 			</div>
	// 		)}
	// 	</>
	// );

			// 	{isEditing ? (
			// 		<EditMode 
			// 			insertNewItem={insertNewItem} 
			// 			showExternalCalendarControls={ showExternalCalendarControls } 
			// 			innerBlocks={innerBlocks} 
			// 			closeEditing={closeEditing}
			// 			saveExternalCalendarUrl={saveExternalCalendarUrl}
			// 			{...props} 
			// 		/>
			// ) : (
				// <div onClick={ handleSelectBlock } >
				// 	<EventsCarousel innerBlocks={innerBlocks} />
				// </div>
			// )}

	// const handleClickOutside = (event) => {
	// 	if ( !eventsContainerRef.current.contains( event.target) && isEditing === true ) {
	// 		setIsEditing( false );
	// 	}
	// };
		
	// useEffect(() => {
	// 	if ( eventsContainerRef.current ) {
	// 		document.body.addEventListener('click', handleClickOutside);
		
	// 		return () => {
	// 			document.body.removeEventListener('click', handleClickOutside);
	// 		}	
	// 	}
	// }, [ isEditing ]);

	const formatSwiperStructure = ( swiperWrapper ) => {
		// for each inner block we need to have it wrapped in a div
		// with the swiper-side class
		const allEventItems = document.querySelectorAll('[data-type="coblocks/event-item"]');
		for (let i = 0; i < allEventItems.length; i++) {
			const swiperSlideContainer = document.createElement('div');
			swiperSlideContainer.setAttribute('class', 'swiper-slide');
	
			swiperWrapper.appendChild( swiperSlideContainer );
	
			swiperSlideContainer.appendChild(allEventItems[i]);
		}
	}
		
	useEffect(() => {
		const innerBlockSelected = innerBlocks.some(({ clientId }) => clientId === selected?.clientId);

		if ( innerBlockSelected === true && isEditing === true ) {
			handleSelectBlock();
		}

		if ( 
			prevIsSelected !== isSelected && 
			isSelected === false && 
			! innerBlockSelected
		) {
			setIsEditing( false );
		}
	}, [ prevIsSelected, isSelected, selected, innerBlocks, isEditing ]);

	useEffect(() => {
		if ( innerBlocks.length !== prevInnerBlocksLength ) {
			alert('update the swiper');
			
		}
	}, [ innerBlocks.length, prevInnerBlocksLength, swiper ]);
 
	// create the required tiny swiper architecture on mount
	useEffect(() => {
		console.log('useEffect here----', {
			isEditing,
			swiper,
			carouselCssText
		});

		const innerBlocksContainer = document.querySelectorAll(`#coblocks-events-swiper-container-${carouselUuid} > .block-editor-inner-blocks > .block-editor-block-list__layout`)[0];

		// coming from edit mode to carousel
		if ( isEditing === false && swiper !== null && carouselCssText !== null ) {
			const swiperEditModeContainer = innerBlocksContainer.querySelectorAll('.swiper-wrapper-edit')[0];
			alert( `from edit to carousel --- ${innerBlocks.length}` );

			swiperEditModeContainer?.classList.remove('swiper-wrapper-edit');
			swiperEditModeContainer?.classList.add('swiper-wrapper');

			if ( swiperEditModeContainer?.style?.cssText ) {
				swiperEditModeContainer.style.cssText = carouselCssText;
			}

			setCarouselCssText(null);
		}

		// coming from carousel to edit mode
		// need to also format original DOM structure
		if ( isEditing === true && swiper !== null && carouselCssText === null ) {			
			const swiperWrapperAfter = innerBlocksContainer.querySelectorAll('.swiper-wrapper')[0];

			alert( `from carousel to edit --- ${innerBlocks.length}` )
			swiperWrapperAfter?.classList.remove('swiper-wrapper');
			swiperWrapperAfter?.classList.add('swiper-wrapper-edit');

			setCarouselCssText(swiperWrapperAfter?.style['cssText']);

			if ( swiperWrapperAfter?.style?.cssText ) {
					swiperWrapperAfter.style.cssText = '';
			}
		}

		// first mount and coming from editing to carousel
		if ( swiper === null ) {
			alert( `mount the original swiper --- ${innerBlocks.length}` );
			// swiper root container
			const swiperContainer = document.createElement('div');
			swiperContainer.setAttribute('class', 'swiper-container');
	
			innerBlocksContainer.appendChild( swiperContainer );
	
			// swiper slides wrapper
			const swiperWrapper = document.createElement('div');
			swiperWrapper.setAttribute('class', 'swiper-wrapper');
	
			swiperContainer.appendChild( swiperWrapper );
	
			formatSwiperStructure( swiperWrapper );
	
			const swiperBackButton = document.getElementById( `coblocks-event-swiper-prev` );
			const swiperNextButton = document.getElementById( `coblocks-event-swiper-next` );
	
			const newSwiper = new TinySwiper(swiperContainer, {
				touchable: false,
				plugins: [
					TinySwiperPluginNavigation,
				],
				navigation: {
					prevEl: swiperBackButton,
					nextEl: swiperNextButton,
				},
			});
	
			setSwiper( newSwiper );	
		}
	}, [ isEditing, swiper, carouselCssText ]);

	const renderInnerBlocks = () => {
		return (
			<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateInsertUpdatesSelection={ false }
					renderAppender={ () => isEditing && <CustomAppender onClick={ insertNewItem } /> }
			/>
		);
	}

	console.log('render main', {
		isEditing,
		selected,
		swiper,
		innerBlocks
	});

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

			<div ref={ eventsContainerRef } onClick={ handleSelectBlock } id={`coblocks-events-swiper-container-${carouselUuid}`} className="coblocks-events-swiper-container" >
				{renderInnerBlocks()}
				{!isEditing && (
					<>
						<button className={ `coblocks-events-nav-button__prev` } id={ `coblocks-event-swiper-prev` } />
						<button className={ `coblocks-events-nav-button__next` } id={ `coblocks-event-swiper-next` } />
					</>
				)}
			</div>
		</>
	);
};

const EditMode = ( props ) => {
	const { closeEditing, insertNewItem, className, attributes, showExternalCalendarControls, innerBlocks } = props;
	const {
		externalCalendarUrl
	} = attributes;

	console.log('edit mode innerBlocks', innerBlocks);

	const editContentContainerRef = useRef( null );

	const handleClickOutside = ( e ) => {
		const toolbarNode = document.querySelector('.components-popover__content');

		if ( 
			!editContentContainerRef.current.contains( e.target ) && 
			!toolbarNode?.contains( e.target) && 
			!e.target.classList.contains( 'block-editor-button-block-appender' ) 
		) {			
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
	const { className, externalCalendarUrl, showExternalCalendarControls, ...restProps } = props;

	let swiper;

	// useEffect(() => {
	// 	const innerBlocksContainer = document.querySelector('.coblocks-events-swiper-container > .block-editor-inner-blocks > .block-editor-block-list__layout');

	// 	console.log('innerBlocksContainer', innerBlocksContainer);
	// 	console.log('events  carousel inner blocks props', props);
	// }, []);

	// useEffect(() => {
	// 	const innerBlocksContainer = document.querySelector('.coblocks-events-swiper-container > .block-editor-inner-blocks > .block-editor-block-list__layout');

	// 	console.log('innerBlocksContainer, innerBlocksContainer', innerBlocksContainer);

	// 	if ( !innerBlocksContainer ) {
	// 		return;
	// 	}

	// 	const swiperContainer = document.createElement('div');
	// 	swiperContainer.setAttribute('class', 'swiper-container');

	// 	innerBlocksContainer.appendChild( swiperContainer );

	// 	const swiperWrapper = document.createElement('div');
	// 	swiperWrapper.setAttribute('class', 'swiper-wrapper');

	// 	swiperContainer.appendChild( swiperWrapper );

	// 	const eventItemBlocks = document.querySelectorAll('[data-type="coblocks/event-item"]');
		
	// 	console.log('eventItemBlocks', eventItemBlocks);
	// 	for ( let i = 0; i < eventItemBlocks.length; i++ ) {
	// 		const eventItem = eventItemBlocks[i];

	// 		const swiperSlideWrapper = document.createElement('div');
	// 		swiperSlideWrapper.setAttribute('class', 'swiper-slide');

	// 		console.log('eventItem', eventItem);
	// 		swiperSlideWrapper.appendChild( eventItem );

	// 		swiperWrapper.appendChild( swiperSlideWrapper );

	// 		swiperSlideWrapper.appendChild( eventItem );
	// 	}
			
	// 	// console.log('swiperContainer', swiperContainer);

	// 	// const swiperBackButton = document.getElementById( `coblocks-event-swiper-prev` );
	// 	// const swiperNextButton = document.getElementById( `coblocks-event-swiper-next` );

	// 	// swiper = new TinySwiper(swiperContainer, {
	// 	// 	touchable: false,
	// 	// 	plugins: [
	// 	// 		TinySwiperPluginNavigation,
	// 	// 	],
	// 	// 	navigation: {
	// 	// 		prevEl: swiperBackButton,
	// 	// 		nextEl: swiperNextButton,
	// 	// 	},
	// 	// });
	// }, []);

	useEffect(() => {
			console.log('rest props  events carousel', restProps);
			console.log('EventsCarousel EventsCarousel EventsCarousel mount -- need to RUN THIS AFTERWARDS');

			// const swiperBackButton = document.getElementById( `coblocks-event-swiper-prev` );
			// const swiperNextButton = document.getElementById( `coblocks-event-swiper-next` );

			// const swiperContainer = document.getElementById('swiper-container');

			// console.log('swiperContainer', swiperContainer);

			// swiper = new TinySwiper(swiperContainer, {
			// 	touchable: false,
			// 	plugins: [
			// 		TinySwiperPluginNavigation,
			// 	],
			// 	navigation: {
			// 		prevEl: swiperBackButton,
			// 		nextEl: swiperNextButton,
			// 	},
			// });		
	}, []);

	// return (
	// 	<div className={ classnames( className, 'coblocks-custom-event' ) }>
	// 		<div className="coblocks-events-swiper-container">
	// 			<InnerBlocks
	// 				allowedBlocks={ ALLOWED_BLOCKS }
	// 				template={ TEMPLATE }
	// 				templateInsertUpdatesSelection={ false }
	// 				templateLock="all"
	// 			/>
	// 		</div>
	// 	</div>
	// );

	return (
		<>
		 { ! externalCalendarUrl && ! showExternalCalendarControls &&
				<div className={ classnames( className, 'coblocks-custom-event' ) }>
						<div className="coblocks-events-swiper-container">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateInsertUpdatesSelection={ false }
								templateLock="all"
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
