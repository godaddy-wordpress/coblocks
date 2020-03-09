
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * Inspector controls
 */
class Inspector extends Component {
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
					<PanelBody title={ __( 'Accordion settings', 'coblocks' ) }>
						<ToggleControl
							label={ __( 'Internet Explorer support', 'coblocks' ) }
							checked={ !! polyfill }
							help={ ! polyfill ? __( 'Add support for Internet Explorer by loading a JavaScript polyfill.', 'coblocks' ) : __( 'Supporting Internet Explorer by loading a JavaScript polyfill on this page.', 'coblocks' ) }
							onChange={ () => {
								setAttributes( { polyfill: ! polyfill } );
								// Save values to metadata.
								wp.data.dispatch( 'core/editor' ).editPost( {
									meta: {
										_coblocks_accordion_ie_support: '\'' + ! polyfill + '\'',
									},
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default Inspector;
