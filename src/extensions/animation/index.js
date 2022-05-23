/**
 * Internal Dependencies
 */
import Controls from './controls';
import '../../js/coblocks-animation';
import './settings-modal-control';

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { select } from '@wordpress/data';
import { useEffect, useRef, useState } from '@wordpress/element';

const animateClass = 'coblocks-animate';
const dataAnimationHolder = 'data-coblocks-animation';

/**
 * React hook function to extend the block editor with custom controls.
 *
 * @function useAnimationControls
 * @param {Object} props
 * @return {JSX} Wrapped component.
 */
const useAnimationControls = ( ( props ) => {
	const block = select( 'core/block-editor' ).getBlock( props.clientId );

	return <Controls { ...{ ...props, selected: block } } />;
} );

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function applyAttributes( settings ) {
	settings.attributes = {
		...settings.attributes,
		animation: {
			type: 'string',
		},
	};

	return settings;
}

/**
 * Override props assigned to save component to inject atttributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered props applied to save element.
 */
function applySaveProps( extraProps, blockType, attributes ) {
	const { animation } = attributes;

	if ( !! animation ) {
		extraProps.className = classnames( extraProps.className, animateClass );
		extraProps[ dataAnimationHolder ] = animation;
	}

	return extraProps;
}

/**
 * React hook function to override the default block element to add wrapper props.
 *
 * @function useEditorProps
 * @param {Object} block        Contains the selected block.
 * @param {string} blockName    String referencing the selected block.
 * @param {Object} props        Object with block props.
 * @param {Object} wrapperProps Object with wrapper props used to extend selected block.
 * @return {Object} Wrapper props to apply to block.
 */
const useEditorProps = ( block, blockName, props, wrapperProps ) => {
	// Apply animation classes to block wrapper only if the animation attribute has changed.
	const { animation } = props.attributes;
	const prevAnimation = useRef();

	// Hide the Block Toolbar while animations are playing.
	const [ isAnimating, setIsAnimating ] = useState( false );

	useEffect( () => {
		if ( !! animation ) {
			prevAnimation.current = animation;
		}
	}, [ animation ] );

	if ( ! animation ) {
		// If animation is unset ensure that `coblocks-animate` class is unset.
		if ( props.attributes?.className?.includes( 'coblocks-animate' ) ) {
			const classList = props.attributes?.className.split( ' ' );
			props.attributes.className = classList.filter( ( c ) => c !== 'coblocks-animate' ).join( ' ' );
		}

		return wrapperProps;
	}

	const willAnimate = prevAnimation.current !== animation;

	wrapperProps = {
		...wrapperProps,
		className: classnames( wrapperProps?.className, {
			[ animateClass ]: willAnimate || isAnimating,
			[ animation ]: willAnimate || isAnimating,
		} ),
		onAnimationEnd: () => setIsAnimating( false ),
		onAnimationStart: () => setIsAnimating( willAnimate ),
	};
	return wrapperProps;
};

export { useEditorProps, applyAttributes, applySaveProps, useAnimationControls };
