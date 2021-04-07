/**
 * WordPress dependencies
 */
import { mediaUpload } from '@wordpress/editor';
import { DropZone } from '@wordpress/components';

/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

const GalleryDropZone = ( props ) => {
	const addFiles = ( files ) => {
		const { noticeOperations } = props;
		mediaUpload( {
			allowedTypes: helper.ALLOWED_GALLERY_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( images ) => props.onSelect( images ),
			onError: noticeOperations.createErrorNotice,
		} );
	};

	return (
		<DropZone
			onFilesDrop={ addFiles }
			label={ props.label }
		/>
	);
};

export default GalleryDropZone;
