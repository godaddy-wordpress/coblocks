
/**
 * Internal dependencies
 */
import autoPlayOptions from './autoplay-options';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';

const SliderPanel = ( props ) => {
	const getLoopHelp = ( checked ) => {
		return checked ? __( 'Set limit to carousel', 'coblocks' ) : __( 'Set the carousel to an infinite loop', 'coblocks' );
	};

	const getAutoPlayHelp = ( checked ) => {
		// Retrieve the height value and divide it to display full seconds.
		const speed = props.attributes.autoPlaySpeed / 1000;
		const time = ( speed > 1 ) ? __( 'seconds', 'coblocks' ) : __( 'second', 'coblocks' );

		return checked ? sprintf(
			/* translators: %1$d: Speed of the slider, %2$d: Time until the slide advances */
			__( 'Advancing after %1$d %2$s.', 'coblocks' ),
			speed,
			time
		) : __( 'Automatically advance to the next slide.', 'coblocks' );
	};

	const getDraggableHelp = ( checked ) => {
		return checked ? __( 'Dragging and flicking enabled.', 'coblocks' ) : __( 'Toggle to enable drag functionality.', 'coblocks' );
	};

	const getArrowNavigationHelp = ( checked ) => {
		return checked ? __( 'Showing slide navigation arrows.', 'coblocks' ) : __( 'Toggle to show slide navigation arrows.', 'coblocks' );
	};

	const getDotNavigationHelp = ( checked ) => {
		return checked ? __( 'Showing dot navigation.', 'coblocks' ) : __( 'Toggle to show dot navigation.', 'coblocks' );
	};

	const getAlignCellsHelp = ( checked ) => {
		return checked ? __( 'Aligning slides to the left.', 'coblocks' ) : __( 'Aligning slides to the center.', 'coblocks' );
	};
	const getPauseAutoplayOnHoverHelp = ( checked ) => {
		return checked ? __( 'Pausing autoplay when hovering.', 'coblocks' ) : __( 'Toggle to pause autoplay when hovered.', 'coblocks' );
	};

	const getfreeScrollHelp = ( checked ) => {
		return checked ? __( 'Scrolling without fixed slides enabled.', 'coblocks' ) : __( 'Toggle to scroll without fixed slides.', 'coblocks' );
	};

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		autoPlay,
		autoPlaySpeed,
		draggable,
		freeScroll,
		loop,
		pageDots,
		prevNextButtons,
		alignCells,
		pauseHover,
		thumbnails,
	} = attributes;

	return (
		<>
			<PanelBody title={ __( 'Slider settings', 'coblocks' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'Loop', 'coblocks' ) }
					checked={ !! loop }
					onChange={ () => setAttributes( { loop: ! loop } ) }
					help={ getLoopHelp }
				/>
				<ToggleControl
					label={ __( 'Autoplay', 'coblocks' ) }
					checked={ !! autoPlay }
					onChange={ () => setAttributes( { autoPlay: ! autoPlay } ) }
					help={ getAutoPlayHelp }
				/>
				{ autoPlay && <>
					<SelectControl
						label={ __( 'Transition speed', 'coblocks' ) }
						value={ autoPlaySpeed }
						onChange={ ( value ) => setAttributes( { autoPlaySpeed: value } ) }
						options={ autoPlayOptions }
						className="components-coblocks-gallery-inspector__autoplayspeed-select"
					/>
					<ToggleControl
						label={ __( 'Pause on hover', 'coblocks' ) }
						checked={ pauseHover }
						onChange={ () => setAttributes( { pauseHover: ! pauseHover } ) }
						help={ getPauseAutoplayOnHoverHelp }
					/>
				</>
				}
				<ToggleControl
					label={ __( 'Draggable', 'coblocks' ) }
					checked={ !! draggable }
					onChange={ () => setAttributes( { draggable: ! draggable } ) }
					help={ getDraggableHelp }
				/>
				{ draggable && <ToggleControl
					label={ __( 'Free scroll', 'coblocks' ) }
					checked={ !! freeScroll }
					onChange={ () => setAttributes( { freeScroll: ! freeScroll } ) }
					help={ getfreeScrollHelp }
				/> }
				<ToggleControl
					label={ __( 'Arrow navigation', 'coblocks' ) }
					checked={ !! prevNextButtons }
					onChange={ () => setAttributes( { prevNextButtons: ! prevNextButtons } ) }
					help={ getArrowNavigationHelp }
				/>
				{ !! thumbnails ? null	: (
					<ToggleControl
						label={ __( 'Dot navigation', 'coblocks' ) }
						checked={ !! pageDots }
						onChange={ () => setAttributes( { pageDots: ! pageDots } ) }
						help={ getDotNavigationHelp } />
				) }
				<ToggleControl
					label={ __( 'Align cells', 'coblocks' ) }
					checked={ !! alignCells }
					onChange={ () => setAttributes( { alignCells: ! alignCells } ) }
					help={ getAlignCellsHelp }
				/>
			</PanelBody>
		</>
	);
};

export default SliderPanel;
