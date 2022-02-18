/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';
import { GalleryStackedIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import Controls from './controls';
import { GalleryClasses } from '../../components/block-gallery/shared';
import GalleryImage from '../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';
import { __, sprintf } from '@wordpress/i18n';
import { compose, usePrevious } from '@wordpress/compose';
import { Icon, withNotices } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

const GalleryStackedEdit = ( props ) => {
	const {
		attributes,
		isSelected,
		noticeUI,
		setAttributes,
	} = props;

	const {
		align,
		animation,
		captions,
		fullwidth,
		images,
		shadow,
		linkTo,
		lightbox,
	} = attributes;

	const [ selectedImage, setSelectedImage ] = useState( null );

	const prevSelected = usePrevious( isSelected );

	useEffect( () => {
		// Deselect images when deselecting the block
		if ( ! isSelected && prevSelected ) {
			setSelectedImage( null );
		}
	}, [ isSelected ] );

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
			const filteredImages = filter( attributes.images, ( _img, i ) => index !== i );
			setSelectedImage( null );
			setAttributes( {
				images: filteredImages,
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

		setAttributes( {
			images: newImages,
		} );
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

	const hasImages = !! images.length;
	const blockProps = useBlockProps( { className: classnames( { 'has-lightbox': lightbox } ) } );

	// The placeholder should use the block props when no images are present.
	const placeHolderBlockProps = ! hasImages ? blockProps : null;
	const stackedGalleryPlaceholder = (
		<View { ...placeHolderBlockProps }>
			{ ! hasImages ? noticeUI : null }
			<GalleryPlaceholder
				{ ...props }
				icon={ <Icon icon={ icon } /> }
				label={ __( 'Stacked', 'coblocks' ) }
			/>
		</View> );

	if ( ! hasImages ) {
		return stackedGalleryPlaceholder;
	}

	const innerClasses = classnames(
		...GalleryClasses( attributes ), {
			'has-fullwidth-images': fullwidth,
			[ `align${ align }` ]: align,
			'has-lightbox': lightbox,
		}
	);

	const itemClasses = classnames(
		'coblocks-gallery--item', {
			[ `coblocks-animate ${ animation }` ]: animation,
		}
	);

	return (
		<>
			{ isSelected &&
				<>
					<Controls { ...props } />
					<Inspector { ...props } />
				</>
			}
			{ noticeUI }
			<div { ...blockProps }>
				<GutterWrapper { ...attributes }>
					<ul className={ innerClasses }>
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
										marginBottom={ true }
										onMoveBackward={ onMoveBackward( index ) }
										onMoveForward={ onMoveForward( index ) }
										onRemove={ onRemoveImage( index ) }
										onSelect={ onSelectImage( index ) }
										replaceImage={ replaceImage }
										setAttributes={ ( attrs ) => setImageAttributes( index, attrs ) }
										shadow={ shadow }
										supportsCaption={ true }
										url={ img.url }
										verticalMoving={ true }
									/>
								</li>
							);
						} ) }
						{ stackedGalleryPlaceholder }
					</ul>
				</GutterWrapper>
			</div>
		</>
	);
};

export default compose( [
	withNotices,
] )( GalleryStackedEdit );
