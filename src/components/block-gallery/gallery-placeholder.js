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
import { Icon } from '@wordpress/components';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';

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
		const { attributes, setAttributes } = props;
		const { images } = attributes;
		setAttributes( {
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
		variationLabel,
		label,
		icon,
	} = props;

	const {
		images,
	} = attributes;

	const hasImages = !! images.length;

	const styles = {
		marginTop: gutter + 'px',
	};

	const title = ! hasImages && ( variationLabel || sprintf(
		/* translators: %s: Type of gallery */
		__( '%s Gallery', 'coblocks' ),
		label
	) );

	return (
		<div style={ styles }>
			<MediaPlaceholder
				accept="image/*"
				addToGallery={ hasImages }
				allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
				className="coblocks-gallery--figure"
				disableMediaButtons={ hasImages && ! isSelected }
				icon={ ! hasImages && <Icon icon={ icon } /> }
				isAppender={ hasImages }
				labels={ {
					instructions: ! hasImages && __( 'Drag images, upload new ones or select files from your library.', 'coblocks' ),
					title,
				} }
				multiple
				onError={ onUploadError }
				onSelect={ onSelectImages }
				value={ hasImages ? images : undefined }
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
};

export default GalleryPlaceholder;
