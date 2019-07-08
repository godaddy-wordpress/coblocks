/**
 * WordPress dependencies.
 */
 const { __ } = wp.i18n;
 const { Component, Fragment } = wp.element;
 const { PanelBody, ToggleControl } = wp.components;
 const { InspectorControls } = wp.blockEditor;
 const { applyFilters } = wp.hooks;


class Controls extends Component {

  constructor( props ) {
    super( ...arguments );
  }

  render() {
    const {
      attributes,
      setAttributes,
    } = this.props;

    return (
      <InspectorControls>
        <PanelBody
          title={ __( 'Logos Settings' ) }
          className="components-coblocks-block-settings-sidebar"
        >
          <ToggleControl
            label={ __( 'Black & White' ) }
            help={ __( 'Toggle to add a black and white filter.' ) }
            checked={ attributes.blackAndWhite }
            onChange={ () => setAttributes( { blackAndWhite: ! attributes.blackAndWhite } ) }
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}

export default Controls;
