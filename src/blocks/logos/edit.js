/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { pickRelevantMediaFiles } from './../../utils/helper';
import Inspector from './inspector';
import Controls from './controls';
import GalleryDropZone from '../../components/block-gallery/gallery-dropzone';
import Logos from './logos';
import { icon } from './';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withNotices } = wp.components;
const { MediaPlaceholder, BlockIcon } = wp.blockEditor;

class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.onSelectImages = this.onSelectImages.bind( this );
	}

	onSelectImages( images ) {
		this.props.setAttributes( {
			images: images.map( image => pickRelevantMediaFiles( image ) ),
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

		const { images, grayscale } = attributes;

		const hasImages = !! images.length;

		const classes = classnames( className, {
			'has-filter-grayscale': grayscale,
		} );

		return (
			<Fragment>
				<Controls { ...this.props } />
				<Inspector { ...this.props } />
				<GalleryDropZone { ...this.props } />

				<div className={ classes }>
					<Logos { ...this.props } images={ images } />

					{ ( ! hasImages || isSelected ) && (
						<MediaPlaceholder
							addToGallery={ hasImages }
							isAppender={ hasImages }
							icon={ <BlockIcon icon={ icon } /> }
							labels={ {
								title: __( 'Logos & Badges' ),
								instructions: __( 'Drag images, upload new ones or select files from your library.' ),
							} }
							multiple
							accept="image/*"
							allowedTypes={ [ 'image' ] }
							value={ hasImages ? images : undefined }
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
