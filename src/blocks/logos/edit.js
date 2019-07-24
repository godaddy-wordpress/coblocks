/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';
import Inspector from './inspector';
import GalleryDropZone from '../../components/block-gallery/gallery-dropzone';
import Logos from './logos';
import { title, icon } from './';

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
			images: images.map( ( image ) => helper.pickRelevantMediaFiles( image ) ),
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

		const {
			images,
			grayscale,
		} = attributes;

		const hasImages = !! images.length;

		const classes = classnames(
			className, {
				'has-filter-grayscale': grayscale,
			}
		);

		if ( ! hasImages ) {
			return (
				<Fragment>
					<Inspector
						{ ...this.props }
					/>
					<MediaPlaceholder
						{ ...this.props }
						icon={ ! hasImages && <BlockIcon icon={ icon } /> }
						labels={ {
							title: title,
							instructions: __( 'Drag images, upload new ones or select files from your library.' ),
						} }
						multiple
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						onError={ noticeOperations.createErrorNotice }
						notices={ noticeUI }
						onSelect={ this.onSelectImages }
					/>
				</Fragment>
			);
		}

		return (
			<Fragment>
				<Inspector
					{ ...this.props }
				/>
				<GalleryDropZone
					{ ...this.props }
				/>
				{ noticeUI }
				<div className={ classes }>
					<Logos
						{ ...this.props }
						images={ images }
					/>
					{ isSelected && (
						<MediaPlaceholder
							{ ...this.props }
							labels={ {
								title: ' ',
								instructions: ' ',
							} }
							multiple
							accept="image/*"
							allowedTypes={ [ 'image' ] }
							value={ hasImages ? images : undefined }
							onError={ noticeOperations.createErrorNotice }
							notices={ hasImages ? undefined : noticeUI }
							onSelect={ this.onSelectImages }
							className="block-editor-media-placeholder is-appender"
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
