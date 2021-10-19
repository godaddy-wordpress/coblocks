/**
 * External dependencies
 */
import classnames from 'classnames';
// import filter from 'lodash/filter';
// import Masonry from 'react-masonry-component';
import { GalleryMasonryIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import GalleryImage from '../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import { GalleryClasses } from '../../components/block-gallery/shared';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

/**
 * WordPress dependencies
 */
// import { __, sprintf } from '@wordpress/i18n';
import { compose, usePrevious } from '@wordpress/compose';

/**
 * External dependencies
 */
import { concat, find } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	BaseControl,
	PanelBody,
	SelectControl,
	ToggleControl,
	withNotices,
	RangeControl,
	Spinner,
	Icon,
} from '@wordpress/components';
import {
	store as blockEditorStore,
	MediaPlaceholder,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { Platform, useEffect, useMemo, useState } from '@wordpress/element';
import { __, _x, sprintf } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { withViewportMatch } from '@wordpress/viewport';
import { View } from '@wordpress/primitives';
import { createBlock } from '@wordpress/blocks';
import { createBlobURL } from '@wordpress/blob';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { pickRelevantMediaFiles } from './shared';
import { getHrefAndDestination, getUpdatedLinkTargetSettings, getImageSizeAttributes } from './utils';
import Gallery from './gallery';
import {
	LINK_DESTINATION_ATTACHMENT,
	LINK_DESTINATION_MEDIA,
	LINK_DESTINATION_NONE,
} from './constants';
import useImageSizes from './use-image-sizes';
import useShortCodeTransform from './use-short-code-transform';
import useGetNewImages from './use-get-new-images';
import useGetMedia from './use-get-media';

const MAX_COLUMNS = 8;
const linkOptions = [
	{ value: LINK_DESTINATION_ATTACHMENT, label: __( 'Attachment Page' ) },
	{ value: LINK_DESTINATION_MEDIA, label: __( 'Media File' ) },
	{
		value: LINK_DESTINATION_NONE,
		label: _x( 'None', 'Media item link option' ),
	},
];
const ALLOWED_MEDIA_TYPES = [ 'image' ];

const PLACEHOLDER_TEXT = Platform.isNative
	? __( 'ADD MEDIA' )
	: __( 'Drag images, upload new ones or select files from your library.' );

const MOBILE_CONTROL_PROPS_RANGE_CONTROL = Platform.isNative
	? { type: 'stepper' }
	: {};

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
		columns,
		imageCrop,
		linkTarget,
		linkTo,
		shortCodeTransforms,
		sizeSlug,
	} = attributes;

	const {
		__unstableMarkNextChangeAsNotPersistent,
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
			getSettings: select( blockEditorStore ).getSettings,
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
				clientId: block.clientId,
				id: block.attributes.id,
				url: block.attributes.url,
				attributes: block.attributes,
				fromSavedContent: Boolean( block.originalContent ),
			} ) ),
		[ innerBlockImages ]
	);

	const imageData = useGetMedia( innerBlockImages );

	const newImages = useGetNewImages( images, imageData );

	useEffect( () => {
		newImages?.forEach( ( newImage ) => {
			updateBlockAttributes( newImage.clientId, {
				...buildImageAttributes( false, newImage.attributes ),
				id: newImage.id,
				align: undefined,
			} );
		} );
	}, [ newImages ] );

	const shortCodeImages = useShortCodeTransform( shortCodeTransforms );

	useEffect( () => {
		if ( ! shortCodeTransforms || ! shortCodeImages ) {
			return;
		}
		updateImages( shortCodeImages );
		setAttributes( { shortCodeTransforms: undefined } );
	}, [ shortCodeTransforms, shortCodeImages ] );

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

		let newClassName;
		if ( image.className && image.className !== '' ) {
			newClassName = image.className;
		} else {
			newClassName = preferredStyle
				? `is-style-${ preferredStyle }`
				: undefined;
		}

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

		if ( ! imageArray.every( isValidFileType ) ) {
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

		const newImageList = processedImages.filter(
			( img ) =>
				! existingImageBlocks.find(
					( existingImg ) => img.id === existingImg.attributes.id
				)
		);

		const newBlocks = newImageList.map( ( image ) => {
			return createBlock( 'core/image', {
				id: image.id,
				url: image.url,
				caption: image.caption,
				alt: image.alt,
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

	function setColumnsNumber( value ) {
		setAttributes( { columns: value } );
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

	const hasImages = !! images.length;
	const hasImageIds = hasImages && images.some( ( image ) => !! image.id );
	const imagesUploading = images.some(
		( img ) => ! img.id && img.url?.indexOf( 'blob:' ) === 0
	);

	const mediaPlaceholder = (
		<MediaPlaceholder
			addToGallery={ hasImageIds }
			handleUpload={ false }
			isAppender={ hasImages }
			disableMediaButtons={
				( hasImages && ! isSelected ) || imagesUploading
			}
			icon={ ! hasImages && <Icon icon={ icon } /> }
			labels={ {
				title: ! hasImages && __( 'Gallery' ),
				instructions: ! hasImages && PLACEHOLDER_TEXT,
			} }
			onSelect={ updateImages }
			accept="image/*"
			allowedTypes={ ALLOWED_MEDIA_TYPES }
			multiple
			value={ hasImageIds ? images : {} }
			onError={ onUploadError }
			notices={ hasImages ? undefined : noticeUI }
		/>
	);

	const blockProps = useBlockProps( {
		className: classnames( className, 'has-nested-images' ),
	} );

	if ( ! hasImages ) {
		return <View { ...blockProps }>{ mediaPlaceholder }</View>;
	}

	const hasLinkTo = linkTo && linkTo !== 'none';

	return (
		<>
			{ /* <InspectorControls>
				<PanelBody title={ __( 'Gallery settings' ) }>
					<ToggleControl
						label={ __( 'Crop images' ) }
						checked={ !! imageCrop }
						onChange={ toggleImageCrop }
						help={ getImageCropHelp }
					/>
					<SelectControl
						label={ __( 'Link to' ) }
						value={ linkTo }
						onChange={ setLinkTo }
						options={ linkOptions }
						hideCancelButton={ true }
					/>
					{ hasLinkTo && (
						<ToggleControl
							label={ __( 'Open in new tab' ) }
							checked={ linkTarget === '_blank' }
							onChange={ toggleOpenInNewTab }
						/>
					) }
					{ imageSizeOptions?.length > 0 && (
						<SelectControl
							label={ __( 'Image size' ) }
							value={ sizeSlug }
							options={ imageSizeOptions }
							onChange={ updateImagesSize }
							hideCancelButton={ true }
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
				</PanelBody>
			</InspectorControls> */ }
			{ noticeUI }
			<Gallery
				{ ...props }
				images={ images }
				mediaPlaceholder={ mediaPlaceholder }
				blockProps={ blockProps }
				insertBlocksAfter={ insertBlocksAfter }
			/>
		</>
	);
}
export default compose( [
	withNotices,
	withViewportMatch( { isNarrow: '< small' } ),
] )( GalleryEdit );

// const GalleryMasonryEdit = ( props ) => {
// 	const {
// 		attributes,
// 		setAttributes,
// 		wideControlsEnabled,
// 		isSelected,
// 		className,
// 		editorSidebarOpened,
// 		noticeUI,
// 		pluginSidebarOpened,
// 		publishSidebarOpened,
// 	} = props;

// 	const {
// 		align,
// 		animation,
// 		captions,
// 		gridSize,
// 		linkTo,
// 		lightbox,
// 		images,
// 	} = attributes;

// 	const [ selectedImage, setSelectedImage ] = useState( null );

// 	const prevIsSelected = usePrevious( isSelected );

// 	const hasImages = !! images.length;

// 	const sidebarIsOpened = editorSidebarOpened || pluginSidebarOpened || publishSidebarOpened;

// 	useEffect( () => {
// 		if ( typeof align !== 'undefined' && typeof gridSize !== 'undefined' ) {
// 			if ( wideControlsEnabled === true && ! align && gridSize === 'xlrg' ) {
// 				setAttributes( {
// 					align: 'wide',
// 					gridSize: 'lrg',
// 				} );
// 			}
// 		}
// 	}, [ gridSize, align, wideControlsEnabled ] );

// 	useEffect( () => {
// 		// Deselect images when deselecting the block.
// 		if ( ! isSelected && prevIsSelected ) {
// 			setSelectedImage( null );
// 		}
// 	}, [ prevIsSelected, isSelected ] );

// 	const onSelectImage = ( index ) => {
// 		return () => {
// 			if ( selectedImage !== index ) {
// 				setSelectedImage( index );
// 			}
// 		};
// 	};

// 	const onMove = ( oldIndex, newIndex ) => {
// 		const newImages = [ ...attributes.images ];
// 		newImages.splice( newIndex, 1, attributes.images[ oldIndex ] );
// 		newImages.splice( oldIndex, 1, attributes.images[ newIndex ] );
// 		setSelectedImage( newIndex );
// 		setAttributes( { images: newImages } );
// 	};

// 	const onMoveForward = ( oldIndex ) => {
// 		const imageCount = attributes.images.length;
// 		return () => {
// 			if ( oldIndex === imageCount - 1 ) {
// 				return;
// 			}
// 			const calculatedIndex = Math.floor( imageCount / 3 ) + 1;
// 			console.log( calculatedIndex );

// 			if ( oldIndex + calculatedIndex >= imageCount ) {
// 				onMove( oldIndex, imageCount - 1 );
// 				return;
// 			}

// 			onMove( oldIndex, oldIndex + calculatedIndex );
// 		};
// 	};

// 	const onMoveBackward = ( oldIndex ) => {
// 		const imageCount = attributes.images.length;
// 		return () => {
// 			if ( oldIndex === 0 ) {
// 				return;
// 			}
// 			const calculatedIndex = Math.floor( imageCount / 3 ) + 1;
// 			console.log( calculatedIndex );

// 			if ( oldIndex - calculatedIndex <= 0 ) {
// 				onMove( oldIndex, 0 );
// 				return;
// 			}

// 			onMove( oldIndex, oldIndex - calculatedIndex );
// 		};
// 	};

// 	const onRemoveImage = ( index ) => {
// 		return () => {
// 			const newImages = filter( attributes.images, ( _img, i ) => index !== i );
// 			setSelectedImage( null );
// 			setAttributes( {
// 				images: newImages,
// 			} );
// 		};
// 	};

// 	/**
// 	 * replaceImage is passed to GalleryImage component and is used to replace images
// 	 *
// 	 * @param {number} index Index of image to remove.
// 	 * @param {Object} media Media object used to initialize attributes.
// 	 */
// 	const replaceImage = ( index, media ) => {
// 		const newImages = [ ...attributes.images ];
// 		newImages[ index ] = { ...media };

// 		setAttributes( { images: newImages } );
// 	};

// 	const setImageAttributes = ( index, newAttributes ) => {
// 		if ( ! images[ index ] ) {
// 			return;
// 		}
// 		setAttributes( {
// 			images: [
// 				...images.slice( 0, index ),
// 				{
// 					...images[ index ],
// 					...newAttributes,
// 				},
// 				...images.slice( index + 1 ),
// 			],
// 		} );
// 	};

// 	const masonryGalleryPlaceholder = (
// 		<>
// 			{ ! hasImages ? noticeUI : null }
// 			<GalleryPlaceholder
// 				{ ...props }
// 				label={ __( 'Masonry', 'coblocks' ) }
// 				icon={ <Icon icon={ icon } /> }
// 			/>
// 		</>
// 	);

// 	if ( ! hasImages ) {
// 		return masonryGalleryPlaceholder;
// 	}

// 	const innerClasses = classnames(
// 		...GalleryClasses( attributes ),
// 		sidebarIsOpened, {
// 			[ `align${ align }` ]: align,
// 			'has-lightbox': lightbox,
// 		}
// 	);

// 	const masonryClasses = classnames(
// 		'masonry',
// 		`has-grid-${ gridSize }`
// 	);

// 	const itemClasses = classnames(
// 		'brick',
// 		'coblocks-gallery--item', {
// 			[ `coblocks-animate ${ animation }` ]: animation,
// 		}
// 	);

// 	return (
// 		<>
// 			{ isSelected &&
// 				<Controls
// 					{ ...props }
// 				/>
// 			}
// 			{ isSelected &&
// 				<Inspector
// 					{ ...props }
// 				/>
// 			}
// 			{ noticeUI }
// 			<div className={ className }>
// 				<div className={ innerClasses }>
// 					<GutterWrapper { ...attributes }>

// 						<div className={ masonryClasses }>
// 							{ images.map( ( img, index ) => {
// 								const ariaLabel = sprintf(
// 								/* translators: %1$d is the order number of the image, %2$d is the total number of images */
// 									__( 'image %1$d of %2$d in gallery', 'coblocks' ),
// 									( index + 1 ),
// 									images.length
// 								);
// 								return (
// 									<div key={ img.id || img.url } className={ itemClasses }>
// 										<GalleryImage
// 											url={ img.url }
// 											alt={ img.alt }
// 											id={ img.id }
// 											imgLink={ img.imgLink }
// 											linkTo={ linkTo }
// 											isFirstItem={ index === 0 }
// 											isLastItem={ ( index + 1 ) === images.length }
// 											isSelected={ isSelected && selectedImage === index }
// 											onMoveBackward={ onMoveBackward( index ) }
// 											onMoveForward={ onMoveForward( index ) }
// 											onRemove={ onRemoveImage( index ) }
// 											onSelect={ onSelectImage( index ) }
// 											setAttributes={ ( attrs ) => setImageAttributes( index, attrs ) }
// 											caption={ img.caption }
// 											aria-label={ ariaLabel }
// 											captions={ captions }
// 											supportsCaption={ true }
// 											imageIndex={ index }
// 											replaceImage={ replaceImage }
// 										/>
// 									</div>
// 								);
// 							} ) }
// 						</div>
// 					</GutterWrapper>
// 				</div>
// 				{ masonryGalleryPlaceholder }
// 			</div>
// 		</>
// 	);
// };

// export default compose( [
// 	withSelect( ( select ) => ( {
// 		editorSidebarOpened: select( 'core/edit-post' ).isEditorSidebarOpened(),
// 		pluginSidebarOpened: select( 'core/edit-post' ).isPluginSidebarOpened(),
// 		publishSidebarOpened: select( 'core/edit-post' ).isPublishSidebarOpened(),
// 		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
// 	} ) ),
// 	withNotices,
// ] )( GalleryMasonryEdit );
