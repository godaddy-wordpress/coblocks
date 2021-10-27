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
import { BlockControls, MediaReplaceFlow, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

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
				<ToolbarGroup className={ backgroundImg ? 'components-dropdown-menu' : '' }>
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
										icon={ PaintCanIcon }
										label={ __( 'Add background image', 'coblocks' ) }
										onClick={ open }
									/>
								) }
								value={ backgroundImg }
							/>
						) }
				</ToolbarGroup>
			</MediaUploadCheck>
		</Fragment>
	);
}

export default BackgroundControls;
