/**
 * Internal dependencies
 */
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import SizeControl from '../../components/size-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls, FontSizePicker, withFontSizes } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor( ) {
		super( ...arguments );
		this.setLinkTo = this.setLinkTo.bind( this );
		this.setRadiusTo = this.setRadiusTo.bind( this );
		this.setShadowTo = this.setShadowTo.bind( this );
		this.setSizeControl = this.setSizeControl.bind( this );
		this.setCaptionStyleTo = this.setCaptionStyleTo.bind( this );
		this.setFullwidthTo = this.setFullwidthTo.bind( this );
	}

	setLinkTo( value ) {
		this.props.setAttributes( { linkTo: value } );
	}

	setRadiusTo( value ) {
		this.props.setAttributes( { radius: value } );
	}

	setShadowTo( value ) {
		this.props.setAttributes( { shadow: value } );
	}

	setFullwidthTo() {
		this.props.setAttributes( { fullwidth: ! this.props.attributes.fullwidth, shadow: 'none' } );
	}

	setSizeControl( value ) {
		this.props.setAttributes( { gridSize: value } );
	}

	setCaptionStyleTo( value ) {
		this.props.setAttributes( { captionStyle: value } );
	}

	getCaptionsHelp( checked ) {
		return checked ? __( 'Showing captions for each media item.' ) : __( 'Toggle to show media captions.' );
	}

	getLightboxHelp( checked ) {
		return checked ? __( 'Image lightbox is enabled.', 'coblocks' ) : __( 'Toggle to enable the image lightbox.', 'coblocks' );
	}

	render() {
		const {
			attributes,
			setAttributes,
			isSelected,
			setFontSize,
			fontSize,
		} = this.props;

		const {
			gridSize,
			gutter,
			images,
			lightbox,
			radius,
			shadow,
			captions,
		} = attributes;

		return (
			isSelected && (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Offset Settings' ) }>
							<SizeControl { ...this.props }
								label={ __( 'Size' ) }
								type={ 'reverse-grid' }
								onChange={ this.setSizeControl }
								value={ gridSize }
								resetValue={ 'med' }
							/>
							{ images.length > 1 &&
								<ResponsiveTabsControl { ...this.props } />
							}
							{ gutter > 0 && <RangeControl
								label={ __( 'Rounded Corners' ) }
								value={ radius }
								onChange={ this.setRadiusTo }
								min={ 0 }
								max={ 20 }
								step={ 1 }
							/> }
							<SizeControl { ...this.props }
								onChange={ this.setShadowTo }
								value={ shadow }
								label={ __( 'Box Shadow' ) }
								reset={ false }
							/>
							<ToggleControl
								label={ __( 'Captions', 'coblocks' ) }
								checked={ !! captions }
								onChange={ () => setAttributes( { captions: ! captions } ) }
								help={ this.getCaptionsHelp }
							/>
							{ captions && <FontSizePicker
								value={ fontSize.size }
								onChange={ setFontSize }
							/> }
							<ToggleControl
								label={ __( 'Lightbox', 'coblocks' ) }
								checked={ !! lightbox }
								onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
								help={ this.getLightboxHelp }
							/>
						</PanelBody>
						<GalleryLinkSettings { ...this.props } />
					</InspectorControls>
				</Fragment>
			)
		);
	}
}

export default compose( [
	withFontSizes( 'fontSize' ),
] )( Inspector );
