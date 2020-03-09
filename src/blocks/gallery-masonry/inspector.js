/**
 * Internal dependencies
 */
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import captionOptions from '../../components/block-gallery/options/caption-options';
import SizeControl from '../../components/size-control';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.setSizeControl = this.setSizeControl.bind( this );
		this.setRadiusTo = this.setRadiusTo.bind( this );
		this.setCaptionStyleTo = this.setCaptionStyleTo.bind( this );
	}

	componentDidUpdate() {
		if ( this.props.attributes.gutter <= 0 ) {
			this.props.setAttributes( {
				radius: 0,
			} );
		}
	}

	setRadiusTo( value ) {
		this.props.setAttributes( { radius: value } );
	}

	setSizeControl( value ) {
		this.props.setAttributes( { gridSize: value } );
	}

	setCaptionStyleTo( value ) {
		this.props.setAttributes( { captionStyle: value } );
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
		} = this.props;

		const {
			captions,
			captionStyle,
			gridSize,
			gutter,
			radius,
			lightbox,
		} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Masonry settings', 'coblocks' ) }>

					<SizeControl { ...this.props }
						type={ 'grid' }
						label={ __( 'Size', 'coblocks' ) }
						onChange={ this.setSizeControl }
						value={ gridSize }
						resetValue={ 'xlrg' }
					/>

					<ResponsiveTabsControl { ...this.props } />

					{ gutter > 0 &&
						<RangeControl
							label={ __( 'Rounded corners', 'coblocks' ) }
							aria-label={ __( 'Add rounded corners to the gallery items.', 'coblocks' ) }
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
						<SelectControl
							label={ __( 'Caption style', 'coblocks' ) }
							value={ captionStyle }
							onChange={ this.setCaptionStyleTo }
							options={ captionOptions }
						/>
					}

				</PanelBody>
				<GalleryLinkSettings { ...this.props } />
			</InspectorControls>
		);
	}
}

export default Inspector;
