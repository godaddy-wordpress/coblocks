// Disable issue: https://github.com/godaddy-wordpress/coblocks/issues/2000
/* eslint-disable @wordpress/no-global-event-listener */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import applyWithColors from './colors';
import { getDividerFromStyle } from './utils';
import InlineColorPicker from '../../components/inline-color-picker';

/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { ResizableBox } from '@wordpress/components';

/**
 * Block edit function
 *
 * @param {Object} props
 */
const Edit = ( props ) => {
	const {
		clientId,
		attributes,
		className,
		isSelected,
		setAttributes,
		backgroundColor,
		color,
	} = props;

	const {
		coblocks,
		shapeHeight,
		shapeHeightTablet,
		shapeHeightMobile,
		backgroundHeight,
		backgroundHeightTablet,
		backgroundHeightMobile,
		verticalFlip,
		horizontalFlip,
		justAdded,
	} = attributes;

	const [ innerWidth, setInnerWidth ] = useState( null );
	const [ resizing, setResizing ] = useState( false );
	const [ resizingAlt, setResizingAlt ] = useState( false );

	useEffect( () => {
		getBrowserWidth();
		window.addEventListener( 'resize', getBrowserWidth );

		return () => {
			window.removeEventListener( 'resize', getBrowserWidth );
		};
	}, [] );

	const getBrowserWidth = () => {
		setInnerWidth( window.innerWidth );
		return window.innerWidth;
	};

	const saveMeta = ( type ) => {
		const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		const block = wp.data.select( 'core/block-editor' ).getBlock( clientId );
		let dimensions = {};

		if ( typeof attributes.coblocks !== 'undefined' && typeof attributes.coblocks.id !== 'undefined' ) {
			const id = name.split( '/' ).join( '-' ) + '-' + attributes.coblocks.id;
			const height = {
				height: block.attributes[ type ],
				heightTablet: block.attributes[ type + 'Tablet' ],
				heightMobile: block.attributes[ type + 'Mobile' ],
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

			dimensions[ id ][ type ] = height;

			// Save values to metadata.
			wp.data.dispatch( 'core/editor' ).editPost( {
				meta: {
					_coblocks_responsive_height: JSON.stringify( dimensions ),
				},
			} );
		}
	};

	let shapeHeightResizer = {
		target: 'shapeHeight',
		value: shapeHeight,
	};

	let backgroundHeightResizer = {
		target: 'shapeHeight',
		value: backgroundHeight,
	};

	if ( innerWidth <= 768 && innerWidth > 514 ) {
		shapeHeightResizer = {
			target: 'shapeHeightTablet',
			value: ( shapeHeightTablet ) ? shapeHeightTablet : shapeHeight,
		};

		backgroundHeightResizer = {
			target: 'backgroundHeightTablet',
			value: ( backgroundHeightTablet ) ? backgroundHeightTablet : backgroundHeight,
		};
	} else if ( innerWidth <= 514 ) {
		shapeHeightResizer = {
			target: 'shapeHeightMobile',
			value: ( shapeHeightMobile ) ? shapeHeightMobile : shapeHeight,
		};

		backgroundHeightResizer = {
			target: 'backgroundHeightMobile',
			value: ( backgroundHeightMobile ) ? backgroundHeightMobile : backgroundHeight,
		};
	}

	//modify blocks when added
	if ( justAdded ) {
		const prevBlockClientId = wp.data.select( 'core/block-editor' ).getPreviousBlockClientId( clientId );
		const nextBlockClientId = wp.data.select( 'core/block-editor' ).getNextBlockClientId( clientId );

		if ( prevBlockClientId ) {
			wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( prevBlockClientId, { noBottomMargin: true, marginBottom: 0, marginBottomTablet: 0, marginBottomMobile: 0 } );
		}

		if ( nextBlockClientId ) {
			wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( nextBlockClientId, { noTopMargin: true, marginTop: 0, marginTopTablet: 0, marginTopMobile: 0 } );
		}
		setAttributes( { justAdded: false } );
	}

	let classes = classnames(
		className, {
			'is-vertically-flipped': verticalFlip,
			'is-horizontally-flipped': horizontalFlip,
		} );

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-shape-divider-${ coblocks.id }` );
	}

	return (
		<>
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
				style={ { backgroundColor: backgroundColor.color, color: color.color } }
			>
				<ResizableBox
					className={ classnames(
						'wp-block-coblocks-shape-divider__svg-wrapper', {
							'is-selected': isSelected,
							'is-resizing': resizing,
						}
					) }
					size={ {
						height: shapeHeightResizer.value,
					} }
					minHeight="20"
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					onResizeStop={ ( _event, _direction, _elt, delta ) => {
						switch ( shapeHeightResizer.target ) {
							case 'shapeHeightTablet':
								setAttributes( {
									shapeHeightTablet: parseInt( shapeHeightResizer.value + delta.height, 10 ),
								} );
								break;

							case 'shapeHeightMobile':
								setAttributes( {
									shapeHeightMobile: parseInt( shapeHeightResizer.value + delta.height, 10 ),
								} );
								break;

							default:
								setAttributes( {
									shapeHeight: parseInt( shapeHeightResizer.value + delta.height, 10 ),
								} );
								break;
						}

						setResizing( false );

						//update meta
						saveMeta( 'shapeHeight' );
					} }
					onResizeStart={ () => {
						setResizing( true );
					} }
					showHandle={ isSelected }
				>
					{ getDividerFromStyle( className ) }
				</ResizableBox>
				<ResizableBox
					className={ classnames(
						'wp-block-coblocks-shape-divider__alt-wrapper', {
							'is-selected': isSelected,
							'is-resizing': resizingAlt,
						}
					) }
					size={ {
						height: backgroundHeightResizer.value,
					} }
					minWidth="100%"
					minHeight="20"
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					onResizeStop={ ( _event, _direction, _elt, delta ) => {
						switch ( backgroundHeightResizer.target ) {
							case 'backgroundHeightTablet':
								setAttributes( {
									backgroundHeightTablet: parseInt( backgroundHeightResizer.value + delta.height, 10 ),
								} );
								break;

							case 'backgroundHeightMobile':
								setAttributes( {
									backgroundHeightMobile: parseInt( backgroundHeightResizer.value + delta.height, 10 ),
								} );
								break;

							default:
								setAttributes( {
									backgroundHeight: parseInt( backgroundHeightResizer.value + delta.height, 10 ),
								} );
								break;
						}

						setResizingAlt( false );

						saveMeta( 'backgroundHeight' );
					} }
					onResizeStart={ () => {
						setResizingAlt( true );
					} }
					showHandle={ isSelected }
				>
					{ isSelected && (
						<InlineColorPicker
							value={ color.color }
							onChange={ ( newColor ) => setAttributes( { color: null, customColor: newColor } ) }
						/>
					) }
				</ResizableBox>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( Edit );
