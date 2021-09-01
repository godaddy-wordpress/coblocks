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
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';

const Inspector = ( props ) => {
	/**
	 * setCaptionStyleTo
	 *
	 * @param {string} value
	 */
	const setCaptionStyleTo = ( value ) => {
		props.setAttributes( { captionStyle: value } );
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
		props.setAttributes( { shadow: value } );
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
		attributes,
		setAttributes,
		enableGutter,
		enableCaptions,
	} = props;

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
					label={ __( 'Shadow', 'coblocks' ) }
					options={ shadowOptions }
					currentOption={ shadow }
					showNoneOption
					onChange={ ( newShadow ) => setShadowTo( newShadow ) }
				/> }
				<ToggleControl
					label={ __( 'Lightbox', 'coblocks' ) }
					checked={ !! lightbox }
					onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
					help={ getLightboxHelp }
				/>
				{ enableCaptions && <ToggleControl
					label={ __( 'Captions', 'coblocks' ) }
					checked={ !! captions }
					onChange={ () => setAttributes( { captions: ! captions } ) }
					help={ getCaptionsHelp }
				/> }
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
