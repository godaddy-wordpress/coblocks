
/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import autoPlayOptions from './autoplay-options';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

const SliderPanel = ( props ) => {
	const getLoopHelp = ( checked ) => {
		return checked ? __( 'Prevent the carousel from looping', 'coblocks' ) : __( 'Set the carousel to an infinite loop', 'coblocks' );
	};

	const getAutoPlayHelp = ( checked ) => {
		const { attributes } = props;
		const { autoPlaySpeed } = attributes;
		// Retrieve the height value and divide it to display full seconds.
		const speed = autoPlaySpeed / 1000;
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
		transitionSpeed,
		thumbnails,
	} = attributes;

	return (
		<PanelBody initialOpen={ false } title={ __( 'Slider settings', 'coblocks' ) }>
			<ToggleControl
				checked={ !! loop }
				help={ getLoopHelp }
				label={ __( 'Loop', 'coblocks' ) }
				onChange={ () => setAttributes( { loop: ! loop } ) }
			/>
			<ToggleControl
				checked={ !! autoPlay }
				help={ getAutoPlayHelp }
				label={ __( 'Autoplay', 'coblocks' ) }
				onChange={ () => setAttributes( { autoPlay: ! autoPlay } ) }
			/>
			{ autoPlay && <>
				<SelectControl
					className="components-coblocks-gallery-inspector__autoplayspeed-select"
					label={ __( 'Transition speed', 'coblocks' ) }
					onChange={ ( value ) => setAttributes( { autoPlaySpeed: value } ) }
					options={ autoPlayOptions }
					value={ autoPlaySpeed }
				/>
				<ToggleControl
					checked={ pauseHover }
					help={ getPauseAutoplayOnHoverHelp }
					label={ __( 'Pause on hover', 'coblocks' ) }
					onChange={ () => setAttributes( { pauseHover: ! pauseHover } ) }
				/>
			</>
			}
			<ToggleControl
				checked={ !! draggable }
				help={ getDraggableHelp }
				label={ __( 'Draggable', 'coblocks' ) }
				onChange={ () => setAttributes( { draggable: ! draggable } ) }
			/>
			{ draggable && <ToggleControl
				checked={ !! freeScroll }
				help={ getfreeScrollHelp }
				label={ __( 'Free scroll', 'coblocks' ) }
				onChange={ () => setAttributes( { freeScroll: ! freeScroll } ) }
			/> }
			<ToggleControl
				checked={ !! prevNextButtons }
				help={ getArrowNavigationHelp }
				label={ __( 'Arrow navigation', 'coblocks' ) }
				onChange={ () => setAttributes( { prevNextButtons: ! prevNextButtons } ) }
			/>
			{ !! thumbnails ? null	: (
				<ToggleControl
					checked={ !! pageDots }
					help={ getDotNavigationHelp }
					label={ __( 'Dot navigation', 'coblocks' ) }
					onChange={ () => setAttributes( { pageDots: ! pageDots } ) } />
			) }
			<ToggleControl
				checked={ !! alignCells }
				help={ getAlignCellsHelp }
				label={ __( 'Align cells', 'coblocks' ) }
				onChange={ () => setAttributes( { alignCells: ! alignCells } ) }
			/>
			<RangeControl
				initialValue={ transitionSpeed }
				label={ __( 'Transition Speed', 'coblocks' ) }
				max={ 1 }
				min={ 0 }
				onChange={ ( newSpeed ) => setAttributes( { transitionSpeed: newSpeed } ) }
				step={ 0.1 }
				value={ transitionSpeed }
			/>
		</PanelBody>
	);
};

export default SliderPanel;

SliderPanel.propTypes = {
	attributes: PropTypes.object,
	setAttributes: PropTypes.func,
};
