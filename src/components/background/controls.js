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
import { MediaUpload, MediaUploadCheck, MediaReplaceFlow, BlockControls } from '@wordpress/block-editor';
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
				<Toolbar className={ backgroundImg ? 'components-dropdown-menu' : '' }>
					{ backgroundImg
						? (
							<BlockControls group="other">
								<MediaReplaceFlow
									name={ PaintCanIcon }
									mediaURL={ backgroundImg }
									allowedTypes={ ALLOWED_BG_MEDIA_TYPES }
									accept="image/*"
									onSelect={ ( media ) => {
										if ( media ) {
											setAttributes( { backgroundImg: media.url, backgroundType: ( media.media_type || media.type ) } );
										}
									} }
									onError={ () => {
										setAttributes( { backgroundImg: undefined, backgroundType: undefined } );
									} }
								/>
							</BlockControls>
						) : (
							<MediaUpload
								onSelect={ ( media ) => {
									setAttributes( { backgroundImg: media.url, backgroundType: media.type } );
								} }
								allowedTypes={ ALLOWED_BG_MEDIA_TYPES }
								value={ backgroundImg }
								render={ ( { open } ) => (
									<ToolbarButton
										className="components-toolbar__control"
										label={ __( 'Add background image', 'coblocks' ) }
										icon={ PaintCanIcon }
										onClick={ open }
									/>
								) }
							/>
						) }
				</Toolbar>
			</MediaUploadCheck>
		</Fragment>
	);
}

export default BackgroundControls;
