/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { mediaUpload } = wp.blockEditor;
const { DropZone } = wp.components;

/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

class GalleryDropZone extends Component {

	constructor() {
		super( ...arguments );

		this.addFiles = this.addFiles.bind( this );
	}

	addFiles( files ) {
		const currentImages = this.props.attributes.images || [];
		const { noticeOperations, setAttributes } = this.props;
		mediaUpload( {
			allowedTypes: helper.ALLOWED_GALLERY_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( images ) => {
				const imagesNormalized = images.map( ( image ) => helper.pickRelevantMediaFiles( image ) );
				setAttributes( {
					images: currentImages.concat( imagesNormalized ),
				} );
			},
			onError: noticeOperations.createErrorNotice,
		} );
	}

	render() {

		const {
			attributes,
			className,
			noticeOperations,
			noticeUI,
			label,
		} = this.props;

		return (
			<Fragment>
				<DropZone
					onFilesDrop={ this.addFiles }
					label={ this.props.label }
				/>
			</Fragment>
		);
	}
}

export default GalleryDropZone;