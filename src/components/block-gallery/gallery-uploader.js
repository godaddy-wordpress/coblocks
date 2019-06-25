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
const {
	IconButton,
	FormFileUpload,
} = wp.components;
const {
	MediaPlaceholder,
	mediaUpload,
} = wp.blockEditor;

class GalleryUploader extends Component {

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
			allowedTypes: helper.ALLOWED_MEDIA_TYPES,
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

		return (
			<Fragment>
				<div className="coblocks-gallery--figure components-coblocks-gallery-uploader-wrapper">
					<FormFileUpload
						multiple
						isLarge
						className="components-coblocks-gallery-uploader"
						onChange={ this.uploadFromFiles }
						accept="image/*"
						icon="insert"
					>
						<span>{ __( 'Upload an image' ) }</span>
					</FormFileUpload>
				</div>
			</Fragment>
		)
	}
}

export default GalleryUploader;
