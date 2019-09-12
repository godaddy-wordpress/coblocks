/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component } = wp.element;
const { MediaPlaceholder, BlockIcon } = wp.blockEditor;

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
			gutter,
			gutterMobile,
			isSelected,
			marginBottom,
			marginLeft,
			marginRight,
			marginTop,
			noticeOperations,
			noticeUI,
		} = this.props;

		const {
			images,
		} = attributes;

		const hasImages = !! images.length;

		const classes = classnames(
			'coblocks-gallery--figure', {
				[ `has-margin-top-${ gutter }` ]: marginTop && gutter > 0,
				[ `has-margin-top-mobile-${ gutterMobile }` ]: marginTop && gutterMobile > 0,
				[ `has-margin-right-${ gutter }` ]: marginRight && gutter > 0,
				[ `has-margin-right-mobile-${ gutterMobile }` ]: marginRight && gutterMobile > 0,
				[ `has-margin-bottom-${ gutter }` ]: marginBottom && gutter > 0,
				[ `has-margin-bottom-mobile-${ gutterMobile }` ]: marginBottom && gutterMobile > 0,
				[ `has-margin-left-${ gutter }` ]: marginLeft && gutter > 0,
				[ `has-margin-left-mobile-${ gutterMobile }` ]: marginLeft && gutterMobile > 0,
			} );

		return (
			<div className={ classes }>
				<MediaPlaceholder
					addToGallery={ hasImages }
					isAppender={ hasImages }
					dropZoneUIOnly={ hasImages && ! isSelected }
					icon={ ! hasImages && <BlockIcon icon={ this.props.icon } /> }
					labels={ {
						/* translators: %s: Type of gallery */
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
			</div>
		);
	}
}

export default GalleryPlaceholder;
