/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { MediaPlaceholder, BlockIcon } = wp.editor;

/**
 * Gallery Image Component
 */
class GalleryPlaceholder extends Component {

	constructor() {
		super( ...arguments );
		this.onSelectImages = this.onSelectImages.bind( this );
	}

	onSelectImages( images ) {
		this.props.setAttributes( {
			images: images.map( ( image ) => helper.pickRelevantMediaFiles( image ) ),
		} );
	}

	render() {

		const {
			attributes,
			className,
			noticeOperations,
			noticeUI,
			isSelected,
		} = this.props;

		const { images } = attributes;

		const hasImages = !! images.length;

		return (
			<Fragment>
				<MediaPlaceholder
					addToGallery={ hasImages }
					isAppender={ hasImages }
					dropZoneUIOnly={ hasImages && ! isSelected }
					icon={ ! hasImages && <BlockIcon icon={ this.props.icon } /> }
					labels={ {
						title: ! hasImages && sprintf( __( '%s Gallery' ), this.props.label ),
						instructions: ! hasImages && __( 'Drag images, upload new ones or select files from your library.' ),
					} }
					onSelect={ this.onSelectImages }
					accept="image/*"
					allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
					multiple
					value={ hasImages ? images : undefined }
					onError={ noticeOperations.createErrorNotice }
					notices={ hasImages ? undefined : noticeUI }
				/>
			</Fragment>
		);
	}
}

export default GalleryPlaceholder;

