/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { ALLOWED_MEDIA_TYPES } from './edit';
import { MultimediaIcon as icon } from '@godaddy-wordpress/coblocks-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { isBlobURL } from '@wordpress/blob';
import { BlockControls, MediaPlaceholder, MediaUpload } from '@wordpress/block-editor';
import { Button, DropZone, Icon, ResizableBox, Spinner, Toolbar } from '@wordpress/components';

/**
 * MediaContainer component
 *
 * @param {Object} props
 */
const MediaContainer = ( props ) => {
	const { mediaAlt, hasImgShadow, figureClass, mediaId, onSelectMedia, mediaUrl, mediaType, mediaWidth, mediaPosition, commitWidthChange, onWidthChange, onDropMedia, isSelected } = props;

	const imageDropZone = (
		<DropZone
			label={ __( 'Drop to replace media', 'coblocks' ) }
			onFilesDrop={ onDropMedia }
		/>
	);

	const renderToolbarEditButton = () => {
		return (
			<BlockControls>
				<Toolbar label={ __( 'Media Card controls', 'coblocks' ) } >
					<MediaUpload
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						onSelect={ onSelectMedia }
						render={ ( { open } ) => (
							<Button
								className="components-toolbar__control"
								icon="edit"
								label={ __( 'Edit media', 'coblocks' ) }
								onClick={ open }
							/>
						) }
						value={ mediaId }
					/>
				</Toolbar>
			</BlockControls>
		);
	};

	const renderVideo = () => {
		return (
			<>
				{ renderToolbarEditButton() }
				<figure className={ classnames(
					figureClass, {
						'has-shadow': hasImgShadow,
					}
				) } >
					<video controls src={ mediaUrl } />
				</figure>
			</>
		);
	};

	const renderImage = () => {
		return (
			<>
				{ renderToolbarEditButton() }
				<figure className={ classnames(
					figureClass, {
						'has-shadow': hasImgShadow,
					}
				) } >
					<img alt={ mediaAlt } src={ mediaUrl } />
				</figure>
			</>
		);
	};

	const renderPlaceholder = () => {
		return (
			<div className="wp-block-coblocks-media-card__placeholder">
				{ isBlobURL( mediaUrl )
					? <>
						<Spinner />
						<figure className={ classnames(
							figureClass,
							'is-transient', {}
						) } >
							<img alt={ mediaAlt } src={ mediaUrl } />
						</figure>
					</>
					: (
						<MediaPlaceholder
							accept="image/*,video/*"
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							className={ figureClass }
							icon={ <Icon icon={ icon } /> }
							labels={ {
								instructions: __( 'Upload a media file or pick one from your media library', 'coblocks' ),
								title: __( 'Media area', 'coblocks' ),
							} }
							onSelect={ onSelectMedia }
						>
						</MediaPlaceholder>
					) }
			</div>
		);
	};

	if ( mediaType && mediaUrl ) {
		const onResize = ( _event, _direction, elt ) => {
			onWidthChange( parseInt( elt.style.width ) );
		};
		const onResizeStop = ( _event, _direction, elt ) => {
			commitWidthChange( parseInt( elt.style.width ) );
		};
		const enablePositions = {
			left: mediaPosition === 'right',
			right: mediaPosition === 'left',
		};

		let mediaElement = null;
		switch ( mediaType ) {
			case 'image':
				mediaElement = renderImage();
				break;
			case 'video':
				mediaElement = renderVideo();
				break;
		}
		return (
			<ResizableBox
				axis="x"
				className="editor-media-container__resizer"
				enable={ enablePositions }
				maxWidth="100%"
				minWidth="30%"
				onResize={ onResize }
				onResizeStop={ onResizeStop }
				showHandle={ isSelected }
				size={ { width: mediaWidth + '%' } }
			>
				{ imageDropZone }
				{ mediaElement }
			</ResizableBox>
		);
	}
	return renderPlaceholder();
};

export default MediaContainer;
