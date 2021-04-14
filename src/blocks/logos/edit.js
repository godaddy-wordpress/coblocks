/**
 * External dependencies
 */
import classnames from 'classnames';
import { LogosIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * Internal dependencies
 */
import { pickRelevantMediaFiles } from './../../utils/helper';
import Controls from './controls';
import GalleryDropZone from '../../components/block-gallery/gallery-dropzone';
import Logos from './logos';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withNotices, Icon } from '@wordpress/components';
import { MediaPlaceholder } from '@wordpress/block-editor';

const Edit = ( props ) => {
	const onSelectImages = ( images ) => {
		props.setAttributes( { images: images.map( ( image ) => pickRelevantMediaFiles( image ) ) } );
	};

	const onDropImages = ( images ) => {
		const imagesNormalized = images.map( ( image ) => pickRelevantMediaFiles( image ) );
		const currentImages = props.attributes.images || [];
		props.setAttributes( { images: currentImages.concat( imagesNormalized )	} );
	};

	const { className, noticeOperations, attributes, noticeUI, isSelected } = props;

	const hasImages = !! attributes.images.length;

	return (
		<>
			<Controls { ...props } />
			<GalleryDropZone { ...props } onSelect={ onDropImages } />

			<div className={ className }>
				<Logos { ...props } images={ attributes.images } />

				{ ( ! hasImages || isSelected ) && (
					<MediaPlaceholder
						addToGallery={ hasImages }
						isAppender={ hasImages }
						icon={ <Icon icon={ icon } /> }
						labels={ {
							title: __( 'Logos & Badges', 'coblocks' ),
							instructions: __( 'Drag images, upload new ones or select files from your library.', 'coblocks' ),
						} }
						multiple
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						value={ hasImages ? attributes.images : undefined }
						onError={ noticeOperations.createErrorNotice }
						notices={ noticeUI }
						onSelect={ onSelectImages }
						className={ classnames( { 'is-appender': hasImages } ) }
					/>
				) }
			</div>
		</>
	);
};

export default compose( [ withNotices ] )( Edit );
