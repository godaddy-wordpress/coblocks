/**
 * Internal dependencies
 */
import icons from './../icons';
import * as helper from './../../../utils/helper';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { MediaUpload, MediaUploadCheck } = wp.editor;
const { Toolbar, IconButton } = wp.components;

/**
 * Background Image Toolbar
 */
class BackgroundToolbar extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			backgroundColor,
			backgroundImg,
			backgroundPadding,
			backgroundPaddingMobile,
		} = attributes;

		return (
			<Fragment>
				<MediaUploadCheck>
					<Toolbar>
						{ ! backgroundImg ?
							<MediaUpload
								onSelect={ ( media ) => {
									setAttributes( {
										backgroundImg: media.url,
									} );

									if ( ! backgroundPadding && ! backgroundPaddingMobile  ) {
										setAttributes( {
											backgroundPadding: 30,
											backgroundPaddingMobile: 30,
										} );
									}
								} }
								allowedTypes={ helper.ALLOWED_GALLERY_MEDIA_TYPES }
								value={ backgroundImg }
								render={ ( { open } ) => (
									<IconButton
										className="components-toolbar__control"
										label={ __( 'Add Background Image' ) }
										icon={ icons.backgroundImage }
										onClick={ open }
									/>
								) }
							/>
						:
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Remove background image' ) }
								icon={ icons.trash }
								onClick={ () => {
									setAttributes( {
										backgroundImg: '',
										backgroundOverlay: 0,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: '',
										backgroundSize: 'cover',
										hasParallax: false,
									} );

									if ( ! backgroundColor ) {
										setAttributes( {
											backgroundPadding: 0,
											backgroundPaddingMobile: 0,
										} );
									}
								} }
							/>
						}
					</Toolbar>
				</MediaUploadCheck>
			</Fragment>
		);
	}
}

export default BackgroundToolbar;