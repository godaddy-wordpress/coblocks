/**
 * External dependencies
 */
import classnames from 'classnames';
import get from 'lodash/get';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import Inspector from './inspector';
import BackgroundImagePanel, { BackgroundClasses, BackgroundImageDropZone } from '../../../components/background';
import icons from './../../../utils/icons';
import MediaContainer from './media-container';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { RichText, URLInput, MediaUpload, MediaPlaceholder, mediaUpload, InnerBlocks } = wp.editor;
const { IconButton, DropZone } = wp.components;

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_MEDIA_TYPES = [ 'image' ];
const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/spacer', 'core/button', 'core/list', 'core/image', 'coblocks/alert', 'coblocks/gif', 'coblocks/social', 'coblocks/row' , 'coblocks/column' ];
const TEMPLATE = [
	[ 'coblocks/row', { columns: 1, layout: '100', paddingSize: 'huge', hasMarginControl: false, hasStackedControl: false, hasAlignmentControls: false, customBackgroundColor: '#FFFFFF' }, [
        [ 'coblocks/column', { width: "100" },
        	[
        		[ 'core/heading', { placeholder: _x( 'Add heading...', 'content placeholder' ), content: _x( 'Media Card', 'content placeholder' ) , level: 3 } ],
			[ 'core/paragraph', { placeholder: _x( 'Add content...', 'content placeholder' ), content: _x( 'Replace this text with descriptive copy to go along with the card image. Then add more blocks to this card, such as buttons, lists or images.', 'content placeholder' ) } ],
        	]
        ],
    ] ],
];

/**
 * Block edit function
 */
class Edit extends Component {

	constructor( props ) {
		super( ...arguments );

		this.onSelectMedia = this.onSelectMedia.bind( this );
		this.onWidthChange = this.onWidthChange.bind( this );
		this.commitWidthChange = this.commitWidthChange.bind( this );
		this.state = {
			mediaWidth: null,
		};
	}

	onSelectMedia( media ) {
		const { setAttributes } = this.props;

		let mediaType;
		let src;
		// for media selections originated from a file upload.
		if ( media.media_type ) {
			if ( media.media_type === 'image' ) {
				mediaType = 'image';
			} else {
				// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
				// video contain the media type of 'file' in the object returned from the rest api.
				mediaType = 'video';
			}
		} else { // for media selections originated from existing files in the media library.
			mediaType = media.type;
		}

		if ( mediaType === 'image' ) {
			// Try the "large" size URL, falling back to the "full" size URL below.
			src = get( media, [ 'sizes', 'large', 'url' ] ) || get( media, [ 'media_details', 'sizes', 'large', 'source_url' ] );
		}

		setAttributes( {
			mediaAlt: media.alt,
			mediaId: media.id,
			mediaType,
			mediaUrl: src || media.url,
		} );
	}

	onWidthChange( width ) {
		this.setState( {
			mediaWidth: width,
		} );
	}

	commitWidthChange( width ) {
		const { setAttributes } = this.props;

		setAttributes( {
			mediaWidth: width,
		} );
		this.setState( {
			mediaWidth: null,
		} );
	}

	renderMediaArea() {
		const { attributes, className } = this.props;
		const { mediaAlt, mediaId, mediaType, mediaUrl, mediaWidth, hasImgShadow } = attributes;

		return (
			<MediaContainer
				className={ className }
				figureClass="wp-block-coblocks-media-card__media-container"
				onSelectMedia={ this.onSelectMedia }
				onWidthChange={ this.onWidthChange }
				commitWidthChange={ this.commitWidthChange }
				{ ...{ mediaAlt, mediaId, mediaType, mediaUrl, hasImgShadow, mediaWidth } }
			/>
		);
	}

	render() {

		const {
			attributes,
			backgroundColor,
			className,
			isSelected,
			setAttributes,
		} = this.props;

		const {
			coblocks,
			backgroundImg,
			contentAlign,
			hasCardShadow,
			hasImgShadow,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			paddingSize,
			mediaAlt,
			mediaType,
			mediaWidth,
			mediaUrl,
			isStackedOnMobile,
		} = attributes;

		const dropZone = (
			<BackgroundImageDropZone
				{ ...this.props }
				label={ __( 'Add backround image' ) }
			/>
		);

		const imageDropZone = (
			<DropZone
				onFilesDrop={ this.addImage }
				label={ __( 'Upload media' ) }
			/>
		);

		const innerClasses = classnames(
			'wp-block-coblocks-media-card__inner',
			...BackgroundClasses( attributes ), {
			'has-padding': paddingSize && paddingSize != 'no',
			[ `has-${ paddingSize }-padding` ] : paddingSize && ( paddingSize != 'advanced' ),
		} );

		const temporaryMediaWidth = this.state.mediaWidth;
		const widthString = `${ temporaryMediaWidth || mediaWidth }%`;
		const isStyleRight = includes( className, 'is-style-right' );
		const mediaPosition = isStyleRight ? 'right' : 'left';

		const innerStyles = {
			gridTemplateColumns: 'right' === mediaPosition ? `auto ${ widthString }` : `${ widthString } auto`,
			backgroundColor: backgroundColor.color,
			backgroundImage: backgroundImg ? `url(${ backgroundImg })` : undefined,
			paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
		};

		return [
			<Fragment>
				{ dropZone }
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div
					className={ classnames(
						className, {
							'has-background': backgroundColor.color,
							[ backgroundColor.class ]: backgroundColor.class,
							[ `coblocks-media-card-${ coblocks.id }` ] : coblocks && ( typeof coblocks.id != 'undefined' ),
							'has-no-media': ! mediaUrl || null,
							'is-selected': isSelected,
							'is-stacked-on-mobile': isStackedOnMobile,
						}
					) }
				>
					<div className={ innerClasses } style={ innerStyles } >
						{ this.renderMediaArea() }
						<div
							className={ classnames(
								'wp-block-coblocks-media-card__content', {
									'has-shadow': hasCardShadow,
								}
							) }
							style={ { textAlign: contentAlign } }
						>
							{ ( typeof this.props.insertBlocksAfter !== 'undefined' ) && (
								<InnerBlocks
									template={ TEMPLATE }
									allowedBlocks={ ALLOWED_BLOCKS }
									templateLock={ true }
									templateInsertUpdatesSelection={ false }
								/>
							) }
						</div>
					</div>
				</div>
			</Fragment>
		];
	}
}

export default compose( [
	applyWithColors,
	withSelect( ( select ) => ( {
		wideControlsEnabled: select( 'core/editor' ).getEditorSettings().alignWide,
	} ) ),
] )( Edit );
