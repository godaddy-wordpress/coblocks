/**
 * External dependencies
 */
import { find } from 'lodash';

/**
 * WordPress dependencies
 */
import { store as noticesStore } from '@wordpress/notices';
import { Platform } from '@wordpress/element';
import { View } from '@wordpress/primitives';
import { __, _x, sprintf } from '@wordpress/i18n';
import { BaseControl, PanelBody, RangeControl, SelectControl, Spinner, ToggleControl } from '@wordpress/components';
import { store as blockEditorStore, InspectorControls } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import GutterControl from '../../components/gutter-control/gutter-control';
import useGetMedia from '../../components/block-gallery/use-get-media';
import useImageSizes from '../../components/block-gallery/use-image-sizes';
import { getHrefAndDestination, getImageSizeAttributes, getUpdatedLinkTargetSettings } from '../../components/block-gallery/utils';
import { LINK_DESTINATION_ATTACHMENT, LINK_DESTINATION_MEDIA, LINK_DESTINATION_NONE } from '../../components/block-gallery/constants';

const linkOptions = [
	{ label: __( 'Attachment Page', 'coblocks' ), value: LINK_DESTINATION_ATTACHMENT },
	{ label: __( 'Media File', 'coblocks' ), value: LINK_DESTINATION_MEDIA },
	{
		label: _x( 'None', 'Media item link option' ),
		value: LINK_DESTINATION_NONE,
	},
];

export default function Inspector( props ) {
	const {
		attributes,
		clientId,
		isSelected,
		setAttributes,
	} = props;

	const {
		imageCrop,
		linkTarget,
		linkTo,
		sizeSlug,
		lightbox,
		gutter,
		gutterCustom,
		radius,
	} = attributes;

	const {
		updateBlockAttributes,
	} = useDispatch( blockEditorStore );
	const { createSuccessNotice } = useDispatch( noticesStore );

	const { getBlock, getSettings } = useSelect( ( select ) => ( {
		getBlock: select( blockEditorStore ).getBlock,
		getSettings: select( blockEditorStore )?.getSettings || {},
	} ), [] );

	const innerBlockImages = useSelect(
		( select ) => {
			return select( blockEditorStore ).getBlock( clientId )?.innerBlocks;
		},
		[ clientId ]
	);

	const imageData = useGetMedia( innerBlockImages );

	const imageSizeOptions = useImageSizes(
		imageData,
		isSelected,
		getSettings
	);

	function getImageCropHelp( checked ) {
		return checked
			? __( 'Thumbnails are cropped to align.', 'coblocks' )
			: __( 'Thumbnails are not cropped.', 'coblocks' );
	}

	function toggleImageCrop() {
		setAttributes( { imageCrop: ! imageCrop } );
	}

	function setLinkTo( value ) {
		setAttributes( { linkTo: value } );
		const changedAttributes = {};
		const blocks = [];
		getBlock( clientId ).innerBlocks.forEach( ( block ) => {
			blocks.push( block.clientId );
			const image = block.attributes.id
				? find( imageData, { id: block.attributes.id } )
				: null;
			changedAttributes[ block.clientId ] = getHrefAndDestination(
				image,
				value
			);
		} );
		updateBlockAttributes( blocks, changedAttributes, true );
		const linkToText = [ ...linkOptions ].find(
			( linkType ) => linkType.value === value
		);

		createSuccessNotice(
			sprintf(
				/* translators: %s: image size settings */
				__( 'All gallery image links updated to: %s', 'coblocks' ),
				linkToText.label
			),
			{
				id: 'gallery-attributes-linkTo',
				type: 'snackbar',
			}
		);
	}

	function toggleOpenInNewTab( openInNewTab ) {
		const newLinkTarget = openInNewTab ? '_blank' : undefined;
		setAttributes( { linkTarget: newLinkTarget } );
		const changedAttributes = {};
		const blocks = [];
		getBlock( clientId ).innerBlocks.forEach( ( block ) => {
			blocks.push( block.clientId );
			changedAttributes[ block.clientId ] = getUpdatedLinkTargetSettings(
				newLinkTarget,
				block.attributes
			);
		} );

		updateBlockAttributes( blocks, changedAttributes, true );
		const noticeText = openInNewTab
			? __( 'All gallery images updated to open in new tab', 'coblocks' )
			: __( 'All gallery images updated to not open in new tab', 'coblocks' );
		createSuccessNotice( noticeText, {
			id: 'gallery-attributes-openInNewTab',
			type: 'snackbar',
		} );
	}

	function updateImagesSize( newSizeSlug ) {
		setAttributes( { sizeSlug: newSizeSlug } );
		const changedAttributes = {};
		const blocks = [];
		getBlock( clientId ).innerBlocks.forEach( ( block ) => {
			blocks.push( block.clientId );
			const image = block.attributes.id
				? find( imageData, { id: block.attributes.id } )
				: null;
			changedAttributes[ block.clientId ] = getImageSizeAttributes(
				image,
				newSizeSlug
			);
		} );

		updateBlockAttributes( blocks, changedAttributes, true );
		const imageSize = imageSizeOptions.find(
			( size ) => size.value === newSizeSlug
		);

		createSuccessNotice(
			sprintf(
				/* translators: %s: image size settings */
				__( 'All gallery image sizes updated to: %s', 'coblocks' ),
				imageSize.label
			),
			{
				id: 'gallery-attributes-sizeSlug',
				type: 'snackbar',
			}
		);
	}

	const getLightboxHelp = ( checked ) => {
		return checked
			? __( 'Image lightbox is enabled.', 'coblocks' )
			: __( 'Toggle to enable the image lightbox.', 'coblocks' );
	};

	const setRadiusTo = ( value ) => {
		setAttributes( { radius: value } );
	};

	const hasLinkTo = linkTo && linkTo !== 'none';

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Gallery settings', 'coblocks' ) }>
				<ToggleControl
					checked={ !! imageCrop }
					help={ getImageCropHelp }
					label={ __( 'Crop images', 'coblocks' ) }
					onChange={ toggleImageCrop }
				/>
				<SelectControl
					hideCancelButton={ true }
					label={ __( 'Link to', 'coblocks' ) }
					onChange={ setLinkTo }
					options={ linkOptions }
					value={ linkTo }
				/>
				{ hasLinkTo && (
					<ToggleControl
						checked={ linkTarget === '_blank' }
						label={ __( 'Open in new tab', 'coblocks' ) }
						onChange={ toggleOpenInNewTab }
					/>
				) }
				{ imageSizeOptions?.length > 0 && (
					<SelectControl
						hideCancelButton={ true }
						label={ __( 'Image size', 'coblocks' ) }
						onChange={ updateImagesSize }
						options={ imageSizeOptions }
						value={ sizeSlug }
					/>
				) }
				{ Platform.isWeb && ! imageSizeOptions && (
					<BaseControl className={ 'gallery-image-sizes' }>
						<BaseControl.VisualLabel>
							{ __( 'Image size', 'coblocks' ) }
						</BaseControl.VisualLabel>
						<View className={ 'gallery-image-sizes__loading' }>
							<Spinner />
							{ __( 'Loading options…', 'coblocks' ) }
						</View>
					</BaseControl>
				) }

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

			</PanelBody>
		</InspectorControls>
	);
}
