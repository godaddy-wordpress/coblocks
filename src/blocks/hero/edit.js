/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import Controls from './controls';
import Inspector from './inspector';
import { BackgroundClasses, BackgroundDropZone, BackgroundStyles, BackgroundVideo } from '../../components/background';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { isBlobURL } from '@wordpress/blob';
import { ResizableBox, Spinner } from '@wordpress/components';
import { useDispatch, withDispatch, withSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'core/heading', 'core/paragraph', 'core/spacer', 'core/button', 'core/buttons', 'core/list', 'core/image', 'coblocks/alert', 'coblocks/gif', 'coblocks/social', 'coblocks/row', 'coblocks/column', 'coblocks/buttons' ];
const TEMPLATE = [
	[
		'core/heading',
		{
			level: 2,
			/* translators: content placeholder */
			placeholder: __( 'Add hero heading…', 'coblocks' ),
		},
	],
	[
		'core/paragraph',
		{
			/* translators: content placeholder */
			placeholder: __( 'Add hero content, which is typically an introductory area of a page accompanied by call to action or two.', 'coblocks' ),
		},
	],
	[
		'core/buttons',
		{
			contentAlign: 'left',
			gutter: 'medium',
			items: 2,
		},
		[
			[
				'core/button',
				{
					/* translators: content placeholder */
					placeholder: __( 'Primary button…', 'coblocks' ),
				},
			],
			[
				'core/button',
				{
					className: 'is-style-outline',
					/* translators: content placeholder */
					placeholder: __( 'Secondary button…', 'coblocks' ),
				},
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
		clientId,
		attributes,
		getEditedPostAttribute,
		editPost,
		name,
		isSelected,
		setAttributes,
		textColor,
		backgroundColor,
		insertBlocksAfter,
		getBlockAttributes,
	} = props;

	const {
		maxWidth,
		className,
		layout,
		fullscreen,
		backgroundImg,
		paddingSize,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		paddingUnit,
		contentAlign,
		height,
		heightTablet,
		heightMobile,
	} = attributes;

	const [ resizingInner ] = useState( false );
	const [ resizing, setResizing ] = useState( false );
	const [ innerWidth, setInnerWidth ] = useState( null );

	const { __unstableMarkAutomaticChange } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		const currentBlock = document.getElementById( 'block-' + clientId );
		if ( currentBlock ) {
			currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__content' )[ 0 ].style.width = 'auto';
			currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__content' )[ 0 ].style.maxWidth = attributes.maxWidth + 'px';
		}

		const win = document.defaultView;

		getBrowserWidth();
		win.addEventListener( 'resize', getBrowserWidth );

		__unstableMarkAutomaticChange();

		return () => {
			win.removeEventListener( 'resize', getBrowserWidth );
		};
	}, [] );

	const getBrowserWidth = () => {
		const win = document.defaultView;

		setInnerWidth( win.innerWidth );
		return win.innerWidth;
	};

	const saveMeta = ( type ) => {
		const meta = getEditedPostAttribute( 'meta' );
		const block = getBlockAttributes( clientId );
		let dimensions = {};

		if ( typeof attributes.coblocks !== 'undefined' && typeof attributes.coblocks.id !== 'undefined' ) {
			const id = name.split( '/' ).join( '-' ) + '-' + attributes.coblocks.id;
			const newHeight = {
				height: block[ type ],
				heightMobile: block[ type + 'Mobile' ],
				heightTablet: block[ type + 'Tablet' ],
			};

			if ( typeof meta._coblocks_responsive_height === 'undefined' || ( typeof meta._coblocks_responsive_height !== 'undefined' && meta._coblocks_responsive_height === '' ) ) {
				dimensions = {};
			} else {
				dimensions = JSON.parse( meta._coblocks_responsive_height );
			}

			if ( typeof dimensions[ id ] === 'undefined' ) {
				dimensions[ id ] = {};
				dimensions[ id ][ type ] = {};
			} else if ( typeof dimensions[ id ][ type ] === 'undefined' ) {
				dimensions[ id ][ type ] = {};
			}

			dimensions[ id ][ type ] = newHeight;

			// Save values to metadata.
			editPost( {
				meta: {
					_coblocks_responsive_height: JSON.stringify( dimensions ),
				},
			} );
		}
	};

	const dropZone = (
		<BackgroundDropZone
			{ ...props }
			label={ __( 'Add background to hero', 'coblocks' ) }
		/>
	);

	let classes = classnames( 'wp-block-coblocks-hero', className );

	if ( attributes.coblocks && ( typeof attributes.coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-hero-${ attributes.coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-hero__inner',
		...BackgroundClasses( attributes ),
		layout && {
			[ `hero-${ layout }-align` ]: layout,
		},
		{ 'has-text-color': textColor && textColor.color },
		paddingSize && {
			'has-padding': paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize !== 'advanced',
		},
		contentAlign && {
			[ `has-${ contentAlign }-content` ]: contentAlign,
		},
		{
			'is-fullscreen': fullscreen,
			'is-hero-resizing': resizingInner,
		}
	);

	const innerStyles = {
		...BackgroundStyles( attributes, backgroundColor ),
		color: textColor && textColor.color,
		minHeight: fullscreen ? undefined : height,
		paddingBottom: paddingSize === 'advanced' && paddingBottom ? paddingBottom + paddingUnit : undefined,
		paddingLeft: paddingSize === 'advanced' && paddingLeft ? paddingLeft + paddingUnit : undefined,
		paddingRight: paddingSize === 'advanced' && paddingRight ? paddingRight + paddingUnit : undefined,
		paddingTop: paddingSize === 'advanced' && paddingTop ? paddingTop + paddingUnit : undefined,
	};

	const enablePositions = {
		bottom: false,
		bottomLeft: false,
		bottomRight: false,
		left: true,
		right: true,
		top: false,
		topLeft: false,
		topRight: false,
	};

	let heightResizer = {
		target: 'height',
		value: height,
	};

	if ( innerWidth <= 768 && innerWidth > 514 ) {
		heightResizer = {
			target: 'heightTablet',
			value: ( heightTablet ) ? heightTablet : height,
		};
	} else if ( innerWidth <= 514 ) {
		heightResizer = {
			target: 'heightMobile',
			value: ( heightMobile ) ? heightMobile : height,
		};
	}

	return (
		<>
			{ dropZone }
			{ isSelected && (
				<Inspector
					{ ...props }
				/>
			) }
			{ isSelected && (
				<Controls
					{ ...props }
				/>
			) }
			<div
				className={ classes }
			>
				{ fullscreen
					? <div className={ innerClasses } style={ innerStyles } >
						{ isBlobURL( backgroundImg ) && <Spinner /> }
						{ BackgroundVideo( attributes ) }
						{ ( typeof insertBlocksAfter !== 'undefined' ) && (
							<div className="wp-block-coblocks-hero__content-wrapper">
								<ResizableBox
									className={ classnames(
										'wp-block-coblocks-hero__content',
										'editor-media-container__resizer', {
											'is-resizing': resizing,
										}
									) }
									enable={ enablePositions }
									maxWidth="1000"
									minWidth="400"
									onResizeStart={ () => {
										setResizing( true );
										const currentBlock = document.getElementById( 'block-' + clientId );
										currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__content' )[ 0 ].style.maxWidth = '';
										currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__content' )[ 0 ].style.width = maxWidth + 'px';
									} }
									onResizeStop={ ( _event, _direction, _elt, delta ) => {
										setAttributes( {
											maxWidth: parseInt( maxWidth + delta.width, 10 ),
										} );
										setResizing( false );
										const currentBlock = document.getElementById( 'block-' + clientId );
										currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__content' )[ 0 ].style.width = 'auto';
										currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__content' )[ 0 ].style.maxWidth = parseInt( maxWidth + delta.width, 10 ) + 'px';
									} }
									showHandle={ isSelected }
									size={ { width: maxWidth } }
								>
									<InnerBlocks
										__experimentalCaptureToolbars={ true }
										allowedBlocks={ ALLOWED_BLOCKS }
										template={ TEMPLATE }
										templateInsertUpdatesSelection={ false }
										templateLock={ false }
									/>
								</ResizableBox>
							</div>
						) }
					</div>
					: (
						<ResizableBox
							className={ innerClasses }
							enable={ {
								bottom: true,
								bottomLeft: false,
								bottomRight: false,
								left: false,
								right: false,
								top: false,
								topLeft: false,
								topRight: false,
							} }
							minHeight="500"
							onResizeStop={ ( _event, _direction, _elt, delta ) => {
								switch ( heightResizer.target ) {
									case 'heightTablet':
										setAttributes( {
											heightTablet: parseInt( heightResizer.value + delta.height, 10 ),
										} );
										break;

									case 'heightMobile':
										setAttributes( {
											heightMobile: parseInt( heightResizer.value + delta.height, 10 ),
										} );
										break;

									default:
										setAttributes( {
											height: parseInt( heightResizer.value + delta.height, 10 ),
										} );
										break;
								}

								//update meta
								saveMeta( 'height' );
							} }
							showHandle={ isSelected }
							size={ {
								height: heightResizer.value,
							} }
							style={ innerStyles }
						>
							{ isBlobURL( backgroundImg ) && <Spinner /> }
							{ BackgroundVideo( attributes ) }
							{ ( typeof insertBlocksAfter !== 'undefined' ) && (
								<div className="wp-block-coblocks-hero__content-wrapper">
									<ResizableBox
										className={ classnames(
											'wp-block-coblocks-hero__content',
											'editor-media-container__resizer', {
												'is-resizing': resizing,
											}
										) }
										enable={ enablePositions }
										maxWidth="1000"
										minWidth="400"
										onResizeStart={ () => {
											setResizing( true );
											const currentBlock = document.getElementById( 'block-' + clientId );
											currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__content' )[ 0 ].style.maxWidth = '';
											currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__content' )[ 0 ].style.width = maxWidth + 'px';
										} }
										onResizeStop={ ( _event, _direction, _elt, delta ) => {
											setAttributes( {
												maxWidth: parseInt( maxWidth + delta.width, 10 ),
											} );
											setResizing( false );
											const currentBlock = document.getElementById( 'block-' + clientId );
											currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__content' )[ 0 ].style.width = 'auto';
											currentBlock.getElementsByClassName( 'wp-block-coblocks-hero__content' )[ 0 ].style.maxWidth = parseInt( maxWidth + delta.width, 10 ) + 'px';
										} }
										showHandle={ isSelected }
										size={ { width: maxWidth } }
									>
										<InnerBlocks
											allowedBlocks={ ALLOWED_BLOCKS }
											template={ TEMPLATE }
											templateInsertUpdatesSelection={ false }
											templateLock={ false }
										/>
									</ResizableBox>
								</div>
							) }
						</ResizableBox>
					) }
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,

	withDispatch( ( dispatch ) => {
		const { updateBlockAttributes } = dispatch( 'core/block-editor' );
		const { editPost } = dispatch( 'core/editor' );

		return {
			editPost,
			updateBlockAttributes,
		};
	} ),

	withSelect( ( select ) => {
		const { getEditedPostAttribute } = select( 'core/editor' );
		const { getBlockAttributes } = select( 'core/block-editor' );

		return {
			getBlockAttributes,
			getEditedPostAttribute,
		};
	} ),
] )( Edit );
