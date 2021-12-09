/**
 * Internal Dependencies
 */
import applyStyle from './apply-style';
import Controls from './controls';
import { deprecatedBlocks } from './constants';
import { TypographyAttributes } from '../../components/typography-controls';
import './settings-modal-control';

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * Constants
 */
const allowedBlocks = [ 'core/paragraph', 'core/heading', 'core/pullquote', 'core/cover', 'core/quote', 'core/button', 'core/list', 'coblocks/row', 'coblocks/column', 'coblocks/accordion', 'coblocks/accordion-item', 'coblocks/alert', 'coblocks/highlight', 'coblocks/pricing-table', 'coblocks/features' ];

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
const applyAttributes = ( settings ) => {
	// Use Lodash's assign to gracefully handle if attributes are undefined
	if ( allowedBlocks.includes( settings.name ) ) {
		settings.attributes = Object.assign( settings.attributes, TypographyAttributes );
	}

	return settings;
};

/**
 * React hook function to extend the block editor with custom controls.
 *
 * @function useTypography
 * @param {Object} props Block props.
 * @return {JSX} Conditionally include typography controls.
 */
const useTypography = ( props ) => (
	<>
		{ props.isSelected && allowedBlocks.includes( props.name ) && <Controls { ...{ ...props } } /> }
	</>
);

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
	let customData 	 	= {};

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

	return wrapperProps;
};

/**
 * Override props assigned to save component to inject attributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered props applied to save element.
 */
const applySaveProps = ( extraProps, blockType, attributes ) => {
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
};

export { useEditorProps, applySaveProps, useTypography, applyAttributes };
