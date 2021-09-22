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
import { BlockControls, MediaPlaceholder, MediaUpload } from '@wordpress/block-editor';
import { Button, ResizableBox, Toolbar, DropZone, Spinner, Icon } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';

/**
 * MediaContainer component
 *
 * @param {Object} props
 */
const MediaContainer = ( props ) => {
	const { mediaAlt, hasImgShadow, figureClass, mediaId, onSelectMedia, mediaUrl, mediaType, mediaWidth, mediaPosition, commitWidthChange, onWidthChange, onDropMedia, isSelected } = props;

	const imageDropZone = (
		<DropZone
			onFilesDrop={ onDropMedia }
			label={ __( 'Drop to replace media', 'coblocks' ) }
		/>
	);

	const renderToolbarEditButton = () => {
		return (
			<BlockControls>
				<Toolbar>
					<MediaUpload
						onSelect={ onSelectMedia }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						value={ mediaId }
						render={ ( { open } ) => (
							<Button
								className="components-toolbar__control"
								label={ __( 'Edit media', 'coblocks' ) }
								icon="edit"
								onClick={ open }
							/>
						) }
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
					<img src={ mediaUrl } alt={ mediaAlt } />
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
							<img src={ mediaUrl } alt={ mediaAlt } />
						</figure>
					</>
					: (
						<MediaPlaceholder
							icon={ <Icon icon={ icon } /> }
							labels={ {
								title: __( 'Media area', 'coblocks' ),
								instructions: __( 'Upload a media file or pick one from your media library', 'coblocks' ),
							} }
							className={ figureClass }
							onSelect={ onSelectMedia }
							accept="image/*,video/*"
							allowedTypes={ ALLOWED_MEDIA_TYPES }
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
			right: mediaPosition === 'left',
			left: mediaPosition === 'right',
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
				className="editor-media-container__resizer"
				size={ { width: mediaWidth + '%' } }
				minWidth="30%"
				maxWidth="100%"
				enable={ enablePositions }
				onResize={ onResize }
				onResizeStop={ onResizeStop }
				axis="x"
				showHandle={ isSelected }
			>
				{ imageDropZone }
				{ mediaElement }
			</ResizableBox>
		);
	}
	return renderPlaceholder();
};

export default MediaContainer;
