/**
 * External dependencies
 */
import classnames from 'classnames';
import GutterControl from '../../components/gutter-control/gutter-control';
import { GalleryMasonryIcon as icon } from '@godaddy-wordpress/coblocks-icons';
import { concat, find } from 'lodash';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { createBlobURL } from '@wordpress/blob';
import { createBlock } from '@wordpress/blocks';
import { store as noticesStore } from '@wordpress/notices';
import { View } from '@wordpress/primitives';
import { __, _x, sprintf } from '@wordpress/i18n';
import { BaseControl, Icon, PanelBody, RangeControl, SelectControl, Spinner, ToggleControl, withNotices } from '@wordpress/components';
import { store as blockEditorStore, InspectorControls, MediaPlaceholder, useBlockProps } from '@wordpress/block-editor';
import { Platform, useEffect, useMemo } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Gallery from '../../components/block-gallery/gallery';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import { pickRelevantMediaFiles } from '../../components/block-gallery/shared-helpers';
import useGetMedia from '../../components/block-gallery/use-get-media';
import useGetNewImages from '../../components/block-gallery/use-get-new-images';
import useImageSizes from '../../components/block-gallery/use-image-sizes';
import useShortCodeTransform from '../../components/block-gallery/use-short-code-transform';
import { getHrefAndDestination, getImageSizeAttributes, getUpdatedLinkTargetSettings } from '../../components/block-gallery/utils';
import { LINK_DESTINATION_ATTACHMENT, LINK_DESTINATION_MEDIA, LINK_DESTINATION_NONE } from '../../components/block-gallery/constants';

const linkOptions = [
	{ label: __( 'Attachment Page' ), value: LINK_DESTINATION_ATTACHMENT },
	{ label: __( 'Media File' ), value: LINK_DESTINATION_MEDIA },
	{
		label: _x( 'None', 'Media item link option' ),
		value: LINK_DESTINATION_NONE,
	},
];
const ALLOWED_MEDIA_TYPES = [ 'image' ];

const PLACEHOLDER_TEXT = Platform.isNative
	? __( 'ADD MEDIA' )
	: __( 'Drag images, upload new ones or select files from your library.' );

function GalleryEdit( props ) {
	const {
		setAttributes,
		attributes,
		className,
		clientId,
		noticeOperations,
		isSelected,
		noticeUI,
		insertBlocksAfter,
	} = props;

	const {
		imageCrop,
		linkTarget,
		linkTo,
		shortCodeTransforms,
		sizeSlug,
		lightbox,
		gutter,
		gutterCustom,
		radius,
	} = attributes;

	const {
		__unstableMarkNextChangeAsNotPersistent,
		replaceBlocks,
		replaceInnerBlocks,
		updateBlockAttributes,
	} = useDispatch( blockEditorStore );
	const { createSuccessNotice } = useDispatch( noticesStore );

	const { getBlock, getSettings, preferredStyle } = useSelect( ( select ) => {
		const settings = select( blockEditorStore ).getSettings();
		const preferredStyleVariations =
			settings.__experimentalPreferredStyleVariations;
		return {
			getBlock: select( blockEditorStore ).getBlock,
			getSettings: select( blockEditorStore )?.getSettings || {},
			preferredStyle: preferredStyleVariations?.value?.[ 'core/image' ],
		};
	}, [] );

	const innerBlockImages = useSelect(
		( select ) => {
			return select( blockEditorStore ).getBlock( clientId )?.innerBlocks;
		},
		[ clientId ]
	);

	const images = useMemo(
		() =>
			innerBlockImages?.map( ( block ) => ( {
				attributes: block.attributes,
				clientId: block.clientId,
				fromSavedContent: Boolean( block.originalContent ),
				id: block.attributes.id,
				url: block.attributes.url,
			} ) ),
		[ innerBlockImages ]
	);

	useEffect( () => {
		/**
		 * This logic should only fire in the case of block deprecations.
		 * Deprecated markup come in with old attributes and the block
		 *must be replaced for proper instantiation.
		 */
		if ( !! attributes?.images?.length && ! images?.length ) {
			const newBlocks = attributes?.images.map( ( image ) => {
				return createBlock( 'core/image', {
					alt: image.alt,
					caption: image.caption?.toString(),
					id: parseInt( image.id ),
					url: image.url,
				} );
			} );

			const transformedBlock = createBlock( 'coblocks/gallery-masonry', {}, newBlocks );

			replaceBlocks(
				[ clientId ],
				transformedBlock,
			);
		}
	}, [] );

	const imageData = useGetMedia( innerBlockImages );

	const newImages = useGetNewImages( images, imageData );

	useEffect( () => {
		const changedAttributes = {};
		const blocks = [];
		getBlock( clientId )?.innerBlocks.forEach( ( block ) => {
			blocks.push( block.clientId );
			changedAttributes[ block.clientId ] = { className: 'masonry-brick' };
		} );
		updateBlockAttributes( blocks, changedAttributes, true );
	}, [] );

	useEffect( () => {
		newImages?.forEach( ( newImage ) => {
			updateBlockAttributes( newImage.clientId, {
				...buildImageAttributes( false, newImage.attributes ),
				align: undefined,
				id: newImage.id,
			} );
		} );
	}, [ newImages ] );

	useEffect( () => {
		if ( attributes.gutterCustom === '0' ) {
			setAttributes( {
				radius: 0,
			} );
		}
	}, [ attributes.gutterCustom ] );

	const shortCodeImages = useShortCodeTransform( shortCodeTransforms );

	useEffect( () => {
		if ( ! shortCodeTransforms || ! shortCodeImages ) {
			return;
		}
		updateImages( shortCodeImages );
		setAttributes( { shortCodeTransforms: undefined } );
	}, [ shortCodeTransforms, shortCodeImages ] );

	useEffect( () => {
		// linkTo attribute must be saved so blocks don't break when changing image_default_link_type in options.php
		if ( ! linkTo ) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes( {
				linkTo:
					window?.wp?.media?.view?.settings?.defaultProps?.link ||
					LINK_DESTINATION_NONE,
			} );
		}
	}, [ linkTo ] );

	const imageSizeOptions = useImageSizes(
		imageData,
		isSelected,
		getSettings
	);

	/**
	 * Determines the image attributes that should be applied to an image block
	 * after the gallery updates.
	 *
	 * The gallery will receive the full collection of images when a new image
	 * is added. As a result we need to reapply the image's original settings if
	 * it already existed in the gallery. If the image is in fact new, we need
	 * to apply the gallery's current settings to the image.
	 *
	 * @param {Object} existingBlock Existing Image block that still exists after gallery update.
	 * @param {Object} image         Media object for the actual image.
	 * @return {Object}               Attributes to set on the new image block.
	 */
	function buildImageAttributes( existingBlock, image ) {
		if ( existingBlock ) {
			return existingBlock.attributes;
		}

		const newClassName = classnames( image.className, 'masonry-brick', {
			[ `is-style-${ preferredStyle }` ]: preferredStyle,
		} );

		return {
			...pickRelevantMediaFiles( image, sizeSlug ),
			...getHrefAndDestination( image, linkTo ),
			...getUpdatedLinkTargetSettings( linkTarget, attributes ),
			className: newClassName,
			sizeSlug,
		};
	}

	function isValidFileType( file ) {
		return (
			ALLOWED_MEDIA_TYPES.some(
				( mediaType ) => file.type?.indexOf( mediaType ) === 0
			) || file.url?.indexOf( 'blob:' ) === 0
		);
	}

	function updateImages( selectedImages ) {
		const newFileUploads =
			Object.prototype.toString.call( selectedImages ) ===
			'[object FileList]';

		const imageArray = newFileUploads
			? Array.from( selectedImages ).map( ( file ) => {
				if ( ! file.url ) {
					return pickRelevantMediaFiles( {
						url: createBlobURL( file ),
					} );
				}

				return file;
			} )
			: selectedImages;

		if ( !! newFileUploads && ! imageArray.every( isValidFileType ) ) {
			noticeOperations.removeAllNotices();
			noticeOperations.createErrorNotice(
				__(
					'If uploading to a gallery all files need to be image formats'
				),
				{ id: 'gallery-upload-invalid-file' }
			);
		}

		const processedImages = imageArray
			.filter( ( file ) => file.url || isValidFileType( file ) )
			.map( ( file ) => {
				if ( ! file.url ) {
					return pickRelevantMediaFiles( {
						url: createBlobURL( file ),
					} );
				}

				return file;
			} );

		// Because we are reusing existing innerImage blocks any reordering
		// done in the media library will be lost so we need to reapply that ordering
		// once the new image blocks are merged in with existing.
		const newOrderMap = processedImages.reduce(
			( result, image, index ) => (
				( result[ image.id ] = index ), result
			),
			{}
		);

		const existingImageBlocks = ! newFileUploads
			? innerBlockImages.filter( ( block ) =>
				processedImages.find(
					( img ) => img.id === block.attributes.id
				)
			)
			: innerBlockImages;

		const newCaptions = selectedImages?.reduce( ( previous, image ) => {
			const previousReturnedObject = !! previous?.mime ? {} : previous;
			return { ...previousReturnedObject, [ `${ image.id }` ]: image.caption };
		} );

		existingImageBlocks?.forEach( ( image ) => {
			const compareCaption = newCaptions[ image.attributes.id ];
			if ( image.attributes.caption !== compareCaption ) {
				image.attributes.caption = compareCaption;
			}
		} );

		const newImageList = processedImages.filter(
			( img ) =>
				! existingImageBlocks.find(
					( existingImg ) => img.id === existingImg.attributes.id
				)
		);

		const newBlocks = newImageList.map( ( image ) => {
			return createBlock( 'core/image', {
				alt: image.alt,
				caption: image.caption,
				id: image.id,
				url: image.url,
			} );
		} );

		replaceInnerBlocks(
			clientId,
			concat( existingImageBlocks, newBlocks ).sort(
				( a, b ) =>
					newOrderMap[ a.attributes.id ] -
					newOrderMap[ b.attributes.id ]
			)
		);
	}

	function onUploadError( message ) {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
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
				__( 'All gallery image links updated to: %s' ),
				linkToText.label
			),
			{
				id: 'gallery-attributes-linkTo',
				type: 'snackbar',
			}
		);
	}

	function toggleImageCrop() {
		setAttributes( { imageCrop: ! imageCrop } );
	}

	function getImageCropHelp( checked ) {
		return checked
			? __( 'Thumbnails are cropped to align.' )
			: __( 'Thumbnails are not cropped.' );
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
			? __( 'All gallery images updated to open in new tab' )
			: __( 'All gallery images updated to not open in new tab' );
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
				__( 'All gallery image sizes updated to: %s' ),
				imageSize.label
			),
			{
				id: 'gallery-attributes-sizeSlug',
				type: 'snackbar',
			}
		);
	}

	const hasImages = !! images.length;
	const hasImageIds = hasImages && images.some( ( image ) => !! image.id );
	const imagesUploading = images.some(
		( img ) => ! img.id && img.url?.indexOf( 'blob:' ) === 0
	);

	const mediaPlaceholder = (
		<MediaPlaceholder
			accept="image/*"
			addToGallery={ hasImageIds }
			allowedTypes={ ALLOWED_MEDIA_TYPES }
			disableMediaButtons={
				( hasImages && ! isSelected ) || imagesUploading
			}
			handleUpload={ false }
			icon={ ! hasImages && <Icon icon={ icon } /> }
			isAppender={ hasImages }
			labels={ {
				instructions: ! hasImages && PLACEHOLDER_TEXT,
				title: ! hasImages && __( 'Gallery' ),
			} }
			multiple
			notices={ hasImages ? undefined : noticeUI }
			onError={ onUploadError }
			onSelect={ updateImages }
			value={ hasImageIds ? images : {} }
		/>
	);

	const getLightboxHelp = ( checked ) => {
		return checked
			? __( 'Image lightbox is enabled.', 'coblocks' )
			: __( 'Toggle to enable the image lightbox.', 'coblocks' );
	};

	const setRadiusTo = ( value ) => {
		setAttributes( { radius: value } );
	};

	const blockProps = useBlockProps( {
		className: classnames( className, {
			[ `has-border-radius-${ radius }` ]: radius > 0,
		} ),
	} );

	const hasLinkTo = linkTo && linkTo !== 'none';

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Gallery settings' ) }>
					<ToggleControl
						checked={ !! imageCrop }
						help={ getImageCropHelp }
						label={ __( 'Crop images' ) }
						onChange={ toggleImageCrop }
					/>
					<SelectControl
						hideCancelButton={ true }
						label={ __( 'Link to' ) }
						onChange={ setLinkTo }
						options={ linkOptions }
						value={ linkTo }
					/>
					{ hasLinkTo && (
						<ToggleControl
							checked={ linkTarget === '_blank' }
							label={ __( 'Open in new tab' ) }
							onChange={ toggleOpenInNewTab }
						/>
					) }
					{ imageSizeOptions?.length > 0 && (
						<SelectControl
							hideCancelButton={ true }
							label={ __( 'Image size' ) }
							onChange={ updateImagesSize }
							options={ imageSizeOptions }
							value={ sizeSlug }
						/>
					) }
					{ Platform.isWeb && ! imageSizeOptions && (
						<BaseControl className={ 'gallery-image-sizes' }>
							<BaseControl.VisualLabel>
								{ __( 'Image size' ) }
							</BaseControl.VisualLabel>
							<View className={ 'gallery-image-sizes__loading' }>
								<Spinner />
								{ __( 'Loading options…' ) }
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
			{ noticeUI }
			<GutterWrapper { ...attributes }>
				<Gallery
					{ ...props }
					blockProps={ blockProps }
					images={ images }
					insertBlocksAfter={ insertBlocksAfter }
					mediaPlaceholder={ mediaPlaceholder }
					wrapperClass="masonry-grid"
				/>
			</GutterWrapper>
		</>
	);
}
export default compose( [
	withNotices,
] )( GalleryEdit );
