/**
 * Internal dependencies
 */
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { AlignmentToolbar, MediaUpload, MediaUploadCheck } = wp.editor;
const { Toolbar, IconButton } = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

/**
 * Background image block toolbar controls
 */
function BackgroundImageToolbarControls( props, options ) {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		backgroundImg,
	} = attributes;

	return (
		<Fragment>
			<MediaUploadCheck>
				<Toolbar>
					<MediaUpload
						onSelect={ ( media ) => setAttributes( { backgroundImg: media.url } ) }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						value={ backgroundImg }
						render={ ( { open } ) => (
							<IconButton
								className="components-toolbar__control"
								label={ backgroundImg ? ( typeof options !== 'undefined' && typeof options.editLabel !== 'undefined' ) ? options.editLabel : __( 'Edit background image' ) : ( typeof options !== 'undefined' && typeof options.addLabel !== 'undefined' ) ? options.addLabel : __( 'Add background image' ) }
								icon={ backgroundImg ? icons.edit : icons.backgroundImage }
								onClick={ open }
							/>
						) }
					/>
					{ backgroundImg &&
						<IconButton
							className="components-toolbar__control"
							label={ ( typeof options !== 'undefined' && typeof options.deleteLabel !== 'undefined' ) ? options.deleteLabel : __( 'Remove background image' ) }
							icon={ icons.trash }
							onClick={ () => setAttributes( { backgroundImg: '', backgroundOverlay: 0, } ) }
						/>
					}
				</Toolbar>
			</MediaUploadCheck>
		</Fragment>
	);

}

export default BackgroundImageToolbarControls;