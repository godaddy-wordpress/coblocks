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
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const {
	IconButton,
	DropZone,
	FormFileUpload,
	PanelBody,
	Toolbar,
	withNotices,
} = wp.components;
const {
	MediaPlaceholder,
	mediaUpload,
} = wp.editor;

/**
 * Gallery Image Component
 */
class GalleryUpload extends Component {

	constructor() {
		super( ...arguments );
		this.addFiles = this.addFiles.bind( this );
		this.uploadFromFiles = this.uploadFromFiles.bind( this );
	}

	uploadFromFiles( event ) {
		this.addFiles( event.target.files );
	}

	addFiles( files ) {
		const currentImages = this.props.attributes.images || [];
		const { noticeOperations, setAttributes } = this.props;
		mediaUpload( {
			allowedTypes: helper.ALLOWED_GALLERY_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( images ) => {
				setAttributes( {
					images: currentImages.concat( images ),
				} );
			},
			onError: noticeOperations.createErrorNotice,
		} );
	}

	render() {

		const {
			gutter,
			gutterMobile,
			marginLeft,
			marginRight,
			marginTop,
			marginBottom,
		} = this.props;

		const className = classnames(
			'blockgallery--figure', {
			[ `has-margin-top-${ gutter }` ] : marginTop && gutter > 0,
			[ `has-margin-top-mobile-${ gutterMobile }` ] : marginTop && gutterMobile > 0,
			[ `has-margin-right-${ gutter }` ] : marginRight && gutter > 0,
			[ `has-margin-right-mobile-${ gutterMobile }` ] : marginRight && gutterMobile > 0,
			[ `has-margin-bottom-${ gutter }` ] : marginBottom && gutter > 0,
			[ `has-margin-bottom-mobile-${ gutterMobile }` ] : marginBottom && gutterMobile > 0,
			[ `has-margin-left-${ gutter }` ] : marginLeft && gutter > 0,
			[ `has-margin-left-mobile-${ gutterMobile }` ] : marginLeft && gutterMobile > 0,
		} );

		return (
			<Fragment>
				<li className="blockgallery--item blockgallery--item-uploader">
					<div className={ className }>
						<FormFileUpload
							multiple
							isLarge
							className="components-blockgallery-gallery-item__upload"
							onChange={ this.uploadFromFiles }
							accept="image/*"
							icon="insert"
						>
							<span>{ __( 'Upload an image' ) }</span>
						</FormFileUpload>
					</div>
				</li>
			</Fragment>
		)
	}
}

export default GalleryUpload;

