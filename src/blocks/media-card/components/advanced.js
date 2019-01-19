/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;
const { ToggleControl, InspectorAdvancedControls } = wp.components;

/**
 * Override the default edit UI to include a new block inspector control for
 * assigning the anchor ID, if block supports anchor.
 *
 * @param {function|Component} BlockEdit Original component.
 *
 * @return {string} Wrapped component.
 */
export const withInspectorControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		if ( props.isSelected ) {
			return (
				<Fragment>
					<BlockEdit { ...props } />
					<InspectorAdvancedControls>
					asfs
						<ToggleControl
							label={ __( 'Stack on mobile' ) }
							checked={ !! props.attributes.isStackedOnMobile }
							onChange={ () => props.setAttributes( {  isStackedOnMobile: ! props.attributes.isStackedOnMobile } ) }
							help={ !! props.attributes.isStackedOnMobile ? __( 'Responsiveness is enabled.' ) : __( 'Toggle to enable responsiveness.' ) }
						/>
					</InspectorAdvancedControls>
				</Fragment>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withInspectorControl' );