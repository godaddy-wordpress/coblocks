/*global jQuery*/

/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
import InspectorControls from './inspector';
import { withEventsState, EventsContext } from './context';

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
import { useEffect, useRef, useState, useMemo, useContext, useCallback } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';

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
	const { isEditing, setIsEditing } = useContext( EventsContext );

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

	const prevIsSelected = usePrevious( isSelected );
	const prevInnerBlocksLength = usePrevious( innerBlocks.length );

	const externalCalendarUrl = attributes.externalCalendarUrl;
	const [ showExternalCalendarControls, setShowExternalCalendarControls ] = useState( !! externalCalendarUrl || false );
	const [ stateExternalCalendarUrl, setStateExternalCalendarUrl ] = useState( externalCalendarUrl );

	const [carouselCssText, setCarouselCssText] = useState( null );
	const [swiper, setSwiper] = useState( null );
	const innerBlocksRef = useRef( null );
	const toolbarRef = useRef( null );

	const carouselUuid = useMemo( () => generateUuid(), [] );

	const handleSelectBlock = () => {
		if ( !isSelected && !isEditing ) {
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

	const carouselButtonStyle = () => {
		const carouselButtonStyles = {};
		if ( isEditing ) {
			carouselButtonStyles.visibility = 'hidden';
		}

		return carouselButtonStyles;
	}


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

	const handleInnerBlockOutsideClick = useCallback((event) => {
		const isOutsideClick = ! innerBlocksRef?.current?.contains( event.target );
		const toolbarContainer = document.querySelectorAll('.block-editor-block-contextual-toolbar')[0];

		const isToolbarClick = toolbarContainer?.contains( event.target );

		if ( isEditing && isOutsideClick && !isToolbarClick ) {
			setIsEditing( false );
		}
	}, [ isEditing ]);

	// register the inner blocks outside click handler 
	useEffect(() => {
		document.body.addEventListener('click', handleInnerBlockOutsideClick);

		return () => {
			document.body.removeEventListener('click', handleInnerBlockOutsideClick);
		}
	}, [ isEditing ]);
		
	useEffect(() => {
		const innerBlockSelected = innerBlocks.some(({ clientId }) => clientId === selected?.clientId);

		if ( 
			innerBlockSelected === true && 
			isEditing === true 
		) {
			handleSelectBlock();
		}
	}, [ prevIsSelected, isSelected, selected, innerBlocks, isEditing ]);
 
	useEffect(() => {
		const innerBlocksContainer = document.querySelectorAll(`#coblocks-events-swiper-container-${carouselUuid} > .coblocks-events-block-inner-blocks-container > .block-editor-inner-blocks > .block-editor-block-list__layout`)[0];

		// coming from edit mode to carousel
		if ( isEditing === false && swiper !== null && carouselCssText !== null ) {
			const swiperEditModeWrapper = innerBlocksContainer.querySelectorAll('.swiper-wrapper-edit')[0];
			const swiperEditModeContainer = innerBlocksContainer.querySelectorAll('.swiper-container-edit')[0];

			swiperEditModeWrapper?.classList.remove('swiper-wrapper-edit');
			swiperEditModeWrapper?.classList.add('swiper-wrapper');

			swiperEditModeContainer?.classList.remove('swiper-container-edit');
			swiperEditModeContainer?.classList.add('swiper-container');

			if ( swiperEditModeWrapper?.style?.cssText ) {
				swiperEditModeWrapper.style.cssText = carouselCssText;
			}

			setCarouselCssText(null);

			// if any additional event items have been added, they will
			// be appended to the inner blocks root div, however will not
			// be appended to the swiper container div. we need to move any
			// new event items to within the swiper container div
			for (let j = 0; j < innerBlocksContainer.children.length; j++) {
					const childElement = innerBlocksContainer.children[j];

					// move the new event item to within the swiper wrapper div
					if ( childElement.dataset?.type === 'coblocks/event-item' ) {
						const currentSwiperWrapper = document.querySelectorAll('.swiper-wrapper')[0];

						const newSwiperSlideWrapper = document.createElement('div');
						newSwiperSlideWrapper.setAttribute('class', 'swiper-slide');

						newSwiperSlideWrapper.appendChild( childElement );

						currentSwiperWrapper.appendChild( newSwiperSlideWrapper );
					}
			}

			swiper.update();

			const swiperBackButton = document.getElementById( `coblocks-event-swiper-prev` );
			const swiperNextButton = document.getElementById( `coblocks-event-swiper-next` );
	
			const newSwiper = new TinySwiper(swiperEditModeContainer, {
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

		// coming from carousel to edit mode
		// need to also format original DOM structure
		if ( isEditing === true && swiper !== null && carouselCssText === null ) {			
			const swiperWrapperAfter = innerBlocksContainer.querySelectorAll('.swiper-wrapper')[0];
			const swiperContainerAfter = innerBlocksContainer.querySelectorAll('.swiper-container')[0];

			swiperContainerAfter?.classList.remove('swiper-container');
			swiperContainerAfter?.classList.add('swiper-container-edit');

			swiperWrapperAfter?.classList.remove('swiper-wrapper');
			swiperWrapperAfter?.classList.add('swiper-wrapper-edit');

			setCarouselCssText(swiperWrapperAfter?.style['cssText']);

			if ( swiperWrapperAfter?.style?.cssText ) {
					swiperWrapperAfter.style.cssText = '';
			}

			swiper.destroy();
		}

		// first mount and coming from editing to carousel
		if ( swiper === null ) {
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
	}, [ isEditing, swiper, carouselCssText, innerBlocks, prevInnerBlocksLength ]);

	const renderInnerBlocks = () => {
		return (
				<div className="coblocks-events-block-inner-blocks-container">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateInsertUpdatesSelection={ false }
						renderAppender={ () => isEditing && <CustomAppender onClick={ insertNewItem } /> }
						isEditing={ isEditing }
					/>
				</div>
		);
	}

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
				<span ref={ toolbarRef }>
					<BlockControls>
						<ToolbarGroup controls={ toolbarControls } />
					</BlockControls>
				</span>
			}

			<div ref={ innerBlocksRef } onClick={ handleSelectBlock } id={`coblocks-events-swiper-container-${carouselUuid}`} className="coblocks-events-swiper-container" >
				{renderInnerBlocks()}
				<button style={ { ...carouselButtonStyle() } } className={ `coblocks-events-nav-button__prev` } id={ `coblocks-event-swiper-prev` } />
				<button style={ { ...carouselButtonStyle() } } className={ `coblocks-events-nav-button__next` } id={ `coblocks-event-swiper-next` } />
			</div>
		</>
	);
};

export default compose( [
	withEventsState
] )( EventsEdit );
