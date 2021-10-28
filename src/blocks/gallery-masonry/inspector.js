/**
 * Internal dependencies
 */
import captionOptions from '../../components/block-gallery/options/caption-options';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';
import GutterControl from '../../components/gutter-control/gutter-control';
import SizeControl from '../../components/size-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

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
					label={ __( 'Size', 'coblocks' ) }
					onChange={ setSizeControl }
					resetValue={ 'xlrg' }
					type={ 'grid' }
					value={ gridSize }
				/>
				<GutterControl { ...props } />

				{ gutter !== 'custom' && gutterCustom !== 0 &&
					<RangeControl
						aria-label={ __( 'Add rounded corners to the gallery items.', 'coblocks' ) }
						label={ __( 'Rounded corners', 'coblocks' ) }
						max={ 20 }
						min={ 0 }
						onChange={ setRadiusTo }
						step={ 1 }
						value={ radius }
					/>
				}

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

				{ captions &&
					<SelectControl
						label={ __( 'Caption style', 'coblocks' ) }
						onChange={ setCaptionStyleTo }
						options={ captionOptions }
						value={ captionStyle }
					/>
				}

			</PanelBody>
			<GalleryLinkSettings { ...props } />
		</InspectorControls>
	);
};

export default Inspector;
