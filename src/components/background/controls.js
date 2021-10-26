/**
 * Internal dependencies
 */
import { ALLOWED_BG_MEDIA_TYPES } from './';
import { PaintCanIcon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { MediaReplaceFlow, MediaUpload, MediaUploadCheck, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';

/**
 * Background image block toolbar controls.
 *
 * @param {Object} props The passed props.
 * @return {string} Component.
 */
function BackgroundControls( props ) {
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
				<Toolbar className={ backgroundImg ? 'components-dropdown-menu' : '' }
					label={ __( 'Background controls', 'coblocks' ) }
				>
					{ backgroundImg
						? (
							<BlockControls group="other">
								<MediaReplaceFlow
									accept="image/*"
									allowedTypes={ ALLOWED_BG_MEDIA_TYPES }
									mediaURL={ backgroundImg }
									name={ PaintCanIcon }
									onError={ () => {
										setAttributes( { backgroundImg: undefined, backgroundType: undefined } );
									} }
									onSelect={ ( media ) => {
										if ( media ) {
											setAttributes( { backgroundImg: media.url, backgroundType: ( media.media_type || media.type ) } );
										}
									} }
								/>
							</BlockControls>
						) : (
							<MediaUpload
								allowedTypes={ ALLOWED_BG_MEDIA_TYPES }
								onSelect={ ( media ) => {
									setAttributes( { backgroundImg: media.url, backgroundType: media.type } );
								} }
								render={ ( { open } ) => (
									<ToolbarButton
										className="components-toolbar__control"
										label={ __( 'Add background image', 'coblocks' ) }
										icon={ PaintCanIcon }
										onClick={ open }
									/>
								) }
								value={ backgroundImg }
							/>
						) }
				</Toolbar>
			</MediaUploadCheck>
		</Fragment>
	);
}

export default BackgroundControls;
