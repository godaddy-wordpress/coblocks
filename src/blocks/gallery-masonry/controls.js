/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { IconButton, Toolbar } = wp.components;
const {
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} = wp.editor;

class Controls extends Component {

	constructor( props ) {
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
			attributes,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			images,
		} = attributes;

		const hasImages = !! images.length;

		return (
			<BlockControls>
				{ hasImages && (
					<Toolbar>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ this.onSelectImages }
								allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
								multiple
								gallery
								value={ images.map( ( img ) => img.id ) }
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
				) }
			</BlockControls>
		)
	}
}

export default Controls;
