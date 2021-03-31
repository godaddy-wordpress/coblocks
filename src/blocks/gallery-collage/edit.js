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
			images: [],
			selectedImage: null,
			lastGutterValue: null,
		};
	}

	componentDidMount() {
		this.setupImageLocations();
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.className !== prevProps.className ) {
			this.setupImageLocations();

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

	setupImageLocations = ( images = null ) => {
		const theImages = images || this.props.attributes.images;

		const placeholderCount = this.props.className.includes( 'is-style-tiled' ) || this.props.className.includes( 'is-style-layered' ) ? 4 : 5;
		const imageLocations = [];

		for ( let index = 0; index < placeholderCount; index++ ) {
			imageLocations.push( theImages.find( ( image ) => parseInt( image.index ) === parseInt( index ) ) || {} );
		}

		this.props.setAttributes( { images: imageLocations } );
		this.setState( { images: imageLocations } );
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
		const { attributes } = this.props;

		const images = [
			...attributes.images.filter( ( img ) => parseInt( img.index ) !== parseInt( index ) ),
			{ ...helper.pickRelevantMediaFiles( image ), index },
		];
		this.setupImageLocations( images );
	}

	removeImage = ( index ) => {
		const { attributes } = this.props;

		const images = [
			...attributes.images.filter( ( image ) => parseInt( image.index ) !== parseInt( index ) ),
		];
		this.setupImageLocations( images );
	}

	updateImageAttributes( index, newAttributes ) {
		const { attributes } = this.props;
		const image = attributes.images.filter( ( img ) => parseInt( img.index ) === parseInt( index ) ).pop();

		const images = [
			...attributes.images.filter( ( img ) => parseInt( img.index ) !== parseInt( index ) ),
			Object.assign( {}, image, newAttributes ),
		];

		this.setupImageLocations( images );
	}

	saveCustomLink = () => {
		this.setState( { isSaved: true } );
	}

	renderImage( index ) {
		const image = this.props.attributes.images.filter( ( img ) => parseInt( img.index ) === parseInt( index ) ).pop() || {};
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
		const image = this.props.attributes.images.filter( ( img ) => parseInt( img.index ) === parseInt( index ) ).pop() || false;
		const hasImage = !! image;

		const classNames = classnames( 'wp-block-coblocks-gallery-collage__figure', {
			[ `shadow-${ this.props.attributes.shadow }` ]: this.props.attributes.shadow,
		} );

		return (
			<div className="wp-block-coblock-gallery-collage-dropzone-container">
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
					onSelect={ ( img ) => {
						this.replaceImage( img, index );
					} }
					onError={ this.onUploadError }
				/>
				<GalleryDropZone
					{ ...this.props }
					label="Drop file to upload"
					onSelect={ ( img ) => {
						this.replaceImage( img, index );
					} }
				/>
			</div>
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
							{ this.state.images.map( ( img, index ) => {
								const theIndex = img.index || index;

								return (
									<li
										key={ `image-${ theIndex }` }
										className={ classnames(
											'wp-block-coblocks-gallery-collage__item',
											`item-${ index + 1 }`,
											{
												[ `coblocks-animate ${ animation }` ]: animation,
											}
										) }
									>
										{ !! img.url ? this.renderImage( theIndex ) : null }
										{ this.renderPlaceholder( theIndex ) }
									</li>
								);
							} ) }
						</ul>
					</div>
				</GutterWrapper>
			</Fragment>
		);
	}
}

export default compose( [ withNotices ] )( GalleryCollageEdit );
