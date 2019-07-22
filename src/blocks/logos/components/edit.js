/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import * as helper from './../../../utils/helper';
import Controls from './controls';
import GalleryDropZone from '../../../components/block-gallery/gallery-dropzone';
import Logos from './logos';
import { title, icon } from '../';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withNotices } = wp.components;
const { MediaPlaceholder, BlockIcon } = wp.blockEditor;

class Edit extends Component {
	constructor() {
		super( ...arguments );
		this.onSelectImages = this.onSelectImages.bind( this );
	}

	componentDidMount() {
		if ( ! this.props.attributes.align ) {
			this.props.setAttributes( {
				align: 'wide',
			} );
		}
	}

	onSelectImages( images ) {
		this.props.setAttributes( {
			images: images.map( ( image ) => helper.pickRelevantMediaFiles( image ) ),
		} );
	}

	render() {
		const {
			className,
			noticeOperations,
			attributes,
			noticeUI,
			setAttributes,
			isSelected,
		} = this.props;

		const {
			images,
			blackAndWhite,
			align,
		} = attributes;

		const hasImages = !! images.length;

		const classes = classnames(
			className,
			{
				'has-filter-grayscale' : blackAndWhite,
			}
		);

		if ( ! hasImages ) {
			return (
				<MediaPlaceholder
					{ ...this.props }
					icon={ ! hasImages && <BlockIcon icon={ icon } /> }
					labels={ {
						title: ! hasImages && title,
						instructions: ! hasImages && __( 'Drag images, upload new ones or select files from your library.' ),
					} }
					multiple
					accept="image/*"
					allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
					value={ hasImages ? images : undefined }
					onError={ noticeOperations.createErrorNotice }
					notices={ hasImages ? undefined : noticeUI }
					onSelect={ this.onSelectImages }
				/>
			);
		}

		return (
			<Fragment>
				<Controls
					{...this.props}
				/>
				<GalleryDropZone
					{ ...this.props }
				/>
				{ noticeUI }
				<div className={ classes }>
					<Logos
						{...this.props}
						images={ images }
					/>
					{ isSelected && (
						<MediaPlaceholder
							{ ...this.props }
							icon={ ! hasImages && <BlockIcon icon={ icon } /> }
							labels={ {
								title: ' ',
								instructions: ' ',
							} }
							multiple
							accept="image/*"
							allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
							value={ hasImages ? images : undefined }
							onError={ noticeOperations.createErrorNotice }
							notices={ hasImages ? undefined : noticeUI }
							onSelect={ this.onSelectImages }
						/>
					) }
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withNotices,
] )( Edit );
