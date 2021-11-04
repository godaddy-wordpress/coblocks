/**
 * Internal dependencies
 */
//import captionOptions from '../../components/block-gallery/options/caption-options';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';
import SizeControl from '../../components/size-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';

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
		//captions,
		//captionStyle,
		gridSize,
		//gutterCustom,
		//gutter,
		//radius,
		//lightbox,
	} = attributes;

	useEffect( () => {
		if ( attributes.gutter <= 0 ) {
			setAttributes( {
				radius: 0,
			} );
		}
	}, [ attributes.gutter ] );

	const setSizeControl = ( value ) => {
		setAttributes( { gridSize: value } );
	};

	/*const setCaptionStyleTo = ( value ) => {
		setAttributes( { captionStyle: value } );
	};

	const getCaptionsHelp = ( checked ) => {
		return checked
			? __( 'Showing captions for each media item.', 'coblocks' )
			: __( 'Toggle to show media captions.', 'coblocks' );
	};*/

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

			</PanelBody>
			<GalleryLinkSettings { ...props } />
		</InspectorControls>
	);
};

export default Inspector;
