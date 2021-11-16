/**
 * Internal Dependencies
 */
import Controls from './controls';
import applyStyle from './apply-style';
import { TypographyAttributes } from '../../components/typography-controls';
import './settings-modal-control';

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { withSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { Fragment }	from '@wordpress/element';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

const allowedBlocks = [ 'core/paragraph', 'core/heading', 'core/pullquote', 'core/cover', 'core/quote', 'core/button', 'core/list', 'coblocks/row', 'coblocks/column', 'coblocks/accordion', 'coblocks/accordion-item', 'coblocks/alert', 'coblocks/highlight', 'coblocks/pricing-table', 'coblocks/features' ];
const deprecatedBlocks = [ 'coblocks/click-to-tweet' ];

/**
 * Compares against list of blocks with deprecated typography controls and prepares
 * attributes for deprecation when needed.
 *
 * Does not modify settings for registered block - Will only modify attributes
 * used within the deprecated function.
 *
 * @param {Object} attributes Original registered block attributes.
 * @return {Object} Block attributes filtered for deprecation .
 */
export function deprecateTypographyControls( attributes ) {
	addFilter(
		'blocks.registerBlockType',
		'coblocks/inspector/attributes',
		( settings ) => {
			if ( deprecatedBlocks.includes( settings.name ) ) {
				attributes = Object.assign( attributes, TypographyAttributes );
			}
			return settings;
		}
	);
	return attributes;
}

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
	// Use Lodash's assign to gracefully handle if attributes are undefined
	if ( allowedBlocks.includes( settings.name ) ) {
		settings.attributes = Object.assign( settings.attributes, TypographyAttributes );
	}

	return settings;
}

/**
 * Override the default edit UI to include a new block toolbar control
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ props.isSelected && allowedBlocks.includes( props.name ) && <Controls { ...{ ...props } } /> }
			</Fragment>
		);
	};
}, 'withControls' );

/**
 * Override the default block element to add	wrapper props.
 *
 * @param {Function} BlockListBlock Original component
 * @return {Function} Wrapped component
 */

const enhance = compose(
	/**
	 * For blocks whose block type doesn't support `multiple`, provides the
	 * wrapped component with `originalBlockClientId` -- a reference to the
	 * first block of the same type in the content -- if and only if that
	 * "original" block is not the current one. Thus, an inexisting
	 * `originalBlockClientId` prop signals that the block is valid.
	 *
	 * @param {Function} WrappedBlockEdit A filtered BlockEdit instance.
	 * @return {Function} Enhanced component with merged state data props.
	 */
	withSelect( ( select ) => {
		return { selected: select( 'core/block-editor' ).getSelectedBlock(), select };
	} )
);

const withFontSettings = createHigherOrderComponent( ( BlockListBlock ) => {
	return enhance( ( { select, ...props } ) => {
		let wrapperProps 	= props.wrapperProps;
		let customData 	 	= {};

		const block = select( 'core/block-editor' ).getBlock( props.clientId );
		const blockName	= select( 'core/block-editor' ).getBlockName( props.clientId );

		if ( allowedBlocks.includes( blockName ) && block?.attributes ) {
			const { customFontSize, fontFamily, lineHeight, fontWeight, letterSpacing, textTransform, customTextColor } = block.attributes;

			if ( customFontSize ) {
				customData = Object.assign( customData, { 'data-custom-fontsize': 1 } );
			}

			if ( lineHeight ) {
				customData = Object.assign( customData, { 'data-custom-lineheight': 1 } );
			}

			if ( fontFamily ) {
				customData = Object.assign( customData, { 'data-coblocks-font': 1 } );
			}

			if ( fontWeight ) {
				customData = Object.assign( customData, { 'data-custom-fontweight': 1 } );
			}

			if ( textTransform ) {
				customData = Object.assign( customData, { 'data-custom-texttransform': 1 } );
			}

			if ( customTextColor ) {
				customData = Object.assign( customData, { 'data-custom-textcolor': 1 } );
			}

			if ( letterSpacing ) {
				customData = Object.assign( customData, { 'data-custom-letterspacing': 1 } );
			}

			wrapperProps = {
				...wrapperProps,
				style: applyStyle( block.attributes, blockName ),
				...customData,
			};
		}

		return <BlockListBlock { ...props } wrapperProps={ wrapperProps } />;
	} );
}, 'withFontSettings' );

/**
 * Override props assigned to save component to inject atttributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered props applied to save element.
 */
function applyFontSettings( extraProps, blockType, attributes ) {
	if ( allowedBlocks.includes( blockType.name ) || deprecatedBlocks.includes( blockType.name ) ) {
		if ( typeof extraProps.style !== 'undefined' ) {
			extraProps.style = Object.assign( extraProps.style, applyStyle( attributes, blockType.name ) );
		} else {
			extraProps.style = applyStyle( attributes, blockType.name );
		}

		const { fontFamily, lineHeight, fontWeight, letterSpacing, textTransform, noBottomSpacing, noTopSpacing } = attributes;

		if ( fontFamily ) {
			extraProps.className = classnames( extraProps.className, 'has-custom-font' );
		}

		if ( fontWeight ) {
			extraProps.className = classnames( extraProps.className, 'has-custom-weight' );
		}

		if ( textTransform ) {
			extraProps.className = classnames( extraProps.className, 'has-custom-transform' );
		}

		if ( lineHeight ) {
			extraProps.className = classnames( extraProps.className, 'has-custom-lineheight' );
		}

		if ( letterSpacing ) {
			extraProps.className = classnames( extraProps.className, 'has-custom-letterspacing' );
		}

		if ( typeof noBottomSpacing !== 'undefined' && noBottomSpacing ) {
			extraProps.className = classnames( extraProps.className, 'mb-0 pb-0' );
		}

		if ( typeof noTopSpacing !== 'undefined' && noTopSpacing ) {
			extraProps.className = classnames( extraProps.className, 'mt-0 pt-0' );
		}
	}

	return extraProps;
}

addFilter(
	'blocks.registerBlockType',
	'coblocks/inspector/attributes',
	addAttributes
);

addFilter(
	'editor.BlockEdit',
	'coblocks/typography',
	withControls
);

addFilter(
	'editor.BlockListBlock',
	'coblocks/withFontSettings',
	withFontSettings
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'coblocks/applyFontSettings',
	applyFontSettings
);
