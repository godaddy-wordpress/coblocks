/**
 * Internal dependencies
 */
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import SizeControl from '../../components/size-control';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';
import CoBlocksFontSizePicker from '../../components/fontsize-picker';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { InspectorControls, withFontSizes } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param { Object } props
 */
const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
		wideControlsEnabled = false,
	} = props;

	const {
		images,
		gutter,
		fullwidth,
		radius,
		shadow,
		captions,
		lightbox,
	} = attributes;

	const setRadiusTo = ( value ) => {
		setAttributes( { radius: value } );
	};

	const setShadowTo = ( value ) => {
		setAttributes( { shadow: value } );
	};

	const setFullwidthTo = () => {
		setAttributes( { fullwidth: ! fullwidth, shadow: 'none' } );
	};

	const getFullwidthImagesHelp = ( checked ) => {
		return checked
			? __( 'Fullwidth images are enabled.', 'coblocks' )
			: __( 'Toggle to fill the available gallery area with completely fullwidth images.', 'coblocks' );
	};

	const getCaptionsHelp = ( checked ) => {
		return checked
			? __( 'Showing captions for each media item.', 'coblocks' )
			: __( 'Toggle to show media captions.', 'coblocks' );
	};

	const getLightboxHelp = ( checked ) => {
		return checked
			? __( 'Image lightbox is enabled.', 'coblocks' )
			: __( 'Toggle to enable the image lightbox.', 'coblocks' );
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Stacked settings', 'coblocks' ) }>

				{ wideControlsEnabled &&
				<ToggleControl
					label={ images.length > 1 ? __( 'Fullwidth images', 'coblocks' ) : __( 'Fullwidth image', 'coblocks' ) }
					checked={ !! fullwidth }
					help={ getFullwidthImagesHelp }
					onChange={ setFullwidthTo }
				/>
				}

				{ images.length > 1 &&
				<ResponsiveTabsControl { ...props }
				/>
				}

				{ gutter > 0 &&
				<RangeControl
					label={ __( 'Rounded corners', 'coblocks' ) }
					value={ radius }
					onChange={ setRadiusTo }
					min={ 0 }
					max={ 20 }
					step={ 1 }
				/>
				}

				<ToggleControl
					label={ __( 'Lightbox', 'coblocks' ) }
					checked={ !! lightbox }
					onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
					help={ getLightboxHelp }
				/>

				<ToggleControl
					label={ __( 'Captions', 'coblocks' ) }
					checked={ !! captions }
					onChange={ () => setAttributes( { captions: ! captions } ) }
					help={ getCaptionsHelp }
				/>

				{ captions &&
				<CoBlocksFontSizePicker { ...props } />
				}

				{ ! fullwidth &&
				<SizeControl { ...props }
					onChange={ setShadowTo }
					value={ shadow }
					label={ __( 'Shadow', 'coblocks' ) }
					reset={ false }
				/>
				}

			</PanelBody>
			<GalleryLinkSettings { ...props } />
		</InspectorControls>
	);
};

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withFontSizes( 'fontSize' ),
] )( Inspector );
