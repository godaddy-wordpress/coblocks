/**
 * External Dependencies
 */
import { every, forEach, map } from 'lodash';

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
	}

	onSelectImages( images ) {
		this.props.setAttributes( {
			images: images.map( ( image ) => helper.pickRelevantMediaFiles( image ) ),
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
