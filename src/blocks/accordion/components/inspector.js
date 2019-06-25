
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { InspectorControls } = wp.blockEditor;
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
							label={ __( 'Internet Explorer Support' ) }
							checked={ !! polyfill }
							help={ ! polyfill ? __( 'Add support for Internet Explorer by loading a JavaScript polyfill.' ) : __( 'Supporting Internet Explorer by loading a JavaScript polyfill on this page.' ) }
							onChange={ () => {
								setAttributes( {  polyfill: ! polyfill } )
								// Save values to metadata.
								wp.data.dispatch( 'core/editor' ).editPost({
									meta: {
										_coblocks_accordion_ie_support: "'" + ! polyfill + "'",
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
