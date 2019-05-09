/**
 * Internal dependencies
 */
import icons from './../icons';
import { BackgroundToolbar } from '../background';
import * as helper from './../../../utils/helper';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
	IconButton,
	Toolbar,
	DropdownMenu,
} = wp.components;
const {
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
	AlignmentToolbar,
} = wp.editor;

/**
 * Global Toolbar Component
 */
class GlobalToolbar extends Component {

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
			hasAlignmentToolbar,
		} = this.props;

		const {
			images,
			contentAlign,
		} = attributes;

		return (
			<BlockControls>
				{ hasAlignmentToolbar && (
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextAlign ) => {
							setAttributes( { contentAlign: nextAlign } );
						} }
					/>
				) }
				<BackgroundToolbar { ...this.props }/>
				{ !! images.length && (
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
										label={ __( 'Edit Gallery' ) }
										icon="edit"
										onClick={ open }
									/>
								) }
							/>
						</MediaUploadCheck>
						<DropdownMenu
							icon= { icons.imageFilter }
							label={ __( 'Apply Filter' ) }_
							controls={ [
								{
									icon: icons.imageFilterGrayscale,
									title: __( 'Grayscale' ),
									onClick: () => { setAttributes( { filter: 'grayscale' } ) },
								},
								{
									icon: icons.imageFilterSepia,
									title: __( 'Sepia' ),
									onClick: () => { setAttributes( { filter: 'sepia' } ) },
								},
								{
									icon: icons.imageFilterSaturation,
									title: __( 'Saturation' ),
									onClick: () => { setAttributes( { filter: 'saturation' } ) },
								},
								{
									icon: icons.imageFilterDark,
									title: __( 'Dark' ),
									onClick: () => { setAttributes( { filter: 'dim' } ) },
								},
								{
									icon: icons.imageFilterVintage,
									title: __( 'Vintage' ),
									onClick: () => { setAttributes( { filter: 'vintage' } ) },
								},
								{
									icon: icons.image,
									title: __( 'Original' ),
									onClick: () => { setAttributes( { filter: 'none' } ) },
								},
							] }
						/>
					</Toolbar>
				) }
			</BlockControls>
		)
	}
}

export default GlobalToolbar;
