/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment }	= wp.element;
const { hasBlockSupport }	= wp.blocks;
const { InspectorAdvancedControls }	= wp.editor;
const { compose, createHigherOrderComponent } = wp.compose;
const { ToggleControl } = wp.components;

/**
 * Filters registered block settings, extending attributes with settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */
function addAttributes( settings ) {

	// Add custom attribute
	if ( hasBlockSupport( settings, 'stackedOnMobile' ) ) {
		if( typeof settings.attributes !== 'undefined' ){
			settings.attributes = Object.assign( settings.attributes, {
				isStackedOnMobile: {
					type: 'boolean',
					default: true,
				}
			} );
		}
	}

	if ( hasBlockSupport( settings, 'withNoSpacingOptions' ) ) {
		if( typeof settings.attributes !== 'undefined' ){
			settings.attributes = Object.assign( settings.attributes, {
				noBottomMargin: {
					type: 'boolean',
					default: false,
				},
				noTopMargin: {
					type: 'boolean',
					default: false,
				}
			} );
		}
	}

	return settings;
}

/**
 * Add custom CoBlocks attributes to selected blocks
 *
 * @param {function|Component} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		const {
			name,
			clientId,
			attributes,
			setAttributes,
			isSelected,
		} = props;

		const {
			isStackedOnMobile,
			noBottomMargin,
			noTopMargin,
		} = attributes;

		const hasStackedControl = hasBlockSupport( name, 'stackedOnMobile' );
		const withNoSpacingOptions = hasBlockSupport( name, 'withNoSpacingOptions' );

		return (
			<Fragment>
				<BlockEdit {...props} />
				{ isSelected && 
					<InspectorAdvancedControls>
						{ hasStackedControl &&  
							<ToggleControl
								label={ __( 'Stack on mobile' ) }
								checked={ !! isStackedOnMobile }
								onChange={ () => setAttributes( {  isStackedOnMobile: ! isStackedOnMobile } ) }
								help={ !! isStackedOnMobile ? __( 'Responsiveness is enabled.' ) : __( 'Toggle to enable responsiveness.' ) }
							/>
						}
						{ withNoSpacingOptions &&  
							<ToggleControl
								label={ __( 'No top spacing' ) }
								checked={ !! noTopMargin }
								onChange={ () => setAttributes( {  noTopMargin: ! noTopMargin } ) }
								help={ !! noTopMargin ? __( 'Top margin is removed on this block.' ) : __( 'Toggle to remove any top margin applied to this block.' ) }
							/>
						}
						{ withNoSpacingOptions &&
							<ToggleControl
								label={ __( 'No bottom spacing' ) }
								checked={ !! noBottomMargin }
								onChange={ () => setAttributes( {  noBottomMargin: ! noBottomMargin } ) }
								help={ !! noBottomMargin ? __( 'Bottom margin is removed on this block.' ) : __( 'Toggle to remove any bottom margin applied to this block.' ) }
							/>
						}
					</InspectorAdvancedControls>
				}
				
			</Fragment>
		);
	};
}, 'withAdvancedControls');

/**
 * Override props assigned to save component to inject atttributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
function applySpacingClass(extraProps, blockType, attributes) {

	const withNoSpacingOptions = hasBlockSupport( blockType.name, 'withNoSpacingOptions' );

	if ( withNoSpacingOptions ) {

		const { noBottomMargin, noTopMargin } = attributes;

		if ( typeof noBottomMargin !== 'undefined' && noBottomMargin ) {
			extraProps.className = classnames( extraProps.className, 'mb-0' );
		}

		if ( typeof noTopMargin !== 'undefined' && noTopMargin ) {
			extraProps.className = classnames( extraProps.className, 'mt-0' );
		}
	}

	return extraProps;
}

addFilter(
	'blocks.registerBlockType',
	'coblocks/AdvancedControls/attributes',
	addAttributes
);


addFilter(
	'editor.BlockEdit',
	'coblocks/advanced',
	withAdvancedControls
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'coblocks/applySpacingClass',
	applySpacingClass
);