/* eslint-disable sort-keys */
/* eslint-disable sort-imports */
// Disable reason: V1 files do not require updating.
/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';
import Masonry from 'react-masonry-component';
import { GalleryMasonryIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import GalleryImage from '../../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../../components/block-gallery/gallery-placeholder';
import { GalleryClasses } from '../../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { Icon, withNotices } from '@wordpress/components';

/**
 * Block consts
 */
const masonryOptions = {
	transitionDuration: 0,
	percentPosition: true,
};

const GalleryMasonryEdit = ( props ) => {
	const {
		attributes,
		setAttributes,
		wideControlsEnabled,
		isSelected,
		className,
		editorSidebarOpened,
		noticeUI,
		pluginSidebarOpened,
		publishSidebarOpened,
	} = props;

	const {
		align,
		animation,
		captions,
		gridSize,
		gutter,
		gutterMobile,
		linkTo,
		lightbox,
		images,
	} = attributes;

	const [ selectedImage, setSelectedImage ] = useState( null );

	const prevIsSelected = usePrevious( isSelected );

	const hasImages = !! images.length;

	const sidebarIsOpened = editorSidebarOpened || pluginSidebarOpened || publishSidebarOpened;

	useEffect( () => {
		if ( typeof align !== 'undefined' && typeof gridSize !== 'undefined' ) {
			if ( wideControlsEnabled === true && ! align && gridSize === 'xlrg' ) {
				setAttributes( {
					align: 'wide',
					gridSize: 'lrg',
				} );
			}
		}
	}, [ gridSize, align, wideControlsEnabled ] );

	useEffect( () => {
		// Deselect images when deselecting the block.
		if ( ! isSelected && prevIsSelected ) {
			setSelectedImage( null );
		}
	}, [ prevIsSelected, isSelected ] );

	const onSelectImage = ( index ) => {
		return () => {
			if ( selectedImage !== index ) {
				setSelectedImage( index );
			}
		};
	};

	const onMove = ( oldIndex, newIndex ) => {
		const newImages = [ ...attributes.images ];
		newImages.splice( newIndex, 1, attributes.images[ oldIndex ] );
		newImages.splice( oldIndex, 1, attributes.images[ newIndex ] );
		setSelectedImage( newIndex );
		setAttributes( { images: newImages } );
	};

	const onMoveForward = ( oldIndex ) => {
		return () => {
			if ( oldIndex === attributes.images.length - 1 ) {
				return;
			}
			onMove( oldIndex, oldIndex + 1 );
		};
	};

	const onMoveBackward = ( oldIndex ) => {
		return () => {
			if ( oldIndex === 0 ) {
				return;
			}
			onMove( oldIndex, oldIndex - 1 );
		};
	};

	const onRemoveImage = ( index ) => {
		return () => {
			const newImages = filter( attributes.images, ( _img, i ) => index !== i );
			setSelectedImage( null );
			setAttributes( {
				images: newImages,
			} );
		};
	};

	/**
	 * replaceImage is passed to GalleryImage component and is used to replace images
	 *
	 * @param {number} index Index of image to remove.
	 * @param {Object} media Media object used to initialize attributes.
	 */
	const replaceImage = ( index, media ) => {
		const newImages = [ ...attributes.images ];
		newImages[ index ] = { ...media };

		setAttributes( { images: newImages } );
	};

	const setImageAttributes = ( index, newAttributes ) => {
		if ( ! images[ index ] ) {
			return;
		}
		setAttributes( {
			images: [
				...images.slice( 0, index ),
				{
					...images[ index ],
					...newAttributes,
				},
				...images.slice( index + 1 ),
			],
		} );
	};

	const masonryGalleryPlaceholder = (
		<>
			{ ! hasImages ? noticeUI : null }
			<GalleryPlaceholder
				{ ...props }
				gutter={ gutter }
				icon={ <Icon icon={ icon } /> }
				label={ __( 'Masonry', 'coblocks' ) }
			/>
		</>
	);

	if ( ! hasImages ) {
		return masonryGalleryPlaceholder;
	}

	const innerClasses = classnames(
		...GalleryClasses( attributes ),
		sidebarIsOpened, {
			[ `align${ align }` ]: align,
			'has-gutter': gutter > 0,
			'has-lightbox': lightbox,
		}
	);

	const masonryClasses = classnames(
		`has-grid-${ gridSize }`, {
			[ `has-gutter-${ gutter }` ]: gutter > 0,
			[ `has-gutter-mobile-${ gutterMobile }` ]: gutterMobile > 0,
		}
	);

	const itemClasses = classnames(
		'coblocks-gallery--item', {
			[ `coblocks-animate ${ animation }` ]: animation,
		}
	);

	return (
		<>
			{ isSelected &&	<Controls { ...props } /> }
			{ isSelected && <Inspector { ...props } /> }
			{ noticeUI }
			<div className={ className }>
				<div className={ innerClasses }>
					<Masonry
						className={ masonryClasses }
						disableImagesLoaded={ false }
						elementType={ 'ul' }
						options={ masonryOptions }
						updateOnEachImageLoad={ false }
					>
						{ images.map( ( img, index ) => {
							const ariaLabel = sprintf(
								/* translators: %1$d is the order number of the image, %2$d is the total number of images */
								__( 'image %1$d of %2$d in gallery', 'coblocks' ),
								( index + 1 ),
								images.length
							);

							return (
								<li className={ itemClasses } key={ img.id || img.url }>
									<GalleryImage
										alt={ img.alt }
										aria-label={ ariaLabel }
										caption={ img.caption }
										captions={ captions }
										id={ img.id }
										imageIndex={ index }
										imgLink={ img.imgLink }
										isFirstItem={ index === 0 }
										isLastItem={ ( index + 1 ) === images.length }
										isSelected={ isSelected && selectedImage === index }
										linkTo={ linkTo }
										onMoveBackward={ onMoveBackward( index ) }
										onMoveForward={ onMoveForward( index ) }
										onRemove={ onRemoveImage( index ) }
										onSelect={ onSelectImage( index ) }
										replaceImage={ replaceImage }
										setAttributes={ ( attrs ) => setImageAttributes( index, attrs ) }
										supportsCaption={ true }
										url={ img.url }
									/>
								</li>
							);
						} ) }
					</Masonry>
				</div>
				{ masonryGalleryPlaceholder }
			</div>
		</>
	);
};

export default compose( [
	withSelect( ( select ) => ( {
		editorSidebarOpened: select( 'core/edit-post' ).isEditorSidebarOpened(),
		pluginSidebarOpened: select( 'core/edit-post' ).isPluginSidebarOpened(),
		publishSidebarOpened: select( 'core/edit-post' ).isPublishSidebarOpened(),
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withNotices,
] )( GalleryMasonryEdit );
