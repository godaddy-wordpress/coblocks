/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import autoPlayOptions from './autoplay-options';
import './styles/editor.scss';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;

class SlickSliderPanel extends Component {
	constructor( props ) {
		super( ...arguments );
		this.getAutoPlayHelp = this.getAutoPlayHelp.bind( this );
	}

	getAutoPlayHelp( checked ) {
		// Retrieve the height value and divide it to display full seconds.
		const speed = this.props.attributes.autoPlaySpeed / 1000;
		const time = ( speed > 1 ) ? __( 'seconds' ) : __( 'second' );

		// translators: 1. Speed of the slider, 2: Time until the slide advances
		return checked ? sprintf( __( 'Advancing after %1$d %2$s.' ), speed, time ) : __( 'Automatically advance to the next slide.' );
	}

	getDraggableHelp( checked ) {
		return checked ? __( 'Dragging and flicking enabled on desktop and mobile devices.' ) : __( 'Toggle to enable drag functionality on desktop and mobile devices.' );
	}

	getArrowNavigationHelp( checked ) {
		return checked ? __( 'Showing slide navigation arrows.' ) : __( 'Toggle to show slide navigation arrows.' );
	}

	getVisibleItemsHelp( ) {
		return __( 'The number of visible items in the slider viewport.' );
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
			visibleItems,
			prevNextButtons,
		} = attributes;

		return (
			<Fragment>
				<PanelBody title={ __( 'Slider Settings' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Autoplay' ) }
						checked={ !! autoPlay }
						onChange={ () => setAttributes( { autoPlay: ! autoPlay } ) }
						help={ this.getAutoPlayHelp }
					/>
					{ autoPlay && <SelectControl
						label={ __( 'Transition Speed' ) }
						value={ autoPlaySpeed }
						onChange={ ( value ) => setAttributes( { autoPlaySpeed: value } ) }
						options={ autoPlayOptions }
						className="components-coblocks-gallery-inspector__autoplayspeed-select"
					/> }
					<ToggleControl
						label={ __( 'Draggable' ) }
						checked={ !! draggable }
						onChange={ () => setAttributes( { draggable: ! draggable } ) }
						help={ this.getDraggableHelp }
					/>
					<ToggleControl
						label={ __( 'Arrow Navigation' ) }
						checked={ !! prevNextButtons }
						onChange={ () => setAttributes( { prevNextButtons: ! prevNextButtons } ) }
						help={ this.getArrowNavigationHelp }
					/>
					<RangeControl
						label={ __( 'Visible Items' ) }
						value={ visibleItems }
						onChange={ ( value ) => setAttributes( { visibleItems: value } ) }
						min={ 2 }
						max={ 5 }
						help={ this.getVisibleItemsHelp }
						required
					/>
				</PanelBody>
			</Fragment>
		);
	}
}

export default SlickSliderPanel;
