/**
 * Internal dependencies
 */
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';
import captionOptions from '../../components/block-gallery/options/caption-options';
import SizeControl from '../../components/size-control';
import OptionSelectorControl from '../../components/option-selector-control';
import gutterOptions from '../../utils/gutter-options';

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

		this.setLinkTo = this.setLinkTo.bind( this );
		this.setRadiusTo = this.setRadiusTo.bind( this );
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

	setFullwidthTo() {
		this.props.setAttributes( { fullwidth: ! this.props.attributes.fullwidth } );
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
			gridSize,
			gutter,
			lightbox,
			radius,
			captions,
			captionStyle,
		} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Offset settings', 'coblocks' ) }>
					<SizeControl { ...this.props }
						label={ __( 'Size', 'coblocks' ) }
						type={ 'reverse-grid' }
						onChange={ this.setSizeControl }
						value={ gridSize }
						reset={ false }
					/>
					<OptionSelectorControl
						label={ __( 'Gutter', 'coblocks' ) }
						currentOption={ gutter }
						options={ gutterOptions }
						onChange={ ( gutter ) => setAttributes( { gutter } ) }
					/>
					{ gutter !== 'no' && <RangeControl
						label={ __( 'Rounded corners', 'coblocks' ) }
						value={ radius }
						onChange={ this.setRadiusTo }
						min={ 0 }
						max={ 20 }
						step={ 1 }
					/> }
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
					{ captions && <SelectControl
						label={ __( 'Caption style', 'coblocks' ) }
						value={ captionStyle }
						onChange={ this.setCaptionStyleTo }
						options={ captionOptions }
					/> }
				</PanelBody>
				<GalleryLinkSettings { ...this.props } />
			</InspectorControls>
		);
	}
}

export default Inspector;
