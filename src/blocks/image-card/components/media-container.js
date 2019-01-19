/**
 * External dependencies
 */
import classnames from 'classnames';
import includes from 'lodash/includes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls, MediaPlaceholder, MediaUpload } = wp.editor;
const { IconButton, ResizableBox, Toolbar } = wp.components;

/**
 * Constants
 */
const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ];

class MediaContainer extends Component {

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
		const { mediaAlt, mediaUrl, hasImgShadow, figureClass, className } = this.props;

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
		const { mediaUrl, hasImgShadow, className } = this.props;

		return (
			<Fragment>
				{ this.renderToolbarEditButton() }
				<figure className={ classnames(
					className, {
						'has-shadow': hasImgShadow,
					}
				) } >
					<video controls src={ mediaUrl } />
				</figure>
			</Fragment>
		);
	}

	renderPlaceholder() {
		const { onSelectMedia, className } = this.props;

		return (
			<MediaPlaceholder
				icon="format-image"
				labels={ {
					title: __( 'Media' ),
				} }
				className={ className }
				onSelect={ onSelectMedia }
				accept="image/*,video/*"
				allowedTypes={ ALLOWED_MEDIA_TYPES }
			/>
		);
	}

	render() {
		const { className, mediaUrl, mediaType, mediaWidth, commitWidthChange, onWidthChange } = this.props;

		const isStyleRight = includes( className, 'is-style-right' );
		const mediaPosition = isStyleRight ? 'right' : 'left';

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
					minWidth="10%"
					maxWidth="90%"
					enable={ enablePositions }
					onResize={ onResize }
					onResizeStop={ onResizeStop }
					axis="x"
				>
					{ mediaElement }
				</ResizableBox>
			);
		}
		return this.renderPlaceholder();
	}
}

export default MediaContainer;