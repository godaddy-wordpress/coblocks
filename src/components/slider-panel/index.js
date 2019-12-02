
/**
 * Internal dependencies
 */
import autoPlayOptions from './autoplay-options';
import './styles/editor.scss';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';

class SliderPanel extends Component {
	constructor() {
		super( ...arguments );
		this.getAutoPlayHelp = this.getAutoPlayHelp.bind( this );
	}

	getAutoPlayHelp( checked ) {
		// Retrieve the height value and divide it to display full seconds.
		const speed = this.props.attributes.autoPlaySpeed / 1000;
		const time = ( speed > 1 ) ? __( 'seconds', 'coblocks' ) : __( 'second', 'coblocks' );

		return checked ? sprintf(
			/* translators: %1$d: Speed of the slider, %2$d: Time until the slide advances */
			__( 'Advancing after %1$d %2$s.', 'coblocks' ),
			speed,
			time
		) : __( 'Automatically advance to the next slide.', 'coblocks' );
	}

	getDraggableHelp( checked ) {
		return checked ? __( 'Dragging and flicking enabled.', 'coblocks' ) : __( 'Toggle to enable drag functionality.', 'coblocks' );
	}

	getArrowNavigationHelp( checked ) {
		return checked ? __( 'Showing slide navigation arrows.', 'coblocks' ) : __( 'Toggle to show slide navigation arrows.', 'coblocks' );
	}

	getDotNavigationHelp( checked ) {
		return checked ? __( 'Showing dot navigation.', 'coblocks' ) : __( 'Toggle to show dot navigation.', 'coblocks' );
	}

	getAlignCellsHelp( checked ) {
		return checked ? __( 'Aligning slides to the left.', 'coblocks' ) : __( 'Aligning slides to the center.', 'coblocks' );
	}
	getPauseAutoplayOnHoverHelp( checked ) {
		return checked ? __( 'Pausing autoplay when hovering.', 'coblocks' ) : __( 'Toggle to pause autoplay when hovered.', 'coblocks' );
	}

	getfreeScrollHelp( checked ) {
		return checked ? __( 'Scrolling without fixed slides enabled.', 'coblocks' ) : __( 'Toggle to scroll without fixed slides.', 'coblocks' );
	}

	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			autoPlay,
			autoPlaySpeed,
			draggable,
			freeScroll,
			pageDots,
			prevNextButtons,
			alignCells,
			pauseHover,
		} = attributes;

		return (
			<Fragment>
				<PanelBody title={ __( 'Slider Settings', 'coblocks' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Autoplay', 'coblocks' ) }
						checked={ !! autoPlay }
						onChange={ () => setAttributes( { autoPlay: ! autoPlay } ) }
						help={ this.getAutoPlayHelp }
					/>
					{ autoPlay && <Fragment>
						<SelectControl
							label={ __( 'Transition Speed', 'coblocks' ) }
							value={ autoPlaySpeed }
							onChange={ ( value ) => setAttributes( { autoPlaySpeed: value } ) }
							options={ autoPlayOptions }
							className="components-coblocks-gallery-inspector__autoplayspeed-select"
						/>
						<ToggleControl
							label={ __( 'Pause on Hover', 'coblocks' ) }
							checked={ pauseHover }
							onChange={ () => setAttributes( { pauseHover: ! pauseHover } ) }
							help={ this.getPauseAutoplayOnHoverHelp }
						/>
					</Fragment>
					}
					<ToggleControl
						label={ __( 'Draggable', 'coblocks' ) }
						checked={ !! draggable }
						onChange={ () => setAttributes( { draggable: ! draggable } ) }
						help={ this.getDraggableHelp }
					/>
					{ draggable && <ToggleControl
						label={ __( 'Free Scroll', 'coblocks' ) }
						checked={ !! freeScroll }
						onChange={ () => setAttributes( { freeScroll: ! freeScroll } ) }
						help={ this.getfreeScrollHelp }
					/> }
					<ToggleControl
						label={ __( 'Arrow Navigation', 'coblocks' ) }
						checked={ !! prevNextButtons }
						onChange={ () => setAttributes( { prevNextButtons: ! prevNextButtons } ) }
						help={ this.getArrowNavigationHelp }
					/>
					<ToggleControl
						label={ __( 'Dot Navigation', 'coblocks' ) }
						checked={ !! pageDots }
						onChange={ () => setAttributes( { pageDots: ! pageDots } ) }
						help={ this.getDotNavigationHelp }
					/>
					<ToggleControl
						label={ __( 'Align Cells', 'coblocks' ) }
						checked={ !! alignCells }
						onChange={ () => setAttributes( { alignCells: ! alignCells } ) }
						help={ this.getAlignCellsHelp }
					/>
				</PanelBody>
			</Fragment>
		);
	}
}

export default SliderPanel;
