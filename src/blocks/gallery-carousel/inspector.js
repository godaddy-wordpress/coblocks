/**
 * Internal dependencies
 */
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import SizeControl from '../../components/size-control';
import SliderPanel from '../../components/slider-panel';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls, InspectorAdvancedControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.setSizeControl = this.setSizeControl.bind( this );
		this.setRadiusTo = this.setRadiusTo.bind( this );
		this.setHeightTo = this.setHeightTo.bind( this );
	}

	setRadiusTo( value ) {
		this.props.setAttributes( { radius: value } );
	}

	setSizeControl( value ) {
		this.props.setAttributes( { gridSize: value } );
	}

	setHeightTo( value ) {
		this.props.setAttributes( { height: value } );
	}

	getThumbnailNavigationHelp( checked ) {
		return checked ? __( 'Showing thumbnail navigation.' ) : __( 'Toggle to show thumbnails.' );
	}

	getResponsiveHeightHelp( checked ) {
		return checked ? __( 'Percentage based height is activated.' ) : __( 'Toggle for percentage based height.' );
	}

	render() {
		const {
			attributes,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			align,
			gridSize,
			gutter,
			height,
			radius,
			thumbnails,
			responsiveHeight,
		} = attributes;

		return (
			isSelected && (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Carousel Settings' ) } >
							<SizeControl { ...this.props }
								type={ 'grid' }
								label={ __( 'Size' ) }
								onChange={ this.setSizeControl }
								value={ gridSize }
								resetValue={ 'xlrg' }
							/>
							{ gridSize !== null && ( align === 'wide' || align === 'full' ) &&
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Gutter' ) }
									max={ 20 }
								/>
							}
							{ gridSize !== 'xlrg' && ! align &&
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Gutter' ) }
									max={ 20 }
								/>
							}
							{ gutter > 0 &&
								<RangeControl
									label={ __( 'Rounded Corners' ) }
									value={ radius }
									onChange={ this.setRadiusTo }
									min={ 0 }
									max={ 20 }
									step={ 1 }
								/>
							}
							{ ! responsiveHeight &&
								<RangeControl
									label={ __( 'Height in pixels' ) }
									value={ height }
									onChange={ this.setHeightTo }
									min={ 200 }
									max={ 1000 }
									step={ 1 }
								/>
							}
							<ToggleControl
								label={ __( 'Thumbnails' ) }
								checked={ !! thumbnails }
								onChange={ () => setAttributes( { thumbnails: ! thumbnails } ) }
								help={ this.getThumbnailNavigationHelp }
							/>
						</PanelBody>
						<SliderPanel { ...this.props } />
					</InspectorControls>
					<InspectorAdvancedControls>
						<ToggleControl
							label={ __( 'Responsive Height' ) }
							checked={ !! responsiveHeight }
							onChange={ () => setAttributes( { responsiveHeight: ! responsiveHeight } ) }
							help={ this.getResponsiveHeightHelp }
						/>
					</InspectorAdvancedControls>
				</Fragment>
			)
		);
	}
}

export default Inspector;
