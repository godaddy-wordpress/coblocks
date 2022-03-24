/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';
import { GalleryOffsetIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import GalleryImage from '../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import Inspector from './inspector';
import Controls from './controls';
import { GalleryClasses } from '../../components/block-gallery/shared';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { Icon, withNotices } from '@wordpress/components';

/**
 * Block edit function
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
	const {
		isSelected,
		wideControlsEnabled,
		attributes,
		setAttributes,
		className,
		noticeUI,
	} = props;

	const {
		animation,
		captions,
		linkTo,
		lightbox,
		gridSize,
	} = attributes;

	const [ selectedImage, setSelectedImage ] = useState( null );

	const prevIsSelected = usePrevious( isSelected );

	useEffect( () => {
		// Deselect images when deselecting the block
		if ( ! isSelected && prevIsSelected ) {
			setSelectedImage( null );
		}

		if ( wideControlsEnabled === true && typeof attributes.align === 'undefined' ) {
			setAttributes( { align: 'wide' } );
		}
	}, [ wideControlsEnabled, isSelected, prevIsSelected, attributes.align ] );

	/**
	 * onMoveForward
	 *
	 * @param {number} oldIndex
	 * @param {number} newIndex
	 */
	const onMove = ( oldIndex, newIndex ) => {
		const images = [ ...attributes.images ];
		images.splice( newIndex, 1, attributes.images[ oldIndex ] );
		images.splice( oldIndex, 1, attributes.images[ newIndex ] );
		setSelectedImage( newIndex );
		setAttributes( { images } );
	};

	/**
	 * onMoveForward
	 *
	 * @param {number} oldIndex
	 */
	const onMoveForward = ( oldIndex ) => {
		return () => {
			if ( oldIndex === attributes.images.length - 1 ) {
				return;
			}
			onMove( oldIndex, oldIndex + 1 );
		};
	};

	/**
	 * onMoveBackward
	 *
	 * @param {number} oldIndex
	 */
	const onMoveBackward = ( oldIndex ) => {
		return () => {
			if ( oldIndex === 0 ) {
				return;
			}
			onMove( oldIndex, oldIndex - 1 );
		};
	};

	/**
	 * onSelectImage
	 *
	 * @param {number} index
	 */
	const onSelectImage = ( index ) => {
		return () => {
			if ( selectedImage !== index ) {
				setSelectedImage( index );
			}
		};
	};

	/**
	 * onRemoveImage
	 *
	 * @param {number} index
	 */
	const onRemoveImage = ( index ) => {
		return () => {
			const images = filter( attributes.images, ( img, i ) => index !== i );
			setSelectedImage( null );
			setAttributes( {
				images,
			} );
		};
	};

	/**
	 * setImageAttributes
	 *
	 * @param {number} index
	 * @param {Object} newAttributes
	 */
	const setImageAttributes = ( index, newAttributes ) => {
		if ( ! attributes.images[ index ] ) {
			return;
		}
		setAttributes( {
			images: [
				...attributes.images.slice( 0, index ),
				{
					...attributes.images[ index ],
					...newAttributes,
				},
				...attributes.images.slice( index + 1 ),
			],
		} );
	};

	/**
	 * replaceImage is passed to GalleryImage component and is used to replace images
	 *
	 * @param {number} index Index of image to remove.
	 * @param {Object} media Media object used to initialize attributes.
	 */
	const replaceImage = ( index, media ) => {
		const images = [ ...attributes.images ];
		images[ index ] = { ...media };

		setAttributes( { images } );
	};

	const hasImages = !! attributes.images.length;

	const offsetGalleryPlaceholder = (
		<>
			{ ! hasImages ? noticeUI : null }
			<GalleryPlaceholder
				{ ...props }
				icon={ <Icon icon={ icon } /> }
				label={ __( 'Offset', 'coblocks' ) }
			/>
		</>
	);

	if ( ! hasImages ) {
		return offsetGalleryPlaceholder;
	}

	const wrapperClasses = classnames(
		className, {
			'has-lightbox': lightbox,
		}
	);

	const innerClasses = classnames(
		...GalleryClasses( attributes ), {
			[ `has-${ gridSize }-images` ]: gridSize,
		}
	);

	const itemClasses = classnames(
		'coblocks-gallery--item', {
			[ `coblocks-animate ${ animation }` ]: animation,
		}
	);

	return (
		<>
			<Controls { ...props } />
			<Inspector
				{ ...props }
			/>
			{ noticeUI }
			<div className={ wrapperClasses }>
				<GutterWrapper { ...attributes }>
					<ul className={ innerClasses }>
						{ attributes.images.map( ( img, index ) => {
							const ariaLabel = sprintf(
								/* translators: %1$d is the order number of the image, %2$d is the total number of images */
								__( 'image %1$d of %2$d in gallery', 'coblocks' ),
								( index + 1 ),
								attributes.images.length
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
										isLastItem={ ( index + 1 ) === attributes.images.length }
										isSelected={ isSelected && selectedImage === index }
										linkTo={ linkTo }
										newClass="wp-block-coblocks-gallery-offset__figure"
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
					</ul>
				</GutterWrapper>
				{ offsetGalleryPlaceholder }
			</div>
		</>
	);
};

export default compose( [
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
	withNotices,
] )( Edit );
