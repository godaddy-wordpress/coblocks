/**
 * Internal Dependencies
 */
import Controls from './controls';

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

const allowedBlocks = [
	'core/cover',
];

/**
 * Override the default edit UI to include a new block toolbar control
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		return (
			<>
				<BlockEdit { ...props } />
				{ props.isSelected && allowedBlocks.includes( props.name ) && <Controls { ...{ ...props } } /> }
			</>
		);
	};
}, 'withControls' );

addFilter(
	'editor.BlockEdit',
	'coblocks/animations',
	withControls
);

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
	if ( allowedBlocks.includes( settings.name ) ) {
		settings.attributes = {
			...settings.attributes,
			animation: {
				type: 'string',
			},
		};
	}

	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'coblocks/inspector/attributes',
	addAttributes
);

/**
 * Override props assigned to save component to inject atttributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
function applyAnimationSettings( extraProps, blockType, attributes ) {

	if ( ! allowedBlocks.includes( blockType.name ) ) {
		return extraProps;
	}

	const { animation } = attributes;

	if ( !! animation ) {
		extraProps.className = classnames( extraProps.className, 'coblocks-animate' );
		extraProps[`data-animation`] = animation;
	}

	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'coblocks/applyAnimationSettings',
	applyAnimationSettings
);
