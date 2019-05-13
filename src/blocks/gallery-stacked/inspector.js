/**
 * Internal dependencies
 */
import { title } from './'
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import linkOptions from '../../components/block-gallery/options/link-options';
import SizeControl from '../../components/size-control';
import { BackgroundPanel } from '../../components/background';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { InspectorControls, FontSizePicker, withFontSizes } = wp.editor;
const { PanelBody, RangeControl, ToggleControl, SelectControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
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
		return checked ? __( 'Fullwidth images are enabled.' ) : __( 'Toggle to fill the available gallery area with completely fullwidth images.' );
	}

	getCaptionsHelp( checked ) {
		return checked ? __( 'Showing captions for each media item.' ) : __( 'Toggle to show media captions.' );
	}

	render() {

		const {
			attributes,
			setAttributes,
			isSelected,
			setFontSize,
			fontSize,
			wideControlsEnabled = false,
		} = this.props;

		const {
			align,
			images,
			linkTo,
			gutter,
			lightbox,
			fullwidth,
			radius,
			shadow,
			captions,
			backgroundPadding,
		} = attributes;

		return (
			<InspectorControls>
				<PanelBody title={ sprintf( __( '%s Settings' ), title ) }>
					{ wideControlsEnabled &&
						<ToggleControl
							label={ images.length > 1 ? __( 'Fullwidth Images' ) : __( 'Fullwidth Image' ) }
							checked={ !! fullwidth }
							help={ this.getFullwidthImagesHelp }
							onChange={ this.setFullwidthTo }
						/>
					}
					{ images.length > 1 &&
						<ResponsiveTabsControl { ...this.props }
							label={ __( 'Gutter' ) }
						/>
					}
					{ gutter > 0 && <RangeControl
						label={ __( 'Rounded Corners' ) }
						value={ radius }
						onChange={ this.setRadiusTo }
						min={ 0 }
						max={ 20 }
						step={ 1 }
					/> }
					{ ! fullwidth && <SizeControl { ...this.props }
						onChange={ this.setShadowTo }
						value={ shadow }
						label={ __( 'Box Shadow' ) }
						reset={ false }
						className={ 'components-coblocks-size-control--shadow' }

					/> }
					<ToggleControl
						label={ __( 'Captions' ) }
						checked={ !! captions }
						onChange={ () => setAttributes( {  captions: ! captions } ) }
						help={ this.getCaptionsHelp }
					/>
					{ captions &&
						<FontSizePicker
							value={ fontSize.size }
							onChange={ setFontSize }
						/>
					}
				</PanelBody>
				{ ! lightbox && <PanelBody
					title={ __( 'Link Settings' ) }
					initialOpen={ false }
					>
					<SelectControl
						label={ __( 'Link To' ) }
						value={ linkTo }
						options={ linkOptions }
						onChange={ this.setLinkTo }
					/>
				</PanelBody> }
				<BackgroundPanel { ...this.props }
 					hasCaption={ true }
 					hasOverlay={ true }
 					hasGalleryControls={ true }
 				/>
			</InspectorControls>
		)
	}
};

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withFontSizes( 'fontSize' ),
] )( Inspector );
