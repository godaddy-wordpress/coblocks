/**
 * External dependencies
 */
import classnames from 'classnames';
import filter from 'lodash/filter';
import { GalleryStackedIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import GalleryImage from '../../components/block-gallery/gallery-image';
import GalleryPlaceholder from '../../components/block-gallery/gallery-placeholder';
import { GalleryClasses } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withNotices, Icon } from '@wordpress/components';
import { withFontSizes } from '@wordpress/block-editor';

const GalleryStackedEdit = ( props ) => {
	const {
		attributes,
		className,
		fontSize,
		isSelected,
		noticeUI,
		setAttributes,
	} = props;

	const {
		align,
		animation,
		captions,
		fullwidth,
		gutter,
		gutterMobile,
		images,
		shadow,
		linkTo,
		lightbox,
	} = attributes;

	const [ selectedImage, setSelectedImage ] = useState( null );

	useEffect( () => {
		// This block does not support caption style.
		if ( typeof attributes.captionStyle !== 'undefined' ) {
			setAttributes( { captionStyle: undefined } );
		}
	}, [] );

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

	const stackedGalleryPlaceholder = (
		<>
			{ ! hasImages ? noticeUI : null }
			<GalleryPlaceholder
				{ ...props }
				label={ __( 'Stacked', 'coblocks' ) }
				icon={ <Icon icon={ icon } /> }
				gutter={ gutter }
			/>
		</> );

	if ( ! hasImages ) {
		return stackedGalleryPlaceholder;
	}

	const classes = classnames(
		className, {
			'has-lightbox': lightbox,
		}
	);

	const innerClasses = classnames(
		...GalleryClasses( attributes ), {
			'has-fullwidth-images': fullwidth,
			[ `align${ align }` ]: align,
			'has-margin': gutter > 0,
			'has-lightbox': lightbox,
			[ `has-margin-bottom-${ gutter }` ]: gutter > 0,
			[ `has-margin-bottom-mobile-${ gutterMobile }` ]: gutterMobile > 0,
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
			<Controls
				{ ...props }
			/>
			}
			{ isSelected &&
			<Inspector
				{ ...props }
			/>
			}
			{ noticeUI }
			<div className={ classes }>
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
									url={ img.url }
									alt={ img.alt }
									id={ img.id }
									imgLink={ img.imgLink }
									linkTo={ linkTo }
									gutter={ gutter }
									gutterMobile={ gutterMobile }
									marginBottom={ true }
									shadow={ shadow }
									isFirstItem={ index === 0 }
									isLastItem={ ( index + 1 ) === images.length }
									isSelected={ isSelected && selectedImage === index }
									onMoveBackward={ onMoveBackward( index ) }
									onMoveForward={ onMoveForward( index ) }
									onRemove={ onRemoveImage( index ) }
									onSelect={ onSelectImage( index ) }
									setAttributes={ ( attrs ) => setImageAttributes( index, attrs ) }
									caption={ img.caption }
									aria-label={ ariaLabel }
									captions={ captions }
									supportsCaption={ true }
									verticalMoving={ true }
									fontSize={ fontSize.size }
									imageIndex={ index }
									replaceImage={ replaceImage }
								/>
							</li>
						);
					} ) }
					{ stackedGalleryPlaceholder }
				</ul>
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
	withFontSizes( 'fontSize' ),
	withNotices,
] )( GalleryStackedEdit );
