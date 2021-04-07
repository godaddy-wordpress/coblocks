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

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withNotices, DropZone, Spinner, Button, Dashicon, ButtonGroup } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, MediaPlaceholder, RichText, URLInput } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { isBlobURL } from '@wordpress/blob';
import { closeSmall } from '@wordpress/icons';

class GalleryCollageEdit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedImage: null,
			lastGutterValue: null,
		};
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.className !== prevProps.className ) {
			if ( this.props.className.includes( 'is-style-layered' ) ) {
				this.setState( { lastGutterValue: this.props.attributes.gutter } );
				this.props.setAttributes( { gutter: 0 } );
			} else {
				this.props.setAttributes( {
					shadow: 'none',
					gutter: this.state.lastGutterValue || this.props.attributes.gutter,
				} );
				this.setState( { lastGutterValue: null } );
			}
		}

		if ( this.props.isSelected !== prevProps.isSelected && this.props.isSelected === false ) {
			this.setState( { selectedImage: null } );
		}
	}

	getPlaceholderCount() {
		return [ 'is-style-tiled', 'is-style-layered' ].includes( this.props.attributes.className ) ? 4 : 5;
	}

	getImageAtIndex( index ) {
		const { attributes } = this.props;
		return attributes.images.find( ( image ) => parseInt( image.index ) === parseInt( index ) );
	}

	onSelectImage = ( index ) => {
		if ( this.state.selectedImage !== index ) {
			this.setState( { selectedImage: index } );
		}
	}

	uploadImage = ( files, index ) => {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ image ] ) => this.replaceImage( image, index ),
			onError: this.onUploadError,
		} );
	}

	onUploadError = ( message ) => {
		const { noticeOperations } = this.props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	}

	replaceImage = ( image, index ) => {
		const { attributes, setAttributes } = this.props;

		const images = [
			...attributes.images.filter( ( img ) => parseInt( img.index ) !== parseInt( index ) ),
			{ ...helper.pickRelevantMediaFiles( image ), index },
		];
		setAttributes( { images } );
	}

	removeImage = ( index ) => {
		const { attributes, setAttributes } = this.props;

		const images = [
			...attributes.images.filter( ( image ) => parseInt( image.index ) !== parseInt( index ) ),
		];
		setAttributes( { images } );
	}

	updateImageAttributes( index, newAttributes ) {
		const { attributes, setAttributes } = this.props;
		const image = this.getImageAtIndex( index );

		const images = [
			...attributes.images.filter( ( img ) => parseInt( img.index ) !== parseInt( index ) ),
			Object.assign( {}, image, newAttributes ),
		];

		setAttributes( { images } );
	}

	saveCustomLink = () => {
		this.setState( { isSaved: true } );
	}

	renderImage( index ) {
		const image = this.getImageAtIndex( index );
		const isSelected = this.props.isSelected && this.state.selectedImage === image.index;
		const enableCaptions = ! this.props.className.includes( 'is-style-layered' );

		const dropZone = (
			<DropZone
				onFilesDrop={ ( files ) => this.uploadImage( files, index ) }
				label={ __( 'Drop image to replace', 'coblocks' ) }
			/>
		);

		return (
			<Fragment>
				{ /* // Disable reason: Image itself is not meant to be interactive, but should
						direct image selection and unfocus caption fields. */ }
				{ /* eslint-disable jsx-a11y/click-events-have-key-events  */ }
				{ /* eslint-disable jsx-a11y/anchor-is-valid  */ }
				<a role="button" tabIndex="0" onClick={ () => this.onSelectImage( image.index ) }>
					<figure
						className={ classnames( {
							'wp-block-coblocks-gallery-collage__figure': true,
							'is-transient': isBlobURL( image.url ),
							'is-selected': isSelected,
							[ `shadow-${ this.props.attributes.shadow }` ]: this.props.attributes.shadow,
						} ) }>
						{ isSelected && (
							<>
								<ButtonGroup className="block-library-gallery-item__inline-menu is-right is-visible">
									<MediaUploadCheck>
										<MediaUpload
											allowedTypes={ [ 'image' ] }
											onSelect={ ( img ) => this.replaceImage( img, index ) }
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
										onClick={ () => this.removeImage( index ) }
										label={ __( 'Remove image', 'coblocks' ) }
										disabled={ ! isSelected }
									/>
								</ButtonGroup>
							</>
						) }
						{ this.state.selectedImage === image.index && this.props.attributes.linkTo === 'custom' &&
							<form
								className="components-coblocks-gallery-item__image-link"
								onSubmit={ ( event ) => event.preventDefault() }>
								<Dashicon icon="admin-links" />
								<URLInput
									value={ image.imgLink }
									onChange={ ( imgLink ) => this.updateImageAttributes( index, { imgLink } ) }
								/>
								<Button icon={ this.state.isSaved ? 'saved' : 'editor-break' } label={ this.state.isSaved ? __( 'Saving', 'coblocks' ) : __( 'Apply', 'coblocks' ) } onClick={ this.saveCustomLink } type="submit" />
							</form>
						}
						{ dropZone }
						{ isBlobURL( image.url ) && <Spinner /> }
						<img src={ image.url } alt={ image.alt } />
						{ enableCaptions && this.props.attributes.captions && ( image.caption || isSelected ) &&
							<RichText
								tagName="figcaption"
								placeholder={ __( 'Write caption…', 'coblocks' ) }
								className="coblocks-gallery--caption"
								value={ image.caption }
								onChange={ ( caption ) => this.updateImageAttributes( index, { caption } ) }
								isSelected={ isSelected }
								inlineToolbar
							/>
						}
					</figure>
				</a>
				{ /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */ }
				{ /* eslint-enable jsx-a11y/click-events-have-key-events  */ }
			</Fragment>
		);
	}

	renderPlaceholder( index ) {
		const image = this.getImageAtIndex( index );
		const hasImage = !! image;

		return (
			<MediaPlaceholder
				addToGallery={ true }
				className={ classnames( 'wp-block-coblocks-gallery-collage__figure', {
					[ `shadow-${ this.props.attributes.shadow }` ]: this.props.attributes.shadow,
				} ) }
				allowedTypes={ [ 'image' ] }
				disableDropZone={ hasImage }
				disableMediaButtons={ hasImage }
				accept="image/*"
				multiple={ false }
				icon={ false }
				labels={ {
					title: ' ',
					instructions: ' ',
				} }
				onSelect={ ( img ) => this.replaceImage( img, index ) }
				onError={ this.onUploadError }
			/>
		);
	}

	render() {
		const {
			attributes,
			className,
			noticeUI,
		} = this.props;

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

		for ( let imageIndex = 0; imageIndex < this.getPlaceholderCount(); imageIndex++ ) {
			const image = this.getImageAtIndex( imageIndex );

			images.push(
				<li
					key={ `image-${ imageIndex }` }
					className={ classnames(
						'wp-block-coblocks-gallery-collage__item',
						`item-${ imageIndex + 1 }`,
						{
							[ `coblocks-animate ${ animation }` ]: animation,
						}
					) }
				>
					{ !! image
						? this.renderImage( imageIndex )
						: this.renderPlaceholder( imageIndex )
					}
				</li>
			);
		}

		return (
			<Fragment>
				<Controls { ...this.props } />
				<Inspector { ...this.props } enableGutter={ enableGutter } enableCaptions={ enableCaptions } />
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
			</Fragment>
		);
	}
}

export default compose( [ withNotices ] )( GalleryCollageEdit );
