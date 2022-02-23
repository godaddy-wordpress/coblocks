/**
 * Internal dependencies
 */
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';
import GutterControl from '../../components/gutter-control/gutter-control';
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

/**
 * Shadow constant.
 */
const shadowOptions = [
	{
		label: __( 'None', 'coblocks' ),
		tooltip: __( 'None', 'coblocks' ),
		value: 'none',
	},
	{
		/* translators: abbreviation for small size */
		label: __( 'S', 'coblocks' ),
		tooltip: __( 'Small', 'coblocks' ),
		value: 'sml',

	},
	{
		/* translators: abbreviation for medium size */
		label: __( 'M', 'coblocks' ),
		tooltip: __( 'Medium', 'coblocks' ),
		value: 'med',
	},
	{
		/* translators: abbreviation for large size */
		label: __( 'L', 'coblocks' ),
		tooltip: __( 'Large', 'coblocks' ),
		value: 'lrg',
	},
];

/**
 * Inspector controls
 *
 * @param { Object } props
 */
const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		images,
		gutter,
		gutterCustom,
		fullwidth,
		radius,
		shadow,
		captions,
		lightbox,
	} = attributes;

	const { wideControlsEnabled } = useSelect( ( select ) => {
		return { wideControlsEnabled: select( 'core/editor' ).getEditorSettings()?.alignWide ?? false };
	} );

	const allowRadiusControls = ( gutter !== 'custom' ) || ( gutter === 'custom' && Number.parseFloat( gutterCustom ) !== 0 );

	useEffect( () => {
		// Disable radius when the gutters are 0
		if ( ! allowRadiusControls ) {
			setAttributes( { radius: 0 } );
		}
	}, [ allowRadiusControls ] );

	const setRadiusTo = ( value ) => setAttributes( { radius: value } );

	const setShadowTo = ( value ) => setAttributes( { shadow: value } );

	const setFullwidthTo = () => setAttributes( { fullwidth: ! fullwidth, shadow: 'none' } );

	const getFullwidthImagesHelp = ( checked ) => checked
		? __( 'Fullwidth images are enabled.', 'coblocks' )
		: __( 'Toggle to fill the available gallery area with completely fullwidth images.', 'coblocks' );

	const getCaptionsHelp = ( checked ) => checked
		? __( 'Showing captions for each media item.', 'coblocks' )
		: __( 'Toggle to show media captions.', 'coblocks' );

	const getLightboxHelp = ( checked ) => checked
		? __( 'Image lightbox is enabled.', 'coblocks' )
		: __( 'Toggle to enable the image lightbox.', 'coblocks' );

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Stacked settings', 'coblocks' ) }>

				{ wideControlsEnabled &&
					<ToggleControl
						checked={ !! fullwidth }
						help={ getFullwidthImagesHelp }
						label={ images.length > 1 ? __( 'Fullwidth images', 'coblocks' ) : __( 'Fullwidth image', 'coblocks' ) }
						onChange={ setFullwidthTo }
					/>
				}

				<GutterControl { ...props } />

				{ allowRadiusControls &&
					<RangeControl
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

				{ ! fullwidth &&
					<OptionSelectorControl
						currentOption={ shadow }
						label={ __( 'Shadow', 'coblocks' ) }
						onChange={ setShadowTo }
						options={ shadowOptions }
					/>
				}

			</PanelBody>
			<GalleryLinkSettings { ...props } />
		</InspectorControls>
	);
};

export default Inspector;
