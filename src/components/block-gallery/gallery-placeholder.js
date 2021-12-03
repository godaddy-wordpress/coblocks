/**
 * External Dependencies
 */
import { find } from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

const GalleryPlaceholder = ( props ) => {
	const selectCaption = ( newImage, images ) => {
		const currentImage = find( images, ( obj ) => parseInt( obj?.id ) === newImage?.id );
		return Array.isArray( currentImage?.caption ) ? currentImage?.caption?.[ 0 ] : currentImage?.caption || newImage?.caption || '';
	};

	const selectImgLink = ( newImage, images ) => {
		const currentImage = find( images, ( obj ) => parseInt( obj?.id ) === newImage?.id );
		return currentImage?.imgLink || newImage?.imgLink || '';
	};

	const onSelectImages = ( newImages ) => {
		const { images } = props.attributes;
		props.setAttributes( {
			images: newImages.map( ( image ) => ( {
				...helper.pickRelevantMediaFiles( image ),
				caption: selectCaption( image, images ),
				imgLink: selectImgLink( image, images ),
			} ) ),
		} );
	};

	const onUploadError = ( message ) => {
		const { noticeOperations } = props;
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const {
		attributes,
		gutter,
		isSelected,
	} = props;

	const {
		images,
	} = attributes;

	const hasImages = !! images.length;

	const styles = {
		marginTop: gutter + 'px',
	};

	const title = ! hasImages && ( props.variationLabel || sprintf(
		/* translators: %s: Type of gallery */
		__( '%s Gallery', 'coblocks' ),
		props.label
	) );

	return (
		<div style={ styles }>
			<MediaPlaceholder
				addToGallery={ hasImages }
				isAppender={ hasImages }
				className="coblocks-gallery--figure"
				disableMediaButtons={ hasImages && ! isSelected }
				icon={ ! hasImages && <Icon icon={ props.icon } /> }
				labels={ {
					title,
					instructions: ! hasImages && __( 'Drag images, upload new ones or select files from your library.', 'coblocks' ),
				} }
				onSelect={ onSelectImages }
				accept="image/*"
				allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
				multiple
				value={ hasImages ? images : undefined }
				onError={ onUploadError }
			/>
		</div>
	);
};

GalleryPlaceholder.propTypes = {
	attributes: PropTypes.object,
	gutter: PropTypes.bool,
	icon: PropTypes.string,
	isSelected: PropTypes.string,
	label: PropTypes.string,
	setAttributes: PropTypes.func,
	variationLabel: PropTypes.string,
} 

export default GalleryPlaceholder;
