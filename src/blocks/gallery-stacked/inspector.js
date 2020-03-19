/**
 * Internal dependencies
 */
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import SizeControl from '../../components/size-control';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { InspectorControls, FontSizePicker, withFontSizes } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );

		this.setLinkTo = this.setLinkTo.bind( this );
		this.setRadiusTo = this.setRadiusTo.bind( this );
		this.setFullwidthTo = this.setFullwidthTo.bind( this );
		this.setShadowTo = this.setShadowTo.bind( this );
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

	getFullwidthImagesHelp( checked ) {
		return checked ?
			__( 'Fullwidth images are enabled.', 'coblocks' ) :
			__( 'Toggle to fill the available gallery area with completely fullwidth images.', 'coblocks' );
	}

	getCaptionsHelp( checked ) {
		return checked ?
			__( 'Showing captions for each media item.', 'coblocks' ) :
			__( 'Toggle to show media captions.', 'coblocks' );
	}

	getLightboxHelp( checked ) {
		return checked ?
			__( 'Image lightbox is enabled.', 'coblocks' ) :
			__( 'Toggle to enable the image lightbox.', 'coblocks' );
	}

	render() {
		const {
			attributes,
			setAttributes,
			setFontSize,
			fontSize,
			wideControlsEnabled = false,
		} = this.props;

		const {
			images,
			gutter,
			fullwidth,
			radius,
			shadow,
			captions,
			lightbox,
		} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Stacked settings', 'coblocks' ) }>

					{ wideControlsEnabled &&
						<ToggleControl
							label={ images.length > 1 ? __( 'Fullwidth images', 'coblocks' ) : __( 'Fullwidth image', 'coblocks' ) }
							checked={ !! fullwidth }
							help={ this.getFullwidthImagesHelp }
							onChange={ this.setFullwidthTo }
						/>
					}

					{ images.length > 1 &&
						<ResponsiveTabsControl { ...this.props }
							label={ __( 'Gutter', 'coblocks' ) }
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

					<ToggleControl
						label={ __( 'Lightbox', 'coblocks' ) }
						checked={ !! lightbox }
						onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
						help={ this.getLightboxHelp }
					/>

					<ToggleControl
						label={ __( 'Captions', 'coblocks' ) }
						checked={ !! captions }
						onChange={ () => setAttributes( { captions: ! captions } ) }
						help={ this.getCaptionsHelp }
					/>

					{ captions &&
						<FontSizePicker
							value={ fontSize.size }
							onChange={ setFontSize }
						/>
					}

					{ ! fullwidth &&
						<SizeControl { ...this.props }
							onChange={ this.setShadowTo }
							value={ shadow }
							label={ __( 'Shadow', 'coblocks' ) }
							reset={ false }
						/>
					}

				</PanelBody>
				<GalleryLinkSettings { ...this.props } />
			</InspectorControls>
		);
	}
}

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withFontSizes( 'fontSize' ),
] )( Inspector );
