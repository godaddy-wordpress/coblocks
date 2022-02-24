/**
 * Internal dependencies
 */
import captionOptions from '../../components/block-gallery/options/caption-options';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';
import GutterControl from '../../components/gutter-control/gutter-control';
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const {
		setAttributes,
		attributes,
	} = props;

	const {
		align,
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
	const setRadiusTo = ( value ) => setAttributes( { radius: value } );

	/**
	 * setSize
	 *
	 * @param {number} value
	 */
	const setSize = ( value ) => setAttributes( { gridSize: value } );

	/**
	 * setCaptionStyleTo
	 *
	 * @param {string} value
	 */
	const setCaptionStyleTo = ( value ) => setAttributes( { captionStyle: value } );

	const getCaptionsHelp = ( checked ) => checked
		? __( 'Showing captions for each media item.', 'coblocks' )
		: __( 'Toggle to show media captions.', 'coblocks' );

	const getLightboxHelp = ( checked ) => checked
		? __( 'Image lightbox is enabled.', 'coblocks' )
		: __( 'Toggle to enable the image lightbox.', 'coblocks' );

	/**
	 * Size constant.
	 */
	const sizeOptions = () => {
		const defaultOptions = [
			{
				/* translators: abbreviation for large size */
				label: __( 'L', 'coblocks' ),
				tooltip: __( 'Large', 'coblocks' ),
				value: 'lrg',
			},
			{
				/* translators: abbreviation for large size */
				label: __( 'XL', 'coblocks' ),
				tooltip: __( 'Extra Large', 'coblocks' ),
				value: 'xlrg',
			},
		];

		if ( !! align && align !== 'none' ) {
			defaultOptions.unshift( {
				/* translators: abbreviation for medium size */
				label: __( 'M', 'coblocks' ),
				tooltip: __( 'Medium', 'coblocks' ),
				value: 'med',
			} );
		}
		if ( align === 'full' ) {
			defaultOptions.unshift( {
				/* translators: abbreviation for small size */
				label: __( 'S', 'coblocks' ),
				tooltip: __( 'Small', 'coblocks' ),
				value: 'sml',
			} );
		}
		return defaultOptions;
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Offset settings', 'coblocks' ) }>
				<OptionSelectorControl
					currentOption={ gridSize }
					label={ __( 'Size', 'coblocks' ) }
					onChange={ setSize }
					options={ sizeOptions() }
				/>
				<GutterControl { ...props } />
				{ gutter !== 'no' && <RangeControl
					label={ __( 'Rounded corners', 'coblocks' ) }
					max={ 20 }
					min={ 0 }
					onChange={ setRadiusTo }
					step={ 1 }
					value={ radius }
				/> }
				<ToggleControl
					checked={ !! lightbox }
					help={ getLightboxHelp }
					label={ __( 'Lightbox', 'coblocks' ) }
					onChange={ () => setAttributes( { lightbox: ! lightbox } ) }
				/>
				<ToggleControl
					checked={ !! captions }
					help={ getCaptionsHelp }
					label={ __( 'Captions', 'coblocks' ) }
					onChange={ () => setAttributes( { captions: ! captions } ) }
				/>
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
