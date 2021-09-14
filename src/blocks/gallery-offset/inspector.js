/**
 * Internal dependencies
 */
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';
import captionOptions from '../../components/block-gallery/options/caption-options';
import SizeControl from '../../components/size-control';
import GutterControl from '../../components/gutter-control/gutter-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param props
 */
const Inspector = ( props ) => {
	const {
		setAttributes,
		attributes,
	} = props;

	const {
		gridSize,
		gutter,
		lightbox,
		radius,
		captions,
		captionStyle,
	} = attributes;

	/**
	 * setRadiusTo
	 *
	 * @param {number} value
	 */
	const setRadiusTo = ( value ) => {
		setAttributes( { radius: value } );
	};

	/**
	 * setSizeControl
	 *
	 * @param {number} value
	 */
	const setSizeControl = ( value ) => {
		setAttributes( { gridSize: value } );
	};

	/**
	 * setCaptionStyleTo
	 *
	 * @param {string} value
	 */
	const setCaptionStyleTo = ( value ) => {
		setAttributes( { captionStyle: value } );
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
			<PanelBody title={ __( 'Offset settings', 'coblocks' ) }>
				<SizeControl { ...props }
					label={ __( 'Size', 'coblocks' ) }
					type={ 'reverse-grid' }
					onChange={ setSizeControl }
					value={ gridSize }
					reset={ false }
				/>
				<GutterControl { ...props } />
				{ gutter !== 'no' && <RangeControl
					label={ __( 'Rounded corners', 'coblocks' ) }
					value={ radius }
					onChange={ setRadiusTo }
					min={ 0 }
					max={ 20 }
					step={ 1 }
				/> }
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
				{ captions && <SelectControl
					label={ __( 'Caption style', 'coblocks' ) }
					value={ captionStyle }
					onChange={ setCaptionStyleTo }
					options={ captionOptions }
				/> }
			</PanelBody>
			<GalleryLinkSettings { ...props } />
		</InspectorControls>
	);
};

export default Inspector;
