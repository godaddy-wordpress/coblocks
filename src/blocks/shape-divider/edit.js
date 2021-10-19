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
import { useEffect } from '@wordpress/element';
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
		toggleSelection,
	} = props;

	const {
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
				className={ classnames( className, {
					'is-vertically-flipped': verticalFlip,
					'is-horizontally-flipped': horizontalFlip,
				} ) }
				style={ { backgroundColor: backgroundColor.color, color: color.color } }
			>
				<ResizableBox
					className={ classnames(
						'wp-block-coblocks-shape-divider__svg-wrapper', {
							'is-selected': isSelected,
						}
					) }
					size={ {
						height: shapeHeight,
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
							shapeHeight: parseInt( shapeHeight + delta.height, 10 ),
						} );

						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
					showHandle={ isSelected }
				>
					{ getDividerFromStyle( className ) }
				</ResizableBox>
				<ResizableBox
					className={ classnames(
						'wp-block-coblocks-shape-divider__alt-wrapper', {
							'is-selected': isSelected,
						}
					) }
					size={ {
						height: backgroundHeight,
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
							backgroundHeight: parseInt( backgroundHeight + delta.height, 10 ),
						} );

						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
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
