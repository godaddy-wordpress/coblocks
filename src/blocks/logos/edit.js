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
import { Icon, withNotices } from '@wordpress/components';
import { MediaPlaceholder } from '@wordpress/block-editor';

const Edit = ( props ) => {
	const {
		attributes,
		className,
		isSelected,
		noticeOperations,
		noticeUI,
		setAttributes,
	} = props;

	const onSelectImages = ( images ) => {
		setAttributes( { images: images.map( ( image ) => pickRelevantMediaFiles( image ) ) } );
	};

	const onDropImages = ( images ) => {
		const imagesNormalized = images.map( ( image ) => pickRelevantMediaFiles( image ) );
		const currentImages = attributes.images || [];
		setAttributes( { images: currentImages.concat( imagesNormalized )	} );
	};

	const hasImages = !! attributes.images.length;

	return (
		<>
			<Controls { ...props } />
			<GalleryDropZone { ...props } onSelect={ onDropImages } />

			<div className={ className }>
				<Logos { ...props } images={ attributes.images } />

				{ ( ! hasImages || isSelected ) && (
					<MediaPlaceholder
						accept="image/*"
						addToGallery={ hasImages }
						allowedTypes={ [ 'image' ] }
						className={ classnames( { 'is-appender': hasImages } ) }
						icon={ <Icon icon={ icon } /> }
						isAppender={ hasImages }
						labels={ {
							title: __( 'Logos & Badges', 'coblocks' ),
							instructions: __( 'Drag images, upload new ones or select files from your library.', 'coblocks' ),
						} }
						multiple
						notices={ noticeUI }
						onError={ noticeOperations.createErrorNotice }
						onSelect={ onSelectImages }
						value={ hasImages ? attributes.images : undefined }
					/>
				) }
			</div>
		</>
	);
};

export default compose( [ withNotices ] )( Edit );
