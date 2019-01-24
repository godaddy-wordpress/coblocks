
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls } = wp.editor;
const { PanelBody, ToggleControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}


	render() {

		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			polyfill,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Accordion Settings' ) }>
						<ToggleControl
							label={ __( 'Support Legacy Browsers' ) }
							checked={ !! polyfill }
							help={ ! polyfill ? __( 'Toggle to enable support for legacy browsers' ) : __( 'Supporting legacy browsers' ) }
							onChange={ () => {
								
								setAttributes( {  polyfill: ! polyfill } )

								// Save values to metadata.
								wp.data.dispatch( 'core/editor' ).editPost({
									meta: {
										_coblocks_legacy_support: "'" + ! polyfill + "'",
									}
								});
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
};

export default Inspector;
