/**
 * Internal dependencies
 */
import GutterControl from '../../components/gutter-control/gutter-control';
import captionOptions from '../../components/block-gallery/options/caption-options';
import SizeControl from '../../components/size-control';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';

/**
 * Inspector controls
 *
 * @param {Object} props
 */
const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		captions,
		captionStyle,
		gridSize,
		gutterCustom,
		gutter,
		radius,
		lightbox,
	} = attributes;

	useEffect( () => {
		if ( attributes.gutter <= 0 ) {
			setAttributes( {
				radius: 0,
			} );
		}
	}, [ attributes.gutter ] );

	const setRadiusTo = ( value ) => {
		setAttributes( { radius: value } );
	};

	const setSizeControl = ( value ) => {
		setAttributes( { gridSize: value } );
	};

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
			<PanelBody title={ __( 'Masonry settings', 'coblocks' ) }>

				<SizeControl { ...props }
					type={ 'grid' }
					label={ __( 'Size', 'coblocks' ) }
					onChange={ setSizeControl }
					value={ gridSize }
					resetValue={ 'xlrg' }
				/>
				<GutterControl { ...props } />

				{ gutter !== 'custom' && gutterCustom !== 0 &&
					<RangeControl
						label={ __( 'Rounded corners', 'coblocks' ) }
						aria-label={ __( 'Add rounded corners to the gallery items.', 'coblocks' ) }
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
					<SelectControl
						label={ __( 'Caption style', 'coblocks' ) }
						value={ captionStyle }
						onChange={ setCaptionStyleTo }
						options={ captionOptions }
					/>
				}

			</PanelBody>
			<GalleryLinkSettings { ...props } />
		</InspectorControls>
	);
};

export default Inspector;
