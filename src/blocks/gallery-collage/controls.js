/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';
import MediaFilterControl from '../../components/media-filter-control';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { IconButton, Toolbar } = wp.components;
const {
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} = wp.blockEditor;

class Controls extends Component {
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
		const { attributes } = this.props;
		const { images } = attributes;

		const hasImages = !! images.length;

		return (
			<BlockControls>
				{ hasImages && (
					<Fragment>
						<Toolbar>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ this.onSelectImages }
									allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
									multiple
									gallery
									value={ images.filter( img => Object.is( img, {} ) ).map( img => img.id ) }
									render={ ( { open } ) => (
										<IconButton
											className="components-toolbar__control"
											label={ __( 'Edit gallery' ) }
											icon="edit"
											onClick={ open }
										/>
									) }
								/>
							</MediaUploadCheck>
						</Toolbar>
						<MediaFilterControl
							{ ...this.props }
						/>
					</Fragment>
				) }
			</BlockControls>
		);
	}
}

export default Controls;
