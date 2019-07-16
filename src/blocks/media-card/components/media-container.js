/**
 * External dependencies
 */
import classnames from 'classnames';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import { ALLOWED_MEDIA_TYPES } from './edit';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls, MediaPlaceholder, MediaUpload } = wp.blockEditor;
const { IconButton, ResizableBox, Toolbar, DropZone, Spinner } = wp.components;
const { isBlobURL } = wp.blob;

/**
 * MediaContainer component
 */
class MediaContainer extends Component {

	constructor() {
		super( ...arguments );
	}

	renderToolbarEditButton() {
		const { mediaId, onSelectMedia } = this.props;

		return (
			<BlockControls>
				<Toolbar>
					<MediaUpload
						onSelect={ onSelectMedia }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						value={ mediaId }
						render={ ( { open } ) => (
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Edit media' ) }
								icon="edit"
								onClick={ open }
							/>
						) }
					/>
				</Toolbar>
			</BlockControls>
		);
	}

	renderImage() {
		const { mediaAlt, mediaUrl, hasImgShadow, figureClass } = this.props;

		return (
			<Fragment>
				{ this.renderToolbarEditButton() }
				<figure className={ classnames(
					figureClass, {
						'has-shadow': hasImgShadow,
					}
				) } >
					<img src={ mediaUrl } alt={ mediaAlt } />
				</figure>
			</Fragment>
		);
	}

	renderVideo() {
		const { mediaUrl, hasImgShadow, figureClass } = this.props;

		return (
			<Fragment>
				{ this.renderToolbarEditButton() }
				<figure className={ classnames(
					figureClass, {
						'has-shadow': hasImgShadow,
					}
				) } >
					<video controls src={ mediaUrl } />
				</figure>
			</Fragment>
		);
	}

	renderPlaceholder() {
		const { onSelectMedia, figureClass, mediaAlt, mediaUrl, hasImgShadow, } = this.props;

		return (
			<div className="wp-block-coblocks-media-card__placeholder">
				{ isBlobURL( mediaUrl ) ?
					<Fragment>
						<Spinner />
						<figure className={ classnames(
							figureClass,
							'is-transient', {}
						) } >
							<img src={ mediaUrl } alt={ mediaAlt } />
						</figure>
					</Fragment>
				:
					<MediaPlaceholder
						icon="format-image"
						labels={ {
							title: __( 'Media' ),
						} }
						className={ figureClass }
						onSelect={ onSelectMedia }
						accept="image/*,video/*"
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						>
					</MediaPlaceholder>
				}
			</div>
		);
	}

	render() {
		const { className, mediaUrl, mediaType, mediaWidth, mediaPosition, commitWidthChange, onWidthChange, onSelectMedia, onDropMedia } = this.props;

		const imageDropZone = (
			<Fragment>
				<DropZone
					onFilesDrop={ onDropMedia }
					label={ __( 'Drop to replace media' ) }
				/>
			</Fragment>
		);

		if ( mediaType && mediaUrl ) {
			const onResize = ( event, direction, elt ) => {
				onWidthChange( parseInt( elt.style.width ) );
			};
			const onResizeStop = ( event, direction, elt ) => {
				commitWidthChange( parseInt( elt.style.width ) );
			};
			const enablePositions = {
				right: mediaPosition === 'left',
				left: mediaPosition === 'right',
			};

			let mediaElement = null;
			switch ( mediaType ) {
				case 'image':
					mediaElement = this.renderImage();
					break;
				case 'video':
					mediaElement = this.renderVideo();
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
				>
					{ imageDropZone }
					{ mediaElement }
				</ResizableBox>
			);
		}
		return this.renderPlaceholder();
	}
}

export default MediaContainer;