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
				<>
					<Inspector { ...props } />
					<Controls { ...props } />
				</>
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
					size={ { height: shapeHeight } }
					minWidth="100%"
					enable={ { bottom: true } }
					onResizeStop={ ( _event, _direction, element ) => {
						setAttributes( {
							shapeHeight: parseInt( element.offsetHeight, 10 ) + 'px',
						} );
						toggleSelection( true );
					} }
					onResizeStart={ () => toggleSelection( false ) }
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
					size={ { height: backgroundHeight } }
					minWidth="100%"
					enable={ { bottom: true } }
					onResizeStop={ ( _event, _direction, element ) => {
						setAttributes( {
							backgroundHeight: parseInt( element.offsetHeight, 10 ) + 'px',
						} );
						toggleSelection( true );
					} }
					onResizeStart={ () => toggleSelection( false ) }
					showHandle={ isSelected }
				>
				</ResizableBox>
			</div>
		</>
	);
};

export default compose( [
	applyWithColors,
] )( Edit );
