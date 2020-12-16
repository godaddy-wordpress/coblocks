
/**
 * Internal dependencies
 */
import autoPlayOptions from './autoplay-options';

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

	getArrowNavigationHelp( checked ) {
		return checked ? __( 'Showing slide navigation arrows.', 'coblocks' ) : __( 'Toggle to show slide navigation arrows.', 'coblocks' );
	}

	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			autoPlay,
			autoPlaySpeed,
			prevNextButtons,
		} = attributes;

		return (
			<Fragment>
				<PanelBody title={ __( 'Slider settings', 'coblocks' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Autoplay', 'coblocks' ) }
						checked={ !! autoPlay }
						onChange={ () => setAttributes( { autoPlay: ! autoPlay } ) }
						help={ this.getAutoPlayHelp }
					/>
					{ autoPlay &&
						<SelectControl
							label={ __( 'Transition speed', 'coblocks' ) }
							value={ autoPlaySpeed }
							onChange={ ( value ) => setAttributes( { autoPlaySpeed: value } ) }
							options={ autoPlayOptions }
							className="components-coblocks-gallery-inspector__autoplayspeed-select"
						/>
					}
					<ToggleControl
						label={ __( 'Arrow navigation', 'coblocks' ) }
						checked={ !! prevNextButtons }
						onChange={ () => setAttributes( { prevNextButtons: ! prevNextButtons } ) }
						help={ this.getArrowNavigationHelp }
					/>
				</PanelBody>
			</Fragment>
		);
	}
}

export default SliderPanel;
