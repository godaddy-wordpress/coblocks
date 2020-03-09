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
import { PanelBody, RangeControl, ToggleControl, BaseControl } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.setSizeControl = this.setSizeControl.bind( this );
		this.setRadiusTo = this.setRadiusTo.bind( this );
		this.setHeightTo = this.setHeightTo.bind( this );
		this.state = {
			temporaryInput: null,
		};
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

	setTemporayInput( value ) {
		this.setState( { temporaryInput: value } );
	}

	getThumbnailNavigationHelp( checked ) {
		return checked ? __( 'Showing thumbnail navigation.', 'coblocks' ) : __( 'Toggle to show thumbnails.', 'coblocks' );
	}

	getResponsiveHeightHelp( checked ) {
		return checked ? __( 'Percentage based height is activated.', 'coblocks' ) : __( 'Toggle for percentage based height.', 'coblocks' );
	}

	getLightboxHelp( checked ) {
		return checked ? __( 'Image lightbox is enabled.', 'coblocks' ) : __( 'Toggle to enable the image lightbox.', 'coblocks' );
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
			lightbox,
		} = attributes;

		const { temporaryInput } = this.state;

		return (
			isSelected && (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Carousel settings', 'coblocks' ) } >
							<SizeControl { ...this.props }
								type={ 'grid' }
								label={ __( 'Size', 'coblocks' ) }
								onChange={ this.setSizeControl }
								value={ gridSize }
								resetValue={ 'xlrg' }
							/>
							{ gridSize !== null && ( align === 'wide' || align === 'full' ) &&
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Gutter', 'coblocks' ) }
									max={ 20 }
								/>
							}
							{ gridSize !== 'xlrg' && ! align &&
								<ResponsiveTabsControl { ...this.props }
									label={ __( 'Gutter', 'coblocks' ) }
									max={ 20 }
								/>
							}
							{ gutter > 0 &&
								<RangeControl
									label={ __( 'Rounded corners', 'coblocks' ) }
									value={ radius }
									onChange={ this.setRadiusTo }
									min={ 0 }
									max={ 20 }
									step={ 1 }
								/>
							}
							{ ! responsiveHeight &&
							<BaseControl
								label={ __( 'Height in pixels', 'coblocks' ) }
								className={ 'block-height-control' }
							>
								<input
									type="number"
									className={ 'block-height-control__input' }
									onChange={ ( event ) => {
										const unprocessedValue = event.target.value;
										const inputValue = unprocessedValue !== '' ?
											parseInt( event.target.value, 10 ) :
											undefined;
										if ( ( inputValue < 0 ) && inputValue !== undefined ) {
											this.setTemporayInput( inputValue );
											this.setHeightTo( 0 );
											return;
										}
										this.setTemporayInput( null );
										this.setHeightTo( inputValue );
									} }
									value={ temporaryInput || height }
									min={ 0 }
									step="10"
								/>
							</BaseControl>
							}
							<ToggleControl
								label={ __( 'Thumbnails', 'coblocks' ) }
								checked={ !! thumbnails }
								onChange={ () => setAttributes( { thumbnails: ! thumbnails } ) }
								help={ this.getThumbnailNavigationHelp }
							/>
							<ToggleControl
								label={ __( 'Lightbox', 'coblocks' ) }
								checked={ !! lightbox }
								onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
								help={ this.getLightboxHelp }
							/>
						</PanelBody>
						<SliderPanel { ...this.props } />
					</InspectorControls>
					<InspectorAdvancedControls>
						<ToggleControl
							label={ __( 'Responsive height', 'coblocks' ) }
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
