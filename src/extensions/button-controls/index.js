/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

const allowedBlocks = [ 'core/button' ];

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {
	// Use Lodash's assign to gracefully handle if attributes are undefined
	if ( allowedBlocks.includes( settings.name ) ) {
		settings.attributes = Object.assign( settings.attributes, {
			isFullwidth: {
				type: 'boolean',
				default: false,
			},
		} );
	}

	return settings;
}

/**
 * Add custom CoBlocks attributes to selected blocks
 *
 * @param {Function} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			attributes,
			setAttributes,
		} = props;

		const {
			isFullwidth,
		} = attributes;

		const hasFullwidth = allowedBlocks.includes( name );

		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ hasFullwidth &&
					<InspectorAdvancedControls>
						<ToggleControl
							label={ __( 'Display fullwidth', 'coblocks' ) }
							checked={ !! isFullwidth }
							onChange={ () => setAttributes( { isFullwidth: ! isFullwidth } ) }
							help={ !! isFullwidth ? __( 'Displaying as full width.', 'coblocks' ) : __( 'Toggle to display button as full width.', 'coblocks' ) }
						/>
					</InspectorAdvancedControls>
				}
			</Fragment>
		);
	};
}, 'withAdvancedControls' );

/**
 * Override props assigned to save component to inject atttributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 * @return {Object} Filtered props applied to save element.
 */
function applySpacingClass( extraProps, blockType, attributes ) {
	const hasFullwidth = allowedBlocks.includes( blockType.name );

	if ( hasFullwidth ) {
		const { isFullwidth } = attributes;

		if ( typeof isFullwidth !== 'undefined' && isFullwidth ) {
			extraProps.className = classnames( extraProps.className, 'w-100' );
		}
	}
	return extraProps;
}

/**
 * Override the default block element to add wrapper props.
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

const addEditorBlockAttributes = createHigherOrderComponent( ( BlockListBlock ) => {
	return enhance( ( { select, ...props } ) => {
		let wrapperProps 	= props.wrapperProps;
		let customData 	 	= {};

		const block = select( 'core/block-editor' ).getBlock( props.rootClientId || props.clientId );
		const blockName	= select( 'core/block-editor' ).getBlockName( props.rootClientId || props.clientId );

		const hasFullwidth = allowedBlocks.includes( blockName );

		if ( hasFullwidth && block?.attributes ) {
			const { isFullwidth } = block.attributes;

			if ( typeof isFullwidth !== 'undefined' && isFullwidth ) {
				customData = Object.assign( customData, { 'data-coblocks-button-fullwidth': 1 } );
			}
		}

		if ( hasFullwidth ) {
			wrapperProps = {
				...wrapperProps,
				...customData,
			};
		}

		return (
			<BlockListBlock { ...props } wrapperProps={ wrapperProps } />
		);
	} );
}, 'addEditorBlockAttributes' );

addFilter(
	'blocks.registerBlockType',
	'coblocks/AdvancedButtonControls/attributes',
	addAttributes
);

addFilter(
	'editor.BlockEdit',
	'coblocks/advancedButtonControls',
	withAdvancedControls
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'coblocks/applyButtonControls',
	applySpacingClass
);

addFilter(
	'editor.BlockListBlock',
	'coblocks/addEditorButtonControls',
	addEditorBlockAttributes
);
