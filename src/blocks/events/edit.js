/**
 * Internal dependencies.
 */
import CustomAppender from './appender';
import InspectorControls from './inspector';

/**
 * External dependencies.
 */
import { v4 as generateUuid } from 'uuid';

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
import { useDispatch, useSelect } from '@wordpress/data';
import { useMemo, useRef, useState } from '@wordpress/element';

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

	const { innerBlocks, selectedBlock } = useSelect( ( select ) => ( {
		innerBlocks: select( 'core/block-editor' ).getBlocks( clientId ),
		selectedBlock: select( 'core/block-editor' ).getSelectedBlock(),
	} ) );

	const externalCalendarUrl = attributes.externalCalendarUrl;
	const [ showExternalCalendarControls, setShowExternalCalendarControls ] = useState( !! externalCalendarUrl || false );
	const [ stateExternalCalendarUrl, setStateExternalCalendarUrl ] = useState( externalCalendarUrl );

	const innerBlocksRef = useRef( null );
	const toolbarRef = useRef( null );

	const carouselUuid = useMemo( () => generateUuid(), [] );

	const handleSelectBlock = () => {
		const innerBlockSelected = innerBlocks.some( ( innerBlock ) => innerBlock.clientId === selectedBlock.clientId );
		if ( ! isSelected && ! isEditing && ! innerBlockSelected ) {
			selectBlock( clientId );
		}
	};

	const toggleExternalCalendarControls = () => {
		if ( ! showExternalCalendarControls === false ) {
			setAttributes( { externalCalendarUrl: '' } );
		}

		setShowExternalCalendarControls( ! showExternalCalendarControls );
	};

	const toggleShowCarousel = () => {
		setAttributes( { showCarousel: ! attributes.showCarousel } );
	};

	const saveExternalCalendarUrl = () => {
		setAttributes( { externalCalendarUrl: stateExternalCalendarUrl } );
		setIsEditing( false );
	};

	const insertNewItem = () => {
		const newEvent = createBlock( 'coblocks/event-item' );
		insertBlock( newEvent, innerBlocks.length, clientId, true );
	};

	const toolbarControls = showExternalCalendarControls ? [ {
		icon: edit,
		onClick: () => {
			if ( !! externalCalendarUrl ) {
				setAttributes( { externalCalendarUrl: null } );
			}
		},
		title: __( 'Edit calendar URL', 'coblocks' ),
	} ] : [];

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
					<Button
						onClick={ () => setShowExternalCalendarControls( false ) }
						type="submit"
					>
						{ __( 'Cancel', 'coblocks' ) }
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
				toggleShowCarousel={ toggleShowCarousel }
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
