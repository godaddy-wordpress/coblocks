/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { pickRelevantMediaFiles } from './../../utils/helper';
import Controls from './controls';
import GalleryDropZone from '../../components/block-gallery/gallery-dropzone';
import Logos from './logos';
import { icon } from './';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withNotices } from '@wordpress/components';
import { MediaPlaceholder, BlockIcon } from '@wordpress/block-editor';

class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.onSelectImages = this.onSelectImages.bind( this );
	}

	onSelectImages( images ) {
		this.props.setAttributes( {
			images: images.map( ( image ) => pickRelevantMediaFiles( image ) ),
		} );
	}

	render() {
		const {
			className,
			noticeOperations,
			attributes,
			noticeUI,
			isSelected,
		} = this.props;

		const hasImages = !! attributes.images.length;

		return (
			<Fragment>
				<Controls { ...this.props } />
				<GalleryDropZone { ...this.props } />

				<div className={ className }>
					<Logos { ...this.props } images={ attributes.images } />

					{ ( ! hasImages || isSelected ) && (
						<MediaPlaceholder
							addToGallery={ hasImages }
							isAppender={ hasImages }
							icon={ <BlockIcon icon={ icon } /> }
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
							onSelect={ this.onSelectImages }
							className={ classnames( { 'is-appender': hasImages } ) }
						/>
					) }
				</div>
			</Fragment>
		);
	}
}

export default compose( [ withNotices ] )( Edit );
