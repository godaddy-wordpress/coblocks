/**
 * Internal dependencies
 */
import ColorSettings, { ColorSettingsAttributes, ColorSettingsClasses } from './index';
import applyStyle from './apply-style';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { withSelect } = wp.data;
const { addFilter } = wp.hooks;
const { Fragment }  = wp.element;
const { compose, createHigherOrderComponent } = wp.compose;

/**
 * Inspector.
 */
const Inspector = props => {
 	const { attributes, setAttributes } = props;
 	const allowedBlocks = [ 'core/heading', 'core/cover', 'core/button', 'core/list' ];

	// Display on the allowedBlocks only.
	if ( ! allowedBlocks.includes( props.name ) ){
		props.attributes.textPanelHideSize = true;
	} else {
		props.attributes.textPanelHeadingFontSizes = true;
	}

	// Show line height on appropriate blocks.
	if ( ! [ 'core/heading', 'core/paragraph', 'core/cover', 'core/button' ].includes( props.name ) ) {
		props.attributes.textPanelLineHeight = true;
	}

	props.attributes.textPanelHideColor = true;
	props.attributes.textPanelShowSpacingControls = true;

	return (
			<InspectorControls>
				{ ColorSettings( props ) }
			</InspectorControls>
		);
	};

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
	const allowedBlocks = [ 'core/heading', 'core/list' ];
	// Use Lodash's assign to gracefully handle if attributes are undefined
	if( allowedBlocks.includes( settings.name ) ){
		settings.attributes = Object.assign( settings.attributes, ColorSettingsAttributes );
	}

	return settings;
}

/**
 * Override the default edit UI to include a new block inspector control
 *
 * @param {function|Component} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withInspectorControl = createHigherOrderComponent( (BlockEdit) => {
	return ( props ) => {
		const allowedBlocks = [ 'core/heading', 'core/list' ];
		return (
			<Fragment>
				<BlockEdit {...props} />
				{ props.isSelected && allowedBlocks.includes( props.name ) && <Inspector {...{ ...props }} /> }
			</Fragment>
		);
	};
}, 'withInspectorControl');


/**
 * Override the default block element to add  wrapper props.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */

const enhance = compose(
	/**
	 * For blocks whose block type doesn't support `multiple`, provides the
	 * wrapped component with `originalBlockClientId` -- a reference to the
	 * first block of the same type in the content -- if and only if that
	 * "original" block is not the current one. Thus, an inexisting
	 * `originalBlockClientId` prop signals that the block is valid.
	 *
	 * @param {Component} WrappedBlockEdit A filtered BlockEdit instance.
	 *
	 * @return {Component} Enhanced component with merged state data props.
	 */
	withSelect( ( select, block ) => {
		return { selected : select( 'core/editor' ).getSelectedBlock(), select: select };
	} )
);



addFilter(
	'blocks.registerBlockType',
	'coblocks/colors/attributes',
	addAttributes
);


addFilter(
	'editor.BlockEdit',
	'coblocks/colors',
	withInspectorControl
);