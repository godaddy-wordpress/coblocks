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
import { useState, useEffect } from '@wordpress/element';
import { compose, usePrevious } from '@wordpress/compose';
import { withNotices, DropZone, Spinner, Button, Dashicon, ButtonGroup } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, MediaPlaceholder, RichText, URLInput } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { isBlobURL } from '@wordpress/blob';
import { closeSmall } from '@wordpress/icons';

const GalleryCollageEdit = ( props ) => {
	const [ selectedImage, setSelectedImage ] = useState( null );
	const [ lastGutterValue, setLastGutterValue ] = useState( null );
	const [ isSaved, setIsSaved ] = useState( false );

	const prevClassName = usePrevious( props.className );
	const prevIsSelected = usePrevious( props.isSelected );

	useEffect( () => {
		if ( props.className !== prevClassName ) {
			if ( props.className.includes( 'is-style-layered' ) ) {
				setLastGutterValue( props.attributes.gutter );
				props.setAttributes( { gutter: 'small' } );
			} else {
				setLastGutterValue( null );
				props.setAttributes( { shadow: 'none', gutter: lastGutterValue || attributes.gutter } );
			}
		}
	}, [ props.className, prevClassName ] );

	useEffect( () => {
		if ( props.isSelected !== prevIsSelected && props.isSelected === false ) {
			setSelectedImage( null );
		}
	}, [ props.isSelected, prevIsSelected ] );

	const getPlaceholderCount = () => {
		return [ 'is-style-tiled', 'is-style-layered' ].includes( props.attributes.className ) ? 4 : 5;
	};

	const getImageAtIndex = ( index ) => {
		const { attributes } = props;
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
		const { attributes, setAttributes } = props;

		const images = [
			...attributes.images.filter( ( img ) => parseInt( img.index ) !== parseInt( index ) ),
			{ ...helper.pickRelevantMediaFiles( image ), index },
		];
		setAttributes( { images } );
	};

	const removeImage = ( index ) => {
		const { attributes, setAttributes } = props;

		const images = [
			...attributes.images.filter( ( image ) => parseInt( image.index ) !== parseInt( index ) ),
		];
		setAttributes( { images } );
	};

	const updateImageAttributes = ( index, newAttributes ) => {
		const { attributes, setAttributes } = props;
		const image = getImageAtIndex( index );

		const images = [
			...attributes.images.filter( ( img ) => parseInt( img.index ) !== parseInt( index ) ),
			Object.assign( {}, image, newAttributes ),
		];

		console.log('new images', images);

		setAttributes( { images } );
	};

	const saveCustomLink = () => {
		setIsSaved( true );
	};

	const renderImage = ( index ) => {
		const image = getImageAtIndex( index );
		const isSelected = props.isSelected && selectedImage === image.index;
		const enableCaptions = ! props.className.includes( 'is-style-layered' );

		const dropZone = (
			<DropZone
				onFilesDrop={ ( files ) => uploadImage( files, index ) }
				label={ __( 'Drop image to replace', 'coblocks' ) }
			/>
		);

		return (
			<>
				{ /* // Disable reason: Image itself is not meant to be interactive, but should
						direct image selection and unfocus caption fields. */ }
				{ /* eslint-disable jsx-a11y/click-events-have-key-events  */ }
				{ /* eslint-disable jsx-a11y/anchor-is-valid  */ }
				<a role="button" tabIndex="0" onClick={ () => onSelectImage( image.index ) }>
					<figure
						className={ classnames( {
							'wp-block-coblocks-gallery-collage__figure': true,
							'is-transient': isBlobURL( image.url ),
							'is-selected': isSelected,
							[ `shadow-${ props.attributes.shadow }` ]: props.attributes.shadow,
						} ) }>
						{ isSelected && (
							<>
								<ButtonGroup className="block-library-gallery-item__inline-menu is-right is-visible">
									<MediaUploadCheck>
										<MediaUpload
											allowedTypes={ [ 'image' ] }
											onSelect={ ( img ) => replaceImage( img, index ) }
											value={ image.url }
											render={ ( { open } ) => (
												<Button
													className="coblocks-gallery-item__button-replace"
													onClick={ open }
													label={ __( 'Replace Image', 'coblocks' ) }
												>
													{ __( 'Replace', 'coblocks' ) }
												</Button>
											) }
										>
										</MediaUpload>
									</MediaUploadCheck>

									<Button
										icon={ closeSmall }
										onClick={ () => removeImage( index ) }
										label={ __( 'Remove image', 'coblocks' ) }
										disabled={ ! isSelected }
									/>
								</ButtonGroup>
							</>
						) }
						{ selectedImage === image.index && props.attributes.linkTo === 'custom' &&
							<form
								className="components-coblocks-gallery-item__image-link"
								onSubmit={ ( event ) => event.preventDefault() }>
								<Dashicon icon="admin-links" />
								<URLInput
									value={ image.imgLink }
									onChange={ ( imgLink ) => updateImageAttributes( index, { imgLink } ) }
								/>
								<Button icon={ isSaved ? 'saved' : 'editor-break' } label={ isSaved ? __( 'Saving', 'coblocks' ) : __( 'Apply', 'coblocks' ) } onClick={ saveCustomLink } type="submit" />
							</form>
						}
						{ dropZone }
						{ isBlobURL( image.url ) && <Spinner /> }
						<img src={ image.url } alt={ image.alt } />
						{ enableCaptions && props.attributes.captions && ( image.caption || isSelected ) &&
							<RichText
								tagName="figcaption"
								placeholder={ __( 'Write caption…', 'coblocks' ) }
								className="coblocks-gallery--caption"
								value={ image.caption }
								onChange={ ( caption ) => updateImageAttributes( index, { caption } ) }
								isSelected={ isSelected }
								inlineToolbar
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
			[ `shadow-${ props.attributes.shadow }` ]: props.attributes.shadow,
		} );

		return (
			<MediaPlaceholder
				addToGallery={ true }
				className={ classNames }
				allowedTypes={ [ 'image' ] }
				disableDropZone={ true }
				disableMediaButtons={ hasImage }
				accept="image/*"
				multiple={ false }
				icon={ false }
				labels={ {
					title: ' ',
					instructions: ' ',
				} }
				onSelect={ ( img ) => replaceImage( img, index ) }
				onError={ onUploadError }
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
		attributes,
		className,
		noticeUI,
	} = props;

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
				key={ `image-${ imageIndex }` }
				className={ classnames(
					'wp-block-coblocks-gallery-collage__item',
					`item-${ imageIndex + 1 }`,
					{
						[ `coblocks-animate ${ animation }` ]: animation,
						'is-selected': imageIndex === parseInt( selectedImage ),
					}
				) }
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
			<Inspector { ...props } enableGutter={ enableGutter } enableCaptions={ enableCaptions } />
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
