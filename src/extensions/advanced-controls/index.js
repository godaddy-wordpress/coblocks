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
		} = attributes;
		
		const hasStackedControl = hasBlockSupport( name, 'stackedOnMobile' );

		if ( hasStackedControl && isSelected ) {
			return (
				<Fragment>
					<BlockEdit {...props} />
					<InspectorAdvancedControls>
						<ToggleControl
							label={ __( 'Stack on mobile' ) }
							checked={ !! isStackedOnMobile }
							onChange={ () => setAttributes( {  isStackedOnMobile: ! isStackedOnMobile } ) }
							help={ !! isStackedOnMobile ? __( 'Responsiveness is enabled.' ) : __( 'Toggle to enable responsiveness.' ) }
						/>
					</InspectorAdvancedControls>
				</Fragment>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withAdvancedControls');

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