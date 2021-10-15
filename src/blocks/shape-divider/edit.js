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
		backgroundHeight,
		verticalFlip,
		horizontalFlip,
	} = attributes;

	useEffect( () => {
		// Handle upgrading old alignment classes to the global `align` attribute.
		const classNames = ( attributes.className || '' ).split( ' ' );

		if ( classNames.includes( 'alignfull' ) ) {
			setAttributes( {
				align: 'full',
				className: classNames.filter( ( classname ) => classname !== 'alignfull' ).join( ' ' ),
			} );
		}
		if ( classNames.includes( 'alignwide' ) ) {
			setAttributes( {
				align: 'wide',
				className: classNames.filter( ( classname ) => classname !== 'alignwide' ).join( ' ' ),
			} );
		}
	}, [] );

	const [ resizing, setResizing ] = useState( false );
	const [ resizingAlt, setResizingAlt ] = useState( false );

	const shapeHeightResizer = {
		target: 'shapeHeight',
		value: shapeHeight,
	};

	const backgroundHeightResizer = {
		target: 'shapeHeight',
		value: backgroundHeight,
	};

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
						setAttributes( {
							shapeHeight: parseInt( shapeHeightResizer.value + delta.height, 10 ),
						} );

						setResizing( false );
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
						setAttributes( {
							backgroundHeight: parseInt( backgroundHeightResizer.value + delta.height, 10 ),
						} );
						setResizingAlt( false );
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
