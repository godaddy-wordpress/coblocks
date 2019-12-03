/**
 * External dependencies
 */
import classnames from 'classnames';
import get from 'lodash/get';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import Inspector from './inspector';
import { BackgroundStyles, BackgroundClasses, BackgroundVideo, BackgroundDropZone } from '../../components/background';
import MediaContainer from './media-container';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { Spinner } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';

/**
 * This block can recieve both image and video files.
 */
export const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ];

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/spacer', 'core/button', 'core/list', 'core/image', 'coblocks/alert', 'coblocks/gif', 'coblocks/social', 'coblocks/row', 'coblocks/column' ];
const TEMPLATE = [
	[
		'coblocks/row',
		{
			columns: 1,
			layout: '100',
			paddingSize: 'huge',
			hasMarginControl: false,
			hasStackedControl: false,
			hasAlignmentControls: false,
			customBackgroundColor: '#FFFFFF',
		},
		[
			[
				'coblocks/column',
				{
					width: '100',
				},
				[
					[
						'core/heading',
						{
							/* translators: content placeholder */
							placeholder: __( 'Add heading…', 'coblocks' ),
							/* translators: content placeholder */
							content: __( 'Media Card', 'coblocks' ),
							level: 3,
						},
					],
					[
						'core/paragraph',
						{
							/* translators: content placeholder */
							placeholder: __( 'Add content…', 'coblocks' ),
							/* translators: content placeholder */
							content: __( 'Replace this text with descriptive copy to go along with the card image. Then add more blocks to this card, such as buttons, lists or images.', 'coblocks' ),
						},
					],
				],
			],
		],
	],
];

/**
 * Block edit function
 */
class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.onDropMedia = this.onDropMedia.bind( this );
		this.onSelectMedia = this.onSelectMedia.bind( this );
		this.onWidthChange = this.onWidthChange.bind( this );
		this.commitWidthChange = this.commitWidthChange.bind( this );
		this.state = {
			mediaWidth: null,
		};
	}

	onDropMedia( files ) {
		mediaUpload( {
			allowedTypes: ALLOWED_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectMedia( media ),
		} );
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
		const { mediaAlt, mediaId, mediaType, mediaUrl, mediaWidth, mediaPosition, hasImgShadow } = attributes;

		return (
			<Fragment>
				<MediaContainer
					className={ className }
					figureClass="wp-block-coblocks-media-card__media-container"
					onSelectMedia={ this.onSelectMedia }
					onWidthChange={ this.onWidthChange }
					commitWidthChange={ this.commitWidthChange }
					onDropMedia={ this.onDropMedia }
					{ ...{ mediaAlt, mediaId, mediaType, mediaUrl, mediaPosition, hasImgShadow, mediaWidth } }
				/>
			</Fragment>
		);
	}

	render() {
		const {
			attributes,
			backgroundColor,
			className,
			isSelected,
		} = this.props;

		const {
			coblocks,
			backgroundImg,
			hasCardShadow,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			paddingSize,
			mediaWidth,
			mediaUrl,
			maxWidth,
			isStackedOnMobile,
			align,
			mediaPosition,
		} = attributes;

		const dropZone = (
			<BackgroundDropZone
				{ ...this.props }
				label={ __( 'Add as background', 'coblocks' ) }
			/>
		);

		const temporaryMediaWidth = this.state.mediaWidth;
		const widthString = `${ temporaryMediaWidth || mediaWidth }%`;

		const innerClasses = classnames(
			'wp-block-coblocks-media-card__inner',
			...BackgroundClasses( attributes ), {
				'has-padding': paddingSize && paddingSize !== 'no',
				[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' ),
			} );

		const innerStyles = {
			...BackgroundStyles( attributes ),
			backgroundColor: backgroundColor.color,
			paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
			paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
			paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
			paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
		};

		const wrapperStyles = {
			gridTemplateColumns: 'right' === mediaPosition ? `auto ${ widthString }` : `${ widthString } auto`,
			maxWidth: maxWidth ? ( 'full' === align || 'wide' === align ) && maxWidth : undefined,
		};

		let classes = classnames( className, { [ `is-style-${ mediaPosition }` ]: mediaPosition,
			'has-no-media': ! mediaUrl || null,
			'is-selected': isSelected,
			'is-stacked-on-mobile': isStackedOnMobile }
		);

		if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
			classes = classnames( classes, `coblocks-media-card-${ coblocks.id }` );
		}

		return (
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
					className={ classes }
				>
					<div className={ innerClasses } style={ innerStyles } >
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						<div className="wp-block-coblocks-media-card__wrapper" style={ wrapperStyles } >
							{ this.renderMediaArea() }
							<div
								className={ classnames(
									'wp-block-coblocks-media-card__content', {
										'has-shadow': hasCardShadow,
									}
								) }
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
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
] )( Edit );
