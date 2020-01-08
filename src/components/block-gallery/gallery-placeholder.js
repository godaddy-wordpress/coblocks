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
		};
	}

	setAttributes( attributes ) {
		if ( attributes.ids ) {
			throw new Error( 'The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes' );
		}

		if ( attributes.images ) {
			attributes = {
				...attributes,
				ids: map( attributes.images, 'id' ),
			};
		}

		this.props.setAttributes( attributes );
	}

	selectCaption( newImage, images, attachmentCaptions ) {
		const currentImage = find(
			images, { id: newImage.id.toString() || newImage.id }
		);

		const currentImageCaption = currentImage ? currentImage.caption : newImage.caption;

		if ( ! attachmentCaptions ) {
			return currentImageCaption;
		}

		const attachment = find(
			attachmentCaptions, { id: newImage.id }
		);

		// if the attachment caption is updated
		if ( attachment && ( attachment.caption !== newImage.caption ) ) {
			return newImage.caption;
		}

		return currentImageCaption;
	}

	onSelectImages( newImages ) {
		const { images } = this.props.attributes;
		const { attachmentCaptions } = this.state;

		this.setState(
			{
				attachmentCaptions: newImages.map( ( newImage ) => ( {
					id: newImage.id,
					caption: newImage.caption,
				} ) ),
			}
		);
		this.setAttributes( {
			images: newImages.map( ( image ) => ( {
				...helper.pickRelevantMediaFiles( image ),
				caption: this.selectCaption( image, images, attachmentCaptions ),
			} ) ),
		} );
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
