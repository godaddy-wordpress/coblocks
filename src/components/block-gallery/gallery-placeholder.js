/**
 * External Dependencies
 */
import { every, forEach, map, find } from 'lodash';

/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { MediaPlaceholder, BlockIcon } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { getBlobByURL, isBlobURL, revokeBlobURL } from '@wordpress/blob';

class GalleryPlaceholder extends Component {
	constructor() {
		super( ...arguments );
		this.onSelectImages = this.onSelectImages.bind( this );
		this.onUploadError = this.onUploadError.bind( this );

		this.state = {
			attachmentCaptions: null,
			imgLinks: null,
		};
	}

	selectCaption( newImage, images, attachmentCaptions ) {
		if ( ! newImage.caption ) {
			return '';
		}
		const currentImage = find( images, { id: newImage.id.toString() } ) ||	find( images, { id: newImage.id } );

		const currentImageCaption = currentImage ? currentImage.caption : newImage.caption;

		if ( ! attachmentCaptions ) {
			return currentImageCaption;
		}

		const attachment = find(
			attachmentCaptions, { id: newImage.id }
		);

		if ( attachment && ( attachment.caption !== newImage.caption ) ) {
			return newImage.caption;
		}

		return currentImageCaption;
	}

	selectImgLink( newImage, images, imgLinks ) {
		if ( ! newImage.id ) {
			return '';
		}
		const currentImage = find( images, { id: newImage.id.toString() } ) ||	find( images, { id: newImage.id } );

		const currentImageImgLink = currentImage ? currentImage.imgLink : newImage.imgLink;

		if ( ! imgLinks ) {
			return currentImageImgLink;
		}

		const link = find(
			imgLinks, { id: newImage.id }
		);

		if ( link && ( link.imgLink !== newImage.imgLink ) ) {
			return newImage.imgLink;
		}

		return currentImageImgLink;
	}

	onSelectImages( newImages ) {
		const { images } = this.props.attributes;
		const { attachmentCaptions, imgLinks } = this.state;

		this.setState(
			{
				attachmentCaptions: newImages.map( ( newImage ) => ( {
					id: newImage.id,
					caption: newImage.caption,
				} ) ),
				imgLinks: newImages.map( ( newImage ) => ( {
					id: newImage.id,
					imgLink: newImage.imgLink,
				} ) ),
			} );
		this.props.setAttributes( {
			images: newImages.map( ( image ) => ( {
				...helper.pickRelevantMediaFiles( image ),
				caption: this.selectCaption( image, images, attachmentCaptions ),
				imgLink: this.selectImgLink( image, images, imgLinks ),
			} ) ),
		}
		);
	}

	onUploadError( message ) {
		const { noticeOperations } = this.props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	}

	componentDidMount() {
		const { attributes } = this.props;
		const { images } = attributes;
		if ( every( images, ( { url } ) => isBlobURL( url ) ) ) {
			const filesList = map( images, ( { url } ) => getBlobByURL( url ) );
			forEach( images, ( { url } ) => revokeBlobURL( url ) );
			mediaUpload( {
				filesList,
				onFileChange: this.onSelectImages,
				allowedTypes: [ 'image' ],
			} );
		}
	}

	render() {
		const {
			attributes,
			gutter,
			isSelected,
		} = this.props;

		const {
			images,
		} = attributes;

		const hasImages = !! images.length;

		const styles = {
			marginTop: gutter + 'px',
		};

		return (
			<div style={ styles }>
				<MediaPlaceholder
					addToGallery={ hasImages }
					isAppender={ hasImages }
					className="coblocks-gallery--figure"
					disableMediaButtons={ hasImages && ! isSelected }
					icon={ ! hasImages && <BlockIcon icon={ this.props.icon } /> }
					labels={ {
						title: ! hasImages && sprintf(
							/* translators: %s: Type of gallery */
							__( '%s Gallery', 'coblocks' ),
							this.props.label
						),
						instructions: ! hasImages && __( 'Drag images, upload new ones or select files from your library.', 'coblocks' ),
					} }
					onSelect={ this.onSelectImages }
					accept="image/*"
					allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
					multiple
					value={ hasImages ? images : undefined }
					onError={ this.onUploadError }
				/>
			</div>
		);
	}
}

export default GalleryPlaceholder;
