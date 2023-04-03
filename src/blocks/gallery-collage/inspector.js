/**
 * Internal dependencies
 */
import captionOptions from '../../components/block-gallery/options/caption-options';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';
import OptionSelectorControl from '../../components/option-selector-control';
import GutterControl from '../../components/gutter-control/gutter-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
		enableGutter,
		enableCaptions,
	} = props;

	/**
	 * setCaptionStyleTo
	 *
	 * @param {string} value
	 */
	const setCaptionStyleTo = ( value ) => {
		setAttributes( { captionStyle: value } );
	};

	/**
	 * getCaptionsHelp
	 *
	 * @param {boolean} checked
	 */
	const getCaptionsHelp = ( checked ) => {
		return checked ? __( 'Showing captions for each media item.', 'coblocks' ) : __( 'Toggle to show media captions.', 'coblocks' );
	};

	/**
	 * setShadowTo
	 *
	 * @param {boolean} value
	 */
	const setShadowTo = ( value ) => {
		setAttributes( { shadow: value } );
	};

	/**
	 * getLightboxHelp
	 *
	 * @param {boolean} checked
	 */
	const getLightboxHelp = ( checked ) => {
		return checked ? __( 'Image lightbox is enabled.', 'coblocks' ) : __( 'Toggle to enable the image lightbox.', 'coblocks' );
	};

	const {
		shadow,
		captions,
		captionStyle,
		lightbox,
	} = attributes;

	const shadowOptions = [
		{
			value: 'sm',
			/* translators: abbreviation for small size */
			label: __( 'S', 'coblocks' ),
			tooltip: __( 'Small', 'coblocks' ),
		},
		{
			value: 'md',
			/* translators: abbreviation for medium size */
			label: __( 'M', 'coblocks' ),
			tooltip: __( 'Medium', 'coblocks' ),
		},
		{
			value: 'lg',
			/* translators: abbreviation for large size */
			label: __( 'L', 'coblocks' ),
			tooltip: __( 'Large', 'coblocks' ),
		},
	];

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Collage settings', 'coblocks' ) }>
				{ enableGutter && <GutterControl { ...props } /> }
				{ ! enableGutter && <OptionSelectorControl
					currentOption={ shadow }
					label={ __( 'Shadow', 'coblocks' ) }
					onChange={ ( newShadow ) => setShadowTo( newShadow ) }
					options={ shadowOptions }
					showNoneOption
				/> }
				<ToggleControl
					checked={ !! lightbox }
					help={ getLightboxHelp }
					label={ __( 'Lightbox', 'coblocks' ) }
					onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
				/>
				{ enableCaptions && <ToggleControl
					checked={ !! captions }
					help={ getCaptionsHelp }
					label={ __( 'Captions', 'coblocks' ) }
					onChange={ () => setAttributes( { captions: ! captions } ) }
				/> }
				{ captions && <SelectControl
					label={ __( 'Caption style', 'coblocks' ) }
					onChange={ setCaptionStyleTo }
					options={ captionOptions }
					value={ captionStyle }
				/> }
			</PanelBody>
			<GalleryLinkSettings { ...props } />
		</InspectorControls>
	);
};

export default Inspector;
