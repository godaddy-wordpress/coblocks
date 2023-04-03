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
import { BackgroundClasses, BackgroundDropZone, BackgroundStyles, BackgroundVideo } from '../../components/background';
import MediaContainer from './media-container';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { Spinner } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import { useState } from '@wordpress/element';

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
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
	const {
		attributes,
		backgroundColor,
		className,
		isSelected,
		setAttributes,
	} = props;

	const {
		coblocks,
		backgroundImg,
		hasCardShadow,
		insertBlocksAfter,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		paddingUnit,
		paddingSize,
		mediaUrl,
		maxWidth,
		mediaAlt,
		isStackedOnMobile,
		align,
		mediaId,
		mediaType,
		mediaPosition,
		hasImgShadow,
	} = attributes;

	const [ mediaWidth, setMediaWidth ] = useState( null );

	const dropZone = (
		<BackgroundDropZone
			{ ...props }
			label={ __( 'Add as background', 'coblocks' ) }
		/>
	);

	const temporaryMediaWidth = mediaWidth;
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

	const commitWidthChange = ( width ) => {
		setAttributes( {
			mediaWidth: width,
		} );
		setMediaWidth( null );
	};

	const onSelectMedia = ( media ) => {
		let newMediaType;
		let src;
		// for media selections originated from a file upload.
		if ( media.media_type ) {
			if ( media.media_type === 'image' ) {
				newMediaType = 'image';
			} else {
				// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
				// video contain the media type of 'file' in the object returned from the rest api.
				newMediaType = 'video';
			}
		} else { // for media selections originated from existing files in the media library.
			newMediaType = media.type;
		}

		if ( newMediaType === 'image' ) {
			// Try the "large" size URL, falling back to the "full" size URL below.
			src = get( media, [ 'sizes', 'large', 'url' ] ) || get( media, [ 'media_details', 'sizes', 'large', 'source_url' ] );
		}

		setAttributes( {
			mediaAlt: media.alt,
			mediaId: media.id,
			mediaType: newMediaType,
			mediaUrl: src || media.url,
		} );
	};

	const onWidthChange = ( width ) => {
		setMediaWidth( width );
	};

	const onDropMedia = ( files ) => {
		mediaUpload( {
			allowedTypes: ALLOWED_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( [ media ] ) => onSelectMedia( media ),
		} );
	};

	const renderMediaArea = () => {
		return (
			<>
				<MediaContainer
					className={ className }
					commitWidthChange={ commitWidthChange }
					figureClass="wp-block-coblocks-media-card__media-container"
					onDropMedia={ onDropMedia }
					onSelectMedia={ onSelectMedia }
					onWidthChange={ onWidthChange }
					{ ...{ mediaAlt, mediaId, mediaType, mediaUrl, mediaPosition, hasImgShadow, mediaWidth } }
				/>
			</>
		);
	};

	return (
		<>
			{ dropZone }
			{ isSelected && (
				<Controls
					{ ...props }
				/>
			) }
			{ isSelected && (
				<Inspector
					{ ...props }
				/>
			) }
			<div
				className={ classes }
			>
				<div className={ innerClasses } style={ innerStyles } >
					{ isBlobURL( backgroundImg ) && <Spinner /> }
					{ BackgroundVideo( attributes ) }
					<div className="wp-block-coblocks-media-card__wrapper" style={ wrapperStyles } >
						{ renderMediaArea() }
						<div
							className={ classnames(
								'wp-block-coblocks-media-card__content', {
									'has-shadow': hasCardShadow,
								}
							) }
						>
							{ ( typeof insertBlocksAfter !== 'undefined' ) && (
								<InnerBlocks
									__experimentalCaptureToolbars={ true }
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ TEMPLATE }
									templateInsertUpdatesSelection={ false }
									templateLock={ true }
								/>
							) }
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( Edit );
