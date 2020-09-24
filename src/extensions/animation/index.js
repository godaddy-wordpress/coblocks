/**
 * Internal Dependencies
 */
import Controls from './controls';
import '../../js/coblocks-animation';

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { withSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

const allowedBlocks = [
	'core/cover',
	'core/image'
];

const animateClass = 'coblocks-animate';
const dataAnimationHolder = 'data-coblocks-animation';

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
		extraProps.className = classnames( extraProps.className, animateClass );
		extraProps[ dataAnimationHolder ] = animation;
	}

	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'coblocks/applyAnimationSettings',
	applyAnimationSettings
);

const enhance = compose(
	/**
	 * For blocks whose block type doesn't support `multiple`, provides the
	 * wrapped component with `originalBlockClientId` -- a reference to the
	 * first block of the same type in the content -- if and only if that
	 * "original" block is not the current one. Thus, an inexisting
	 * `originalBlockClientId` prop signals that the block is valid.
	 *
	 * @param {Function} WrappedBlockEdit A filtered BlockEdit instance.
	 *
	 * @return {Function} Enhanced component with merged state data props.
	 */
	withSelect( ( select ) => {
		return { selected: select( 'core/block-editor' ).getSelectedBlock(), select };
	} )
);

const withAnimationSettings = createHigherOrderComponent( ( BlockListBlock ) => {
	return enhance( ( { select, ...props } ) => {
		let wrapperProps = props.wrapperProps;

		const block = select( 'core/block-editor' ).getBlock( props.rootClientId || props.clientId );
		const blockName	= select( 'core/block-editor' ).getBlockName( props.rootClientId || props.clientId );

		if ( ! allowedBlocks.includes( blockName ) || ! block?.attributes?.animation ) {
			return <BlockListBlock { ...props } />;
		}

		const { animation } = block.attributes;

		wrapperProps = {
			...wrapperProps,
			className: classnames( wrapperProps.className, animateClass, animation ),
		};

		return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
	} );
}, 'withAnimationSettings' );

addFilter(
	'editor.BlockListBlock',
	'coblocks/withAnimationSettings',
	withAnimationSettings
);
