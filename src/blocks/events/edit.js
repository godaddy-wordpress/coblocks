/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
import InspectorControls from './inspector';

/**
 * External dependencies.
 */
import { v4 as generateUuid } from 'uuid';
import TinySwiper from 'tiny-swiper';
import TinySwiperPluginNavigation from 'tiny-swiper/lib/modules/navigation.min.js';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { createBlock } from '@wordpress/blocks';
import { edit } from '@wordpress/icons';
import ServerSideRender from '@wordpress/server-side-render';
import { BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { Button, Placeholder, TextControl, ToolbarGroup } from '@wordpress/components';
import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

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
		className,
	} = props;

	const { selectBlock, insertBlock } = useDispatch( 'core/block-editor' );
	const [ isEditing, setIsEditing ] = useState( false );

	const { innerBlocks } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
	} ) );

	const externalCalendarUrl = attributes.externalCalendarUrl;
	const [ showExternalCalendarControls, setShowExternalCalendarControls ] = useState( !! externalCalendarUrl || false );
	const [ stateExternalCalendarUrl, setStateExternalCalendarUrl ] = useState( externalCalendarUrl );

	const innerBlocksRef = useRef( null );
	const toolbarRef = useRef( null );

	const carouselUuid = useMemo( () => generateUuid(), [] );

	const handleSelectBlock = () => {
		if ( ! isSelected && ! isEditing ) {
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
		insertBlock( newEvent, innerBlocks.length, clientId, true );
	};

	const toolbarControls = [ {
		icon: edit,
		onClick: () => {
			if ( !! externalCalendarUrl ) {
				setStateExternalCalendarUrl( null );
			}
		},
		title: __( 'Edit calendar URL', 'coblocks' ),
	} ];

	useEffect( () => {
		if ( !! externalCalendarUrl ) {
			// Before we query the DOM to invoke the swiper we need to await that the server side rendering has been completed
			setTimeout( () => {
				const serverSideRenderCarouselContainer = document.querySelector( `#coblocks-events-swiper-container-${ carouselUuid }` );

				const swiperContainer = serverSideRenderCarouselContainer.querySelector( '.swiper-container' );

				const swiperBackButton = serverSideRenderCarouselContainer.querySelector( `#wp-coblocks-event-swiper-prev` );
				const swiperNextButton = serverSideRenderCarouselContainer.querySelector( `#wp-coblocks-event-swiper-next` );

				if ( swiperContainer && swiperBackButton && swiperNextButton ) {
					new TinySwiper( swiperContainer, {
						navigation: {
							nextEl: swiperNextButton,
							prevEl: swiperBackButton,
						},
						plugins: [
							TinySwiperPluginNavigation,
						],
						touchable: false,
					} );
				}
			}, 1000 );
		}
	}, [ externalCalendarUrl ] );

	const renderInnerBlocks = () => {
		return (
			<div className="coblocks-events-block-inner-blocks-container">
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					renderAppender={ () => <CustomAppender onClick={ insertNewItem } /> }
					template={ TEMPLATE }
					templateInsertUpdatesSelection={ false }
				/>
			</div>
		);
	};

	if ( showExternalCalendarControls && ! externalCalendarUrl ) {
		return (
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

			<div
				className={ classNames(
					'coblocks-events-swiper-container',
					className
				) }
				id={ `coblocks-events-swiper-container-${ carouselUuid }` }
				onClick={ handleSelectBlock }
				onKeyDown={ handleSelectBlock }
				ref={ innerBlocksRef }
				role="button"
				tabIndex="0"
			>
				{ showExternalCalendarControls && !! externalCalendarUrl ? (
					<span className="coblocks-events-swiper-container-external-calendar">
						<ServerSideRender
							attributes={ attributes }
							block="coblocks/events"
						/>
					</span>
				) : (
					renderInnerBlocks()
				) }
			</div>
		</>
	);
};

export default EventsEdit;
