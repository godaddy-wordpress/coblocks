/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Controls from './controls';
import * as helper from './../../utils/helper';
import GutterWrapper from '../../components/gutter-control/gutter-wrapper';
import GalleryDropZone from '../../components/block-gallery/gallery-dropzone';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { Button, ButtonGroup, Dashicon, DropZone, Spinner, withNotices } from '@wordpress/components';
import { MediaPlaceholder, MediaUpload, MediaUploadCheck, RichText, URLInput } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { isBlobURL } from '@wordpress/blob';
import { closeSmall } from '@wordpress/icons';

const GalleryCollageEdit = ( props ) => {
	const {
		attributes,
		className,
		isSelected,
		noticeUI,
		setAttributes,
	} = props;

	const [ selectedImage, setSelectedImage ] = useState( null );
	const [ lastGutterValue, setLastGutterValue ] = useState( null );
	const [ isSaved, setIsSaved ] = useState( false );

	const prevClassName = usePrevious( className );
	const prevIsSelected = usePrevious( isSelected );

	useEffect( () => {
		if ( className !== prevClassName ) {
			if ( className.includes( 'is-style-layered' ) ) {
				setLastGutterValue( attributes.gutter );
				setAttributes( { gutter: 'small' } );
			} else {
				setLastGutterValue( null );
				setAttributes( { shadow: 'none', gutter: lastGutterValue || attributes.gutter } );
			}
		}
	}, [ className, prevClassName ] );

	useEffect( () => {
		if ( isSelected !== prevIsSelected && isSelected === false ) {
			setSelectedImage( null );
		}
	}, [ isSelected, prevIsSelected ] );

	const getPlaceholderCount = () => {
		return [ 'is-style-tiled', 'is-style-layered' ].includes( attributes.className ) ? 4 : 5;
	};

	const getImageAtIndex = ( index ) => {
		return attributes.images.find( ( image ) => parseInt( image.index ) === parseInt( index ) );
	};

	const onSelectImage = ( index ) => {
		if ( selectedImage !== index ) {
			setSelectedImage( index );
		}
	};

	const uploadImage = ( files, index ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ image ] ) => replaceImage( image, index ),
			onError: onUploadError,
		} );
	};

	const onUploadError = ( message ) => {
		const { noticeOperations } = props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const replaceImage = ( image, index ) => {
		const images = [
			...attributes.images.filter( ( img ) => parseInt( img.index ) !== parseInt( index ) ),
			{ ...helper.pickRelevantMediaFiles( image ), index },
		];
		setAttributes( { images } );
	};

	const removeImage = ( index ) => {
		const images = [
			...attributes.images.filter( ( image ) => parseInt( image.index ) !== parseInt( index ) ),
		];
		setAttributes( { images } );
	};

	const updateImageAttributes = ( index, newAttributes ) => {
		const image = getImageAtIndex( index );

		const images = [
			...attributes.images.filter( ( img ) => parseInt( img.index ) !== parseInt( index ) ),
			Object.assign( {}, image, newAttributes ),
		];

		setAttributes( { images } );
	};

	const saveCustomLink = () => {
		setIsSaved( true );
	};

	const renderImage = ( index ) => {
		const image = getImageAtIndex( index );
		const isImageSelected = isSelected && selectedImage === image.index;
		const enableCaptions = ! className.includes( 'is-style-layered' );

		const dropZone = (
			<DropZone
				label={ __( 'Drop image to replace', 'coblocks' ) }
				onFilesDrop={ ( files ) => uploadImage( files, index ) }
			/>
		);

		return (
			<>
				{ /* // Disable reason: Image itself is not meant to be interactive, but should
						direct image selection and unfocus caption fields. */ }
				{ /* eslint-disable jsx-a11y/click-events-have-key-events  */ }
				{ /* eslint-disable jsx-a11y/anchor-is-valid  */ }
				<a onClick={ () => onSelectImage( image.index ) } role="button" tabIndex="0">
					<figure
						className={ classnames( {
							'wp-block-coblocks-gallery-collage__figure': true,
							'is-transient': isBlobURL( image.url ),
							'is-selected': isImageSelected,
							[ `shadow-${ attributes.shadow }` ]: attributes.shadow,
						} ) }>
						{ isImageSelected && (
							<>
								<ButtonGroup className="block-library-gallery-item__inline-menu is-right is-visible">
									<MediaUploadCheck>
										<MediaUpload
											allowedTypes={ [ 'image' ] }
											onSelect={ ( img ) => replaceImage( img, index ) }
											render={ ( { open } ) => (
												<Button
													className="coblocks-gallery-item__button-replace"
													label={ __( 'Replace Image', 'coblocks' ) }
													onClick={ open }
												>
													{ __( 'Replace', 'coblocks' ) }
												</Button>
											) }
											value={ image.url }
										>
										</MediaUpload>
									</MediaUploadCheck>

									<Button
										disabled={ ! isImageSelected }
										icon={ closeSmall }
										label={ __( 'Remove image', 'coblocks' ) }
										onClick={ () => removeImage( index ) }
									/>
								</ButtonGroup>
							</>
						) }
						{ selectedImage === image.index && attributes.linkTo === 'custom' &&
							<form
								className="components-coblocks-gallery-item__image-link"
								onSubmit={ ( event ) => event.preventDefault() }>
								<Dashicon icon="admin-links" />
								<URLInput
									onChange={ ( imgLink ) => updateImageAttributes( index, { imgLink } ) }
									value={ image.imgLink }
								/>
								<Button icon={ isSaved ? 'saved' : 'editor-break' } label={ isSaved ? __( 'Saving', 'coblocks' ) : __( 'Apply', 'coblocks' ) } onClick={ saveCustomLink } type="submit" />
							</form>
						}
						{ dropZone }
						{ isBlobURL( image.url ) && <Spinner /> }
						<img alt={ image.alt } src={ image.url } />
						{ enableCaptions && attributes.captions && ( image.caption || isImageSelected ) &&
							<RichText
								className="coblocks-gallery--caption"
								inlineToolbar
								isSelected={ isImageSelected }
								onChange={ ( caption ) => updateImageAttributes( index, { caption } ) }
								placeholder={ __( 'Write caption…', 'coblocks' ) }
								tagName="figcaption"
								value={ image.caption }
							/>
						}
					</figure>
				</a>
				{ /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */ }
				{ /* eslint-enable jsx-a11y/click-events-have-key-events  */ }
			</>
		);
	};

	const renderPlaceholder = ( index ) => {
		const image = getImageAtIndex( index );
		const hasImage = !! image;

		const classNames = classnames( 'wp-block-coblocks-gallery-collage__figure', {
			[ `shadow-${ attributes.shadow }` ]: attributes.shadow,
		} );

		return (
			<MediaPlaceholder
				accept="image/*"
				addToGallery={ true }
				allowedTypes={ [ 'image' ] }
				className={ classNames }
				disableDropZone={ true }
				disableMediaButtons={ hasImage }
				icon={ false }
				labels={ {
					title: ' ',
					instructions: ' ',
				} }
				multiple={ false }
				onError={ onUploadError }
				onSelect={ ( img ) => replaceImage( img, index ) }
			>
				<GalleryDropZone
					{ ...props }
					label="Drop file to upload"
					onSelect={ ( [ img ] ) => replaceImage( img, index ) }
				/>
			</MediaPlaceholder>
		);
	};

	const {
		animation,
		captions,
		captionStyle,
		filter,
		lightbox,
	} = attributes;

	const enableGutter = ! className.includes( 'is-style-layered' );
	const enableCaptions = ! className.includes( 'is-style-layered' );

	const images = [];

	for ( let imageIndex = 0; imageIndex < getPlaceholderCount(); imageIndex++ ) {
		const image = getImageAtIndex( imageIndex );

		images.push(
			<li
				className={ classnames(
					'wp-block-coblocks-gallery-collage__item',
					`item-${ imageIndex + 1 }`,
					{
						[ `coblocks-animate ${ animation }` ]: animation,
						'is-selected': imageIndex === parseInt( selectedImage ),
					}
				) }
				key={ `image-${ imageIndex }` }
			>
				{ !! image
					? renderImage( imageIndex )
					: renderPlaceholder( imageIndex )
				}
			</li>
		);
	}

	return (
		<>
			<Controls { ...props } />
			<Inspector { ...props } enableCaptions={ enableCaptions } enableGutter={ enableGutter } />
			{ noticeUI }
			<GutterWrapper { ...attributes }>
				<div className={ classnames( className, {
					[ `has-filter-${ filter }` ]: filter !== 'none',
					[ `has-caption-style-${ captionStyle }` ]: captions && captionStyle !== undefined,
					'has-lightbox': lightbox,
				} ) }>
					<ul>
						{ images }
					</ul>
				</div>
			</GutterWrapper>
		</>
	);
};

export default compose( [ withNotices ] )( GalleryCollageEdit );
